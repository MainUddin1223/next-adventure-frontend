'use client';

import {
	DeleteOutlined,
	EditOutlined,
	EyeOutlined,
	ReloadOutlined,
} from '@ant-design/icons';
import { Button, Card, Input, message } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useDebounced } from '@/redux/hooks';
import DesktopTable from '@/components/ui/Tables/TableForDesktop/DesktopTable';
import { useGetAllAgenciesQuery } from '@/redux/api/adminApi';

const AgenciesManagement = () => {
	const query: Record<string, any> = {};
	const [size, setSize] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const [sortBy, setSortBy] = useState<string>('');
	const [sortOrder, setSortOrder] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');

	query['limit'] = size;
	query['page'] = page;

	const onPaginationChange = (page: number, pageSize: number) => {
		setSize(pageSize);
		setPage(page);
	};

	const debouncedTerm = useDebounced({
		searchQuery: searchTerm,
		delay: 600,
	});
	if (!!debouncedTerm) {
		query['search'] = searchTerm;
	}

	const { data, isLoading } = useGetAllAgenciesQuery({ ...query });

	const departments = data?.result;
	const meta = data?.meta;

	const onTableChange = (pagination: any, filter: any, sorter: any) => {
		const { field, order } = sorter;
		setSortBy(field as string);
		setSortOrder(order === 'asc' ? 'asc' : 'desc');
	};

	const resetFilters = () => {
		setSortBy('');
		setSortOrder('');
		setSearchTerm('');
	};

	const columns = [
		{
			title: 'Name',
			render: function (data: any) {
				return (
					<>
						<div style={{ display: 'flex', gap: '5px' }}>
							<h3>{data?.first_name}</h3>
							<h3>{data?.last_name}</h3>
						</div>
					</>
				);
			},
		},
		{
			title: 'CreatedAt',
			dataIndex: 'createdAt',
			render: function (data: any) {
				return data && dayjs(data).format('MMM D, YYYY hh:mm A');
			},
			sorter: true,
		},
		{
			title: 'Action',
			render: function (data: any) {
				return (
					<>
						<div style={{ display: 'flex', gap: '5px' }}>
							<Button type="primary">
								<EditOutlined />
							</Button>
							<Button type="primary">
								<DeleteOutlined />
							</Button>
						</div>
					</>
				);
			},
		},
	];

	return (
		<div style={{ margin: '10px' }}>
			<Card>
				<Input
					type="text"
					size="large"
					placeholder="Search ... "
					style={{ width: '20%' }}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div>
					{(!!sortBy || !!sortOrder || !!searchTerm) && (
						<Button
							onClick={resetFilters}
							type="primary"
							style={{ margin: '0px 5px' }}
						>
							<ReloadOutlined />
						</Button>
					)}
				</div>
				<DesktopTable
					columns={columns}
					dataSource={departments}
					loading={isLoading}
					pageSize={size}
					totalPages={meta?.total}
					showSizeChanger={true}
					onPaginationChange={onPaginationChange}
					onTableChange={onTableChange}
					showPagination={true}
				/>
			</Card>
		</div>
	);
};

export default AgenciesManagement;
