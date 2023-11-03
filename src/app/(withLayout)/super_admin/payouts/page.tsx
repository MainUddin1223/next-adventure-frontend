'use client';
import ExpandableTable from '@/components/ui/Tables/ExpandableTable/ExpandableTable';
import LoadingSpinner from '@/components/ui/loader/Loader';
import {
	useGetPayoutsQuery,
	usePayoutRelaseMutation,
} from '@/redux/api/adminApi';
import { useAppDispatch, useDebounced } from '@/redux/hooks';
import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Badge, Button, Dropdown, Space, Table } from 'antd';
import { useState } from 'react';

interface DataType {
	key: React.Key;
	name: string;
	platform: string;
	version: string;
	upgradeNum: number;
	creator: string;
	createdAt: string;
}

interface ExpandedDataType {
	key: React.Key;
	date: string;
	name: string;
	upgradeNum: string;
}

const items = [
	{ key: '1', label: 'Action 1' },
	{ key: '2', label: 'Action 2' },
];

const Payouts = () => {
	const query: Record<string, any> = {};
	const [size, setSize] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const [sortBy, setSortBy] = useState<string>('');
	const [sortOrder, setSortOrder] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const dispatch = useAppDispatch();
	const [payoutRelase] = usePayoutRelaseMutation();

	query['limit'] = size;
	query['page'] = page;

	// query['sortBy'] = sortBy
	// query['sortOrder'] = sortOrder

	const onPaginationChange = (page: number, pageSize: number) => {
		setSize(pageSize);
		setPage(page);
	};

	const handlePayouts = async (id: number) => {
		const result = await payoutRelase(id).unwrap();
	};

	const debouncedTerm = useDebounced({
		searchQuery: searchTerm,
		delay: 600,
	});
	if (!!debouncedTerm) {
		query['search'] = searchTerm;
	}

	const { data: agencyPayouts, isLoading } = useGetPayoutsQuery({ ...query });

	if (isLoading) {
		return <LoadingSpinner />;
	}

	const payouts = agencyPayouts?.result;
	const meta = agencyPayouts?.meta;

	const paginationConfig = {
		pageSize: size,
		total: meta?.total,
		pageSizeOptions: [5, 10, 20],
		showSizeChanger: true,
		onChange: onPaginationChange,
	};

	//   const expandedRowRender = () => {
	//     const columns: TableColumnsType<ExpandedDataType> =[
	//   {
	//     title: 'Payout list',
	//     key: 'payout_list',
	//         render: (payoutlist) => {
	//           return (
	//             <ExpandableTable data={ payoutlist?.payout_history} />
	//           )
	//         }
	//   },
	// ];
	//     return <Table columns={columns} dataSource={payouts} pagination={false} />;
	//   };

	const columns: TableColumnsType<DataType> = [
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Name',
			key: 'name',
			render: (data) => {
				return (
					<div>
						<h3>
							{data?.first_name} {data?.last_name}
						</h3>
					</div>
				);
			},
		},
		{
			title: 'Payouts',
			key: 'name',
			render: (data) => {
				return (
					<div>
						{data.groupedPayouts.length ? (
							data.groupedPayouts.map(
								(payoutsData: any, i: number) =>
									payoutsData?.status == 'pending' && (
										<h4 key={i}>
											{payoutsData?.status}{' '}
											<strong>{payoutsData?.totalAmount.toFixed(2)}</strong>
										</h4>
									)
							)
						) : (
							<>Yet to start</>
						)}
					</div>
				);
			},
		},
		{
			title: 'Pay',
			key: 'operation',
			render: (data) => {
				return (
					<div>
						{data.groupedPayouts.length ? (
							data.groupedPayouts.map(
								(payoutsData: any, i: number) =>
									payoutsData?.status == 'pending' && (
										<Button
											type="primary"
											key={i}
											onClick={() => handlePayouts(data.id)}
										>
											Pay now
										</Button>
									)
							)
						) : (
							<Button disabled>Pay now</Button>
						)}
					</div>
				);
			},
		},
	];

	const data: any = [];
	payouts.map((item: any, i: number) => {
		data.push({ ...item, key: i.toString() });
	});

	return (
		<>
			<Table
				columns={columns}
				// expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
				dataSource={data}
				pagination={paginationConfig}
				size="small"
			/>
		</>
	);
};

export default Payouts;
