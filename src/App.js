import { useEffect } from "react"
import {useNavigate} from "react-router-dom"
import { actionGetUserInfoByToken } from "pages/login/actions"
import navigatePage from "utils/helps/navigate"
import PageContent from "routes"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie"
import { AIPT_WEB_VMS_TOKEN } from "./utils/constants/config"

const App = () => {
  const navigate = useNavigate();
  window.navigatePage = (name, params = {}, query = {}) => navigatePage(navigate, name, params, query)
  const dispatch = useDispatch()
  const token = Cookies.get(AIPT_WEB_VMS_TOKEN)

  useEffect(() => {
    if(token) {
      actionGetUserInfoByToken(dispatch)
    } 
  }, [])

  return (
    <div id="app">
      <PageContent />
    </div>
  ) 
}

export default App