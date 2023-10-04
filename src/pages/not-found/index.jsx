import { Button } from 'antd'
import { AiptLogo } from 'assets'
import "./index.scss"

const NotFoundPage = () => {
  return (
    <div className="common-page not-found-page">
      <div className="page-content">
        <img src={AiptLogo} width={315}/>

        <h3>TRANG TÌM KIẾM KHÔNG TỒN TẠI !</h3>

        <Button size='large'
          onClick={() => window.navigatePage('home')}
        >
          Quay lại trang chủ
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage