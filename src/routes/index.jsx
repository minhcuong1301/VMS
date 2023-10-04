import { useEffect } from 'react'
import { Route, Routes, useLocation } from "react-router-dom"
import { AIPT_WEB_VMS_TOKEN } from "utils/constants/config"
import pages from 'pages'
import Cookies from 'js-cookie'

const PageContent = () => {
  const path = useLocation().pathname
  const token = Cookies.get(AIPT_WEB_VMS_TOKEN)

  useEffect(() => {
    const page = pages.find(p => p.path === path)
    
    // nếu page yêu cầu xác thực nhưng chưa đăng nhập
    if(!token && page?.auth) {
      window.navigatePage('login')
    }
  }, [path])

  return (
    <Routes>
      {pages.filter (
        page => !token ? !page.auth : page
      ).map((page, index) =>
        <Route key={index} path={page.path} element={page.element} />
      )}
    </Routes>
  )
}

export default PageContent