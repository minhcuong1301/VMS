import api from "utils/service/api";
import * as actions from 'utils/constants/redux-actions'

export const actionLogin = (data) => {
  return api({
    method: "POST",
    url: "/user/login",
    data
  })
}

export const actionGetUserInfoByToken = async (dispatch) => {
  try {
    const {status, data} = await api({method: "GET", url: "/get-user-info-by-token"})
    if (status === 200) {
      dispatch({type: actions.SET_PROFILE, payload: data})
    }
  } catch (error) {
    window.navigatePage('login')
    console.log(error)
  }
}