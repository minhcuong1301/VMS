import { actionAddCamera } from '../actions'
import { useState } from 'react'

import {
  Modal, Row, Col,
  Button, Form, Input,
  Select, message, Spin
} from 'antd'

const AddCamerasModal = ({ onClose, setCameras}) => {
  const [callingApi, setCallApi] = useState(false)

  const handleAddCamera = async (value) => {
    setCallApi(true)
    
    try {
      const {data, status} = await actionAddCamera(value)

      if (status === 200) {
        message.success(data?.message)
        setCameras(data?.cameras)
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
      title="Thêm Cameras"
      className='common-modal'
      width={350}
      footer={false}
    >
      <Spin spinning={callingApi}>
        <Form
          layout="vertical"
          className="commom-form"
          onFinish={handleAddCamera}
        >
          <Form.Item name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên camera" }
            ]}
          >
            <Input placeholder="Tên cameras" />
          </Form.Item>

          <Form.Item name='rtsp'
            rules={[
              { required: true, message: "Vui lòng nhập link camera" }
            ]}
          >
            <Input placeholder='link camera' />
          </Form.Item>

          <Form.Item name='record_status' initialValue={0}>
            <Select>
              <Select.Option value={1}>Ghi hình</Select.Option>
              <Select.Option value={0}>Tắt ghi hình</Select.Option>
            </Select>
          </Form.Item>

          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Button className='w-full' onClick={onClose} >Thoát</Button>
            </Col>

            <Col span={12}>
              <Button htmlType='submit' type='primary' className='w-full'>Thêm camera</Button>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  )
}

export default AddCamerasModal