import axios from "axios";
import router from "../router";
const api = axios.create();
api.defaults.baseURL = "http://localhost:80";
axios.defaults.baseURL = "http://localhost:80";

api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("access_token")) {
      config.headers.authorization = `Bearer ${localStorage.getItem(
        "access_token"
      )}`;
    }
    return config;
  },
  (error) => console.log(error + "Тут ошибка")
);

api.interceptors.response.use({}, (error) => {
  console.log("Я тут 4");
  if (error.response.status == 401) {
    localStorage.removeItem("access_token");
    console.log("Я тут ");
    return router.push({ name: "login" });
  } else if (error.response.data.message === "Token has expired") {
    return axios
      .post(
        "api/auth/refresh",
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        error.config.headers.authorization = `Bearer ${res.data.access_token}`;
        console.log("Я тут 1");
        return api.request(config);
      }).catch((er)=>{console.log("Я тут 2");});
  } else {
    router.push({ name: "login" });
  }
  // console.log(error.response.data.message);
});

export default api;
