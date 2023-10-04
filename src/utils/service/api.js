import { CONFIG_SERVER, AIPT_WEB_VMS_TOKEN } from "utils/constants/config"
import axios from "axios"
import { message } from "antd"
import Cookies from "js-cookie"

const req = axios.create()

req.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    message.error(error?.message || "Có lỗi xảy ra")
    return Promise.reject(error)
  }
)

req.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    message.error(error?.response?.data?.message || error?.message || "Có lỗi xảy ra")
    return Promise.reject(error)
  }
)

const api = (options) => {
  const config = {
    baseURL: CONFIG_SERVER.BASE_URL,
    ...options,
    headers: {
      ...options.headers
    }
  }

  if(Cookies.get(AIPT_WEB_VMS_TOKEN)) {
    config.headers.Authorization = Cookies.get(AIPT_WEB_VMS_TOKEN)
  }

  return req(config)
}

export default api;