import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

export type IMobileTableProps = {
    items: any;
    loading?: boolean;
    pageSize?: number;
    totalPages?: number;
    showSizeChanger?: boolean;
    showPagination?: boolean;
    onPaginationChange?: (page: number, pageSize: number) => void;
}

const MobileTable = ({ items }: IMobileTableProps) => {
    return (
        <Collapse
        accordion
        expandIconPosition='end'
        expandIcon={(accordion) => accordion?.isActive ? <ShrinkOutlined style={{ fontSize: '35px', marginTop: "20px", color: 'red' }} /> : <ArrowsAltOutlined style={{ fontSize: '35px', color: 'var(--primary-color)', marginTop: "20px" }} />} size='large' items={items} />
    )

}

export default MobileTable;