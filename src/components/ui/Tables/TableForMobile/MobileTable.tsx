import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

const MobileTable = ({items}:{items:any}) => <Collapse accordion expandIconPosition='end' expandIcon={(accordion)=> accordion?.isActive ?<ShrinkOutlined style={{fontSize:'35px',marginTop:"20px",color:'red'}}/>:<ArrowsAltOutlined style={{fontSize:'35px',color:'var(--primary-color)',marginTop:"20px"}}/>} size='large' items={items} />;

export default MobileTable;