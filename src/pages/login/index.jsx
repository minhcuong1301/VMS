import { useState } from "react"
import {AIPT_WEB_VMS_TOKEN} from "utils/constants/config"
import { actionLogin, actionGetUserInfoByToken } from "./actions"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie"

import {
  Form, Input, Button,
  Divider, Spin
} from "antd"

const RegisterPage = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [callingApi, setCallingApi] = useState(false)

  const handelLogin = async (values) => {
    setCallingApi(true)
    try {
      const {data, status} = await actionLogin(values)

      if(status === 200) {
        Cookies.set(AIPT_WEB_VMS_TOKEN, `Bearer ${data?.token}`) 
        actionGetUserInfoByToken(dispatch)
        window.navigatePage("home")
      }
    } catch(error) {
      console.log(error)
    }
    setCallingApi(false)
  }

  return (
    <div className="common-page login-page auth-page">
      <div className="page-content">
        <Spin spinning={callingApi}>
          <Form name="login-form"
            form={form}
            layout="vertical"
            size="large"
            onFinish={handelLogin}
            className="commom-form"
          >
            <Form.Item name="username"
              rules={[
                {required: true, message: "Vui lòng nhập email hoặc số điện thoại !" },
              ]}
            >
              <Input placeholder="Email hoặc số điện thoại" />
            </Form.Item>

            <Form.Item name="password"
              rules={[
                {required: true, message: "Vui lòng nhập mật khẩu !" }
              ]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>

            <Button className="w-full" type="primary" htmlType="submit">
              Đăng nhập
            </Button>

            <Divider type="horizontal" />

            <Button className="w-full"
              onClick={() => window.navigatePage("register")}
            >
              Đăng ký
            </Button>
          </Form>
        </Spin>
      </div>
    </div>
  )
}

export default RegisterPage