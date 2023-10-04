import { EMAIL_PATTERN, PHONE_PATTERN } from "utils/constants/config"
import { actionRegister } from "./actions"
import { useState } from "react"

import {
  Form, Input, Button,
  Divider, message, Spin
} from "antd"

const RegisterPage = () => {
  const [form] = Form.useForm()
  const [callingApi, setCallingApi] = useState(false)

  const handelRegiter = async (values) => {
    setCallingApi(true)
    try {
      delete values["password-confirm"]
      const { data, status } = await actionRegister(values)

      if (status === 200) {
        message.success(data?.message)
      }
    } catch (error) {
      console.log(error)
    }
    setCallingApi(false)
  }

  return (
    <div className="common-page register-page auth-page">
      <div className="page-content">
        <Spin spinning={callingApi}>
          <Form name="register-form"
            form={form}
            layout="vertical"
            size="large"
            onFinish={handelRegiter}
            className="commom-form"
          >
            <Form.Item name="group-name"
              rules={[
                {required: true, message: "Vui lòng nhập Tên đơn vị, tổ chức !" },
              ]}
            >
              <Input placeholder="Tên đơn vị, tổ chức"/>
            </Form.Item>

            <Form.Item name="name"
              rules={[
                {required: true, message: "Vui lòng nhập họ và tên !" },
              ]}
            >
              <Input placeholder="Họ và tên" />
            </Form.Item>

            <Form.Item name="phone"
              rules={[
                {required: true, message: "Vui lòng nhập số điện thoại !" },
                {pattern: PHONE_PATTERN, message: "Số điện thoại không đúng định dạng !" },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>

            <Form.Item name="email"
              rules={[
                {required: true, message: "Vui lòng nhập email !" },
                {pattern: EMAIL_PATTERN, message: "Email không đúng định dạng !" }
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item name="password"
              rules={[
                {required: true, message: "Vui lòng nhập mật khẩu !" }
              ]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item name="password-confirm"
              dependencies={['password']}
              rules={[
                {required: true, message: "Vui lòng nhập lại mật khẩu !" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không giống nhau !'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>

            <Button className="w-full" type="primary" htmlType="submit">
              Đăng ký
            </Button>

            <Divider type="horizontal" />

            <Button className="w-full"
              onClick={() => window.navigatePage("login")}
            >
              Đăng nhập
            </Button>
          </Form>
        </Spin>
      </div>
    </div>
  )
}

export default RegisterPage