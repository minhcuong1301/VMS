import { useState } from 'react'
import {
  actionStartRecordingCamera,
  actionStopRecordingCamera,
  actionStopCamera,
  actionStartCamera
} from '../actions'

import {
  Modal, Row, Col, Spin,
  Button, message
} from 'antd'

const CamerasModal = ({ cameras = [], setCameras, onClose, onAddCamera, onEditCamera}) => {
  const [callingApi, setCallApi] = useState(false)

  const handleStartCameraRecod = async (camera_id) => {
    setCallApi(true)
    try {
      const { data, status } = await actionStartRecordingCamera(camera_id)
      if (status === 200) {
        message.success(data?.message)
        setCameras(data?.cameras)
      }
    } catch (error) {
      console.log(error)
    }
    setCallApi(false)
  }

  const handleStopCameraRecording = async (camera_id) => {
    setCallApi(true)
    try {
      const { data, status } = await actionStopRecordingCamera(camera_id)
      if (status === 200) {
        message.success(data?.message)
        setCameras(data?.cameras)
      }
    } catch (error) {
      console.log(error)
    }
    setCallApi(false)
  }

  const handleStartCamera = async (camera_id) => {
    setCallApi(true)
    try {
      const { data, status } = await actionStartCamera(camera_id)
      if (status === 200) {
        message.success(data?.message)
        setCameras(data?.cameras)
      }
    } catch (error) {
      console.log(error)
    }
    setCallApi(false)
  }

  const handleStopCamera = async (camera_id) => {
    setCallApi(true)
    try {
      const { data, status } = await actionStopCamera(camera_id)
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
      title="Cameras"
      className='common-modal footer-not-false'
      width={350}
      footer={<Row gutter={[16, 0]}>
        <Col span={12}>
          <Button className='w-full' onClick={onClose} >Thoát</Button>
        </Col>

        <Col span={12}>
          <Button type='primary' className='w-full' onClick={onAddCamera}>Thêm camera</Button>
        </Col>
      </Row>}
      style={{ top: 10 }}
    >
      <Spin spinning={callingApi}>
        <Row gutter={[8, 8]}>
          {cameras.map((camera, index) =>
            <Col key={camera?.id} span={24}>
              <Row justify="space-between">
                <Col>
                  {camera?.name}: {camera?.rtsp}
                </Col>

                <Col>
                  <Row gutter={[8, 0]} className='flex--nowarp'>
                    <Col>
                      {camera?.status === 1 ? <Button onClick={() => handleStopCamera(camera?.id)}>
                        Tắt
                      </Button> :
                        <Button onClick={() => handleStartCamera(camera?.id)}>
                          Bật
                        </Button>}
                    </Col>

                    <Col>
                      {camera?.record_status === 0 ?
                        <Button onClick={() => handleStartCameraRecod(camera?.id)}>
                          Ghi hình
                        </Button> :
                        <Button onClick={() => handleStopCameraRecording(camera?.id)}>
                          Tắt ghi hình
                        </Button>}
                    </Col>

                    <Col>
                      <Button onClick={() =>  onEditCamera(camera) } >
                        Sửa
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          )}
        </Row>

      </Spin >
    </Modal >
  )
}

export default CamerasModal