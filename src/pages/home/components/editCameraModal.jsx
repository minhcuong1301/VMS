import { actionEditCamera } from '../actions'
import { useState } from 'react'

import {
  Modal, Row, Col,
  Button, Form, Input,
  Select, message, Spin
} from 'antd'

const EditCamerasModal = ({ cameraEdit, setCameras, onClose }) => {
  const [callingApi, setCallApi] = useState(false)

  const handleEditCamera = async (values) => {
    setCallApi(true)
    try {
      const {data, status} = await actionEditCamera(values, cameraEdit?.id)
      if (status === 200) {
        message.success(data?.message)
        setCameras(data?.cameras)
        onClose()
      }
    } catch (error) {
      console.log(error)
    }
    setCallApi(false)
  }

  return (
    <Modal
      open={true}
      closeIcon={false}
      title="Sửa Cameras"
      className='common-modal'
      width={350}
      footer={false}
    >
      <Spin spinning={callingApi}>
        <Form
          layout="vertical"
          className="commom-form"
          onFinish={handleEditCamera}
          initialValues={cameraEdit}
        >
          <Form.Item name="name">
            <Input placeholder="Tên cameras" disabled/>
          </Form.Item>

          <Form.Item name='rtsp'
            rules={[
              { required: true, message: "Vui lòng nhập link camera" }
            ]}
          >
            <Input placeholder='link camera' />
          </Form.Item>

          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Button className='w-full' onClick={onClose} >Thoát</Button>
            </Col>

            <Col span={12}>
              <Button htmlType='submit' type='primary' className='w-full'>Lưu</Button>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  )
}

export default EditCamerasModal