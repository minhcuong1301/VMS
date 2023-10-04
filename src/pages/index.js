import FeaturesPage from './not-found'
import HomePage from './home'
import LoginPage from './login'
import RegisterPage from './register'
import NotFoundPage from './not-found'
import ReportsPage from './reports'

const pages = [
  {
    name: "login",
    path: "/login",
    auth: false,
    element: <LoginPage/>
  },
  {
    name: "register",
    path: "/register",
    auth: false,
    element: <RegisterPage />
  },
  {
    name: "reports",
    path: "/reports",
    auth: true,
    element: <ReportsPage />
  },
  {
    name: "home",
    path: "/",
    auth: true,
    element: <HomePage />
  },
  // {
  //   name: "not-found",
  //   path: "*",
  //   auth: false,
  //   element: <NotFoundPage />
  // },
]

export default pages