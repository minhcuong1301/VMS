import { useState, useEffect } from "react"
import { AiptLogo } from 'assets'
import moment from "moment"
import dayjs from "dayjs"
import { DATETIME_FORMAT, DATETIME_FORMAT_REQUEST } from "utils/constants/config"
import { saveAs } from "file-saver"

import {
  DownloadOutlined,
  PlayCircleOutlined,
  RedoOutlined 
} from "@ant-design/icons"

import {
  Row, Col, DatePicker,
  Select, Table, Space,
  Button, Spin
} from 'antd'

import {
  actionDownLoadRecord,
  actionGetCameras,
  actionOpenRecord,
  actionGetRecords
} from './actions'

const now = Date.now()

const ReportsPage = () => {
  const [cameras, setCameras] = useState([])
  const [records, setRecords] = useState([])
  const [startTime, setStartTime] = useState(moment(now).startOf("D").format(DATETIME_FORMAT))
  const [endTime, setEndTime] = useState(moment(now).format(DATETIME_FORMAT))
  const [cameraID, setCameraID] = useState()
  const [callApi, setCallApi] = useState(false)

  const handleGetCameras = async () => {
    setCallApi(true)
    try {
      const { data, status } = await actionGetCameras()
      if (status === 200) {
        setCameras(data)
      }
    } catch (error) {
      console.log(error)
    }
    setCallApi(false)
  }

  const handleGetRecords = async (cameraID, startTime, endTime) => {
    setCallApi(true)
    try {
      const params = {
        camera_id: cameraID,
        start_time: moment(startTime, DATETIME_FORMAT).format(DATETIME_FORMAT_REQUEST),
        end_time: moment(endTime, DATETIME_FORMAT).format(DATETIME_FORMAT_REQUEST)
      }

      const { data, status } = await actionGetRecords(params)

      if (status === 200) {
        setRecords(data)
      }
    } catch (error) {
      console.log(error)
    }
    setCallApi(false)
  }

  const handleDownLoadRecord = async (record_id) => {
    setCallApi(true)
    try {
      const { data, status } = await actionDownLoadRecord(record_id)
      if (status === 200) {
        saveAs(data, `bản_ghi_#${record_id}.mp4`)
      }
    } catch (error) {
      console.log(error)
    }
    setCallApi(false)
  }

  const handleOpenRecord = async (record_id) => {
    setCallApi(true)
    try {
      const { data, status } = await actionOpenRecord(record_id)
      if (status === 200) {
        const videoUrl = URL.createObjectURL(data);
        window.open(videoUrl);
      }
    } catch (error) {
      console.log(error)
    }
    setCallApi(false)
  }

  useEffect(() => {
    handleGetCameras()
  }, [])

  useEffect(() => {
    handleGetRecords(cameraID, startTime, endTime)
  }, [cameraID, startTime, endTime])

  const columns = [
    {
      width: 100,
      title: "Tên camera",
      dataIndex: "camera_name",
      key: "camera_name",
      render: (_, r) => cameras.find(c => c.id == r.camera_id).name,
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "start",
      key: "start",
      render: (v) => moment(v, DATETIME_FORMAT_REQUEST).format(DATETIME_FORMAT)
    },
    {
      with: 150,
      title: "Thời gian kết thúc",
      dataIndex: "end",
      key: "end",
      render: (v) => moment(v, DATETIME_FORMAT_REQUEST).format(DATETIME_FORMAT)
    },
    {
      title: "Rtsp",
      dataIndex: "rtsp",
      key: "rtsp"
    },
    {
      width: 231,
      title: "Đường dẫn lưu trữ",
      key: "actions",
      render: (_, r) => (
        <Space>
          <Button size="small"
            icon={<DownloadOutlined />}
            onClick={() => handleDownLoadRecord(r?.id)}
          >
            Lưu video
          </Button> |

          <Button
            size="small"
            icon={<PlayCircleOutlined />}
            onClick={() => handleOpenRecord(r.id)}
          >
            Mở video
          </Button>
        </Space>
      )
    }
  ]

  return (
    <div className="report-page common-page">
      <div className="page-header">
        <Row className='page-header--content' gutter={[24, 8]}>
          <Col className='page-header--content--left'>
            <img className='app-logo' src={AiptLogo} 
              style={{cursor: "pointer"}}
              onClick={() => window.navigatePage("home")}
            />
          </Col>

          <Col className='page-header--content--right'>
            <span className='page-header--title'>
              BÁO CÁO KẾT QUẢ NHẬN DIỆN
            </span>
          </Col>
        </Row>
      </div>

      <div className="page-content">
        <Spin spinning={callApi}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Row gutter={[8, 8]} className="filler">
                <Col className="filler--item">
                  <Select placeholder="Nhãn camera ..."
                    onChange={(v) => setCameraID(v)}
                    allowClear
                    className="w-full"
                    optionLabelProp="label"
                  >
                    {cameras.map((camera) =>
                      <Select.Option label={camera?.name} key={camera?.id}>
                        {camera?.name}: {camera?.rtsp}
                      </Select.Option>
                    )}
                  </Select>
                </Col>

                <Col className="filler--item">
                  <DatePicker
                    className="w-full"
                    allowClear={false}
                    showTime
                    onChange={(_, v) => setStartTime(v)}
                    placeholder='Thời gian bắt đầu'
                    value={dayjs(startTime, DATETIME_FORMAT)}
                    format={DATETIME_FORMAT}
                  />
                </Col>

                <Col className="filler--item">
                  <DatePicker
                    className="w-full"
                    allowClear={false}
                    showTime
                    onChange={(_, v) => setEndTime(v)}
                    placeholder='Thời gian kết thúc'
                    value={dayjs(endTime, DATETIME_FORMAT)}
                    format={DATETIME_FORMAT}
                  />
                </Col>

                <Col>
                  <Button icon={<RedoOutlined />} onClick={() => window.location.reload()}>
                    Lấy dữ liệu mới
                  </Button>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Table
                width="100%"
                dataSource={records}
                rowKey={(r) => r.id}
                size="small"
                columns={columns}
              />
            </Col>
          </Row>
        </Spin>
      </div>
    </div>
  )
}

export default ReportsPage