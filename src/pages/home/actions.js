import api from "utils/service/api"

export const actionAddCamera = (data) => {
  return api({
    method: "post",
    url: "/add-camera",
    data
  })
}

export const actionGetCameras = () => {
  return api({
    method: "get",
    url: "/get-cameras"
  })
}

export const actionStartRecordingCamera = (camera_id) => {
  return api({
    method: "post",
    url: "/start-record-camera",
    data: {camera_id}
  })
}

export const actionStopRecordingCamera = (camera_id) => {
  return api({
    method: "post",
    url: "/stop-recording-camera",
    data: {camera_id}
  })
}
export const actionStopCamera = (camera_id) => {
  return api({
    method: "PUT",
    url: `/user-stop-camera/${camera_id}`
  })
}

export const actionStartCamera = (camera_id) => {
  return api({
    method: "PUT",
    url: `/user-start-camera/${camera_id}`
  })
}

export const actionEditCamera = (data, camera_id) => {
  return api({
    method: "PUT",
    url: `/edit-camera/${camera_id}`,
    data
  })
}