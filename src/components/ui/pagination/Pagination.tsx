import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { IPaginationProps } from '../types';

const PaginationCompo = ({ totalPage, setSize, setPage }: IPaginationProps) => {
	const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
		current,
		pageSize
	) => {
		setSize(pageSize);
		setPage(current);
	};
	return (
		<div
			style={{ margin: '20px 10px', display: 'flex', justifyContent: 'end' }}
		>
			<Pagination
				pageSizeOptions={[5, 10, 15, 20]}
				showSizeChanger
				onShowSizeChange={onShowSizeChange}
				defaultCurrent={1}
				total={totalPage}
				onChange={(value) => setPage(value)}
			/>
		</div>
	);
};

export default PaginationCompo;
