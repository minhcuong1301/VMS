import api from "utils/service/api"

export const actionGetCameras = () => {
  return api({
    method: "get",
    url: "/get-cameras"
  })
}

export const actionGetRecords = (params) => {
  return api({
    method: "get",
    url: "/get-records",
    params
  })
}

export const actionDownLoadRecord = (record_id) => {
  return api({
    method: "get",
    url: `/download-record/${record_id}`,
    responseType: 'blob',
  })
}

export const actionOpenRecord = (record_id) => {
  return api({
    method: "get",
    url: `/open-record/${record_id}`,
    responseType: 'blob',
  })
}