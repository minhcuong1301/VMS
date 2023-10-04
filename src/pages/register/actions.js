import api from "utils/service/api";

export const actionRegister = (data) => {
  console.log(data)
  return api({
    method: "POST",
    data,
    url: "/user/register"
  })
}