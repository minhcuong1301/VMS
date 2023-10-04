import {
  Modal, Button, Radio, Row, Col
} from 'antd'

const SettingModal = ({ onClose, setGirdSpan }) => {
  return (
    <Modal
      open={true}
      closeIcon={false}
      title="Chế độ xem"
      className='common-modal footer-not-false'
      width={210}
      footer={<Button className='w-full' onClick={onClose}>Thoát</Button>}
    >
      <Radio.Group onChange={(e) => 
        setGirdSpan(Math.ceil(24/e.target.value))
      }>
        <Row gutter={[0, 6]} justify="space-between">
          {Array.from({ length: 5 }, (_, index) => index + 1)
          .filter(v => v > 1)
          .map((v) =>
            <Col>
              <Radio key={v} value={v}>{`${v} : ${v}`}</Radio>
            </Col>
          )}
        </Row>
      </Radio.Group>
    </Modal>
  )
}

export default SettingModal