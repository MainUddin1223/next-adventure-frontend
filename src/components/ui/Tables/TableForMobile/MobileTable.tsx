import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

export type IMobileTableProps = {
	items: any;
	loading?: boolean;
	pageSize?: number;
	totalPages?: number;
	showSizeChanger?: boolean;
	showPagination?: boolean;
	onPaginationChange?: (page: number, pageSize: number) => void;
};

const MobileTable = ({ items }: IMobileTableProps) => {
	return (
		<Collapse
			accordion
			expandIconPosition="end"
			expandIcon={(accordion) =>
				accordion?.isActive ? (
					<UpCircleOutlined
						style={{ fontSize: '25px', marginTop: '20px', color: 'red' }}
					/>
				) : (
					<DownCircleOutlined
						style={{
							fontSize: '25px',
							color: 'var(--primary-color)',
							marginTop: '20px',
						}}
					/>
				)
			}
			size="large"
			items={items}
		/>
	);
};

export default MobileTable;
