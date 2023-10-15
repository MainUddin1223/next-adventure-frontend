import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const LoadingSpinner = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;
    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
            <Spin indicator={antIcon} style={{ }}/>
      </div>
  )
}

export default LoadingSpinner