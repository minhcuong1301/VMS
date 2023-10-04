import { useState, useEffect } from 'react'
import { actionGetCameras } from './actions'
import SettingModal from './components/settingModal'
import CamerasModal from './components/camerasModal'
import AddCamerasModal from './components/addCameraModal'
import EditCamerasModal from './components/editCameraModal'
import { Row, Col, Button } from "antd"
import { CONFIG_SERVER, AIPT_WEB_VMS_TOKEN } from 'utils/constants/config'
import Cookies from 'js-cookie'
import './index.scss'

import {
  SettingIcon,
  CameraRtspIcon,
  ShowReportIcon,
  GroupAddUserIcon,
  LogOutIcon,
  AiptLogo
} from 'assets'

import {
  FullscreenOutlined,
  FullscreenExitOutlined
} from "@ant-design/icons"

const HomePage = () => {
  const [openSettingModal, setOpenSettingModal] = useState(false)
  const [openCamerasModal, setOpenCamerasModal] = useState(false)
  const [openAddCamerasModal, setOpenAddCamerasModal] = useState(false)
  const [cameraEdit, setCameraEdit] = useState(false)
  const [cameras, setCameras] = useState([])
  const [girdSpan, setGirdSpan] = useState(8)
  const [camOpenFull, setCamOpenFull] = useState(false)

  const handleGetCameras = async () => {
    try {
      const { data, status } = await actionGetCameras()
      if (status === 200) {
        setCameras(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenFull = (camera_id) => {
    const cameraDiv = window.document.getElementById(`camera-${camera_id}`)
    cameraDiv.classList.add("open-full")
    setCamOpenFull(true)
  }

  const handleCloseOpenFull = (camera_id) => {
    const cameraDiv = window.document.getElementById(`camera-${camera_id}`)
    cameraDiv.classList.remove("open-full")
    setCamOpenFull(false)
  }

  const handleLogOut = () => {
    window.navigatePage("login")
    Cookies.remove(AIPT_WEB_VMS_TOKEN)
  }

  useEffect(() => {
    handleGetCameras()
  }, [])

  return (
    <div className='home-page common-page'>
      <div className='page-header'>
        <Row className='page-header--content' gutter={[0, 8]}>
          <Col className='page-header--content--left'>
            <img className='app-logo' src={AiptLogo} />
          </Col>

          <Col className='page-header--content--right'>
            <CameraRtspIcon className='cam-rtsp-icon'
              onClick={() => setOpenCamerasModal(true)}
            />

            <ShowReportIcon className='show-report-icon'
              onClick={() => window.location.href = "/reports"}
            />

            {/* <GroupAddUser className='add-user-icon'/> */}

            <SettingIcon className='setting-icon' 
              onClick={() => setOpenSettingModal(true)} 
            />

            <LogOutIcon
              className='logout-icon'
              onClick={handleLogOut}
            />
          </Col>
        </Row>
      </div>

      <div className='page-content'>
        <Row gutter={[8, 8]}>
          {cameras.filter(camera => camera.status === 1)
            .map((camera) =>
              <Col key={camera.id} xs={24} sm={12} lg={girdSpan}>
                <div id={`camera-${camera?.id}`} className='camera'>
                  <div className='camera--content'>
                    <img src={`${CONFIG_SERVER.BASE_URL}/show-camera/${camera?.id}`} />

                    <div className="camera--controls">
                      {!camOpenFull ? <Button
                        type="default"
                        size="large"
                        icon={<FullscreenOutlined />}
                        onClick={() => handleOpenFull(camera?.id)}
                      /> :
                        <Button
                          type="default"
                          size="large"
                          icon={<FullscreenExitOutlined />}
                          onClick={() => handleCloseOpenFull(camera?.id)}
                        />}
                    </div>
                  </div>
                </div>
              </Col>
            )}
        </Row>
      </div>

      {openSettingModal && <SettingModal
        cameras={cameras}
        setGirdSpan={setGirdSpan}
        onClose={() => setOpenSettingModal(false)}
      />}

      {openCamerasModal && <CamerasModal
        cameras={cameras}
        setCameras={setCameras}
        onClose={() => setOpenCamerasModal(false)}
        onAddCamera={() => {
          setOpenAddCamerasModal(true)
          setOpenCamerasModal(false)
        }}
        onEditCamera={(camera) => {
          setCameraEdit(camera)
          setOpenCamerasModal(false)
        }}
      />}

      {openAddCamerasModal && <AddCamerasModal
        onClose={() => {
          setOpenAddCamerasModal(false)
          setOpenCamerasModal(true)
        }}
        setCameras={setCameras}
      />}

      {cameraEdit && <EditCamerasModal
        cameraEdit={cameraEdit}
        setCameras={setCameras}
        onClose={() => {
          setCameraEdit(null)
          setOpenCamerasModal(true)
        }}
      />}
    </div >
  )
}

export default HomePage
