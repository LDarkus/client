import api from "./api";

const UserRegistration = async ({
  name,
  second_name,
  last_name,
  email,
  password,
  password_confirm,
}) => {
  let r = "1";
  axios
    .post("/api/users/registration", {
      name: name,
      second_name: second_name,
      last_name: last_name,
      email: email,
      password: password,
      password_confirmation: password_confirm,
    })
    .then((res) => {
      localStorage.setItem("access_token", res.data.access_token);
      console.log(res);
      //По сути нужно сделать редирект на главную
    });
};

const ExportFileInServer = async (event) => {
  let file = event.files[0];
  let formData = new FormData();
  formData.append("file", file);
  try {
    const response = await api.post("/api/auth/groups", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (er) {
    console.log("При отправке ворд документа произошла ошибка: " + er);
    throw er;
  }
};

const GetGroups = async () => {
  try {
    const response = await api.get("api/auth/groups");
    return response.data.groups;
  } catch (error) {
    console.log(`Произошла ошибка при получении групп с сервера: ${error}`);
    return [];
  }
};

const UpdateStudentsInfo = async (updatedRows) => {
  try {
    const groupId = updatedRows.value[0].group_id;
    const studentsData = { students: updatedRows.value };

    const response = await api.put(`api/auth/groups/${groupId}`, studentsData);
    console.log("Ответ от сервера:", response.data);
  } catch (error) {
    console.log("При отправке измененных данных произошла ошибка:", error);
  }
};


export { UserRegistration, ExportFileInServer, GetGroups,UpdateStudentsInfo };
