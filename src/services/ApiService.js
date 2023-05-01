import axios from "axios";
import api from "./api";

const UserRegistration = async ({
  name,
  second_name,
  last_name,
  email,
  password,
  password_confirm,
}) => {
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

//Методя для экспорта файла со списком студентов на сервер
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

//Метод получения списка групп
const GetGroups = async () => {
  try {
    const response = await api.get("api/auth/groups");
    return response.data.groups;
  } catch (error) {
    console.log(`Произошла ошибка при получении групп с сервера: ${error}`);
    return [];
  }
};

//метож для обновления информации студентов
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

//Метод для обновления статуса группы
const UpdateGroupsStatus = async (group) => {
  try {
    const response = await api.put(
      `api/auth/groups/${group.id}/updateGroupStatus`,
      {
        direction_id: group.direction_id,
        name: group.name,
        isActive: group.isActive,
      }
    );

    return response;
  } catch (error) {
    console.log("При отправке измененных данных произошла ошибка:", error);
  }
};

const GetDirections = async () => {
  try {
    const response = await api.get("api/auth/directions");
    return response.data.directions;
  } catch (error) {
    console.log("При получении данных произошла ошибка:", error);
  }
};

const CreateDiscipline = async (name, groups, year, semester, type) => {
  try {
    const response = await api.post("api/auth/disciplines", {
      name: name,
      groups: groups,
      year: year,
      semester: semester,
      type: type,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log("При получении данных произошла ошибка:", error);
  }

};

const GetDisciplines = async () => {
  try {
    const response = await api.get("api/auth/disciplines");
    console.log(response);
    return response;
    
  } catch (error) {
    console.log("При получении данных произошла ошибка:", error);
  }
};
export {
  UserRegistration,
  ExportFileInServer,
  GetGroups,
  UpdateStudentsInfo,
  UpdateGroupsStatus,
  GetDirections,
  CreateDiscipline,
  GetDisciplines,
};
