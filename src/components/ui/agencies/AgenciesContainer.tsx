'use client';

import { useGetAgenciesQuery } from '@/redux/api/publicApi';
import { useDebounced } from '@/redux/hooks';
import { Col, Input, Row } from 'antd';
import { useState } from 'react';
import DataNotFound from '../DataNotFound/DataNotFound';
import SkeletonLoader from '../Skeleton/Skeleton';
import AgencyCard from '../agencyCard/AgencyCard';
import PaginationCompo from '../pagination/Pagination';
import styles from './agencyContainer.module.css';

const AgenciesContainer = () => {
	const query: Record<string, any> = {};
	const [size, setSize] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const [searchTerm, setSearchTerm] = useState<string>('');

	query['limit'] = size;
	query['page'] = page;

	const debouncedTerm = useDebounced({
		searchQuery: searchTerm,
		delay: 1000,
	});

	if (!!debouncedTerm) {
		query['search'] = debouncedTerm;
	}

	const { data, isLoading } = useGetAgenciesQuery({ ...query });
	if (isLoading) {
		return (
			<>
				<SkeletonLoader items={8} sm={24} md={6} />
			</>
		);
	}
	//@ts-ignore
	const agencies: [] = data?.result;
	//@ts-ignore
	const meta = data?.meta;

	return (
		<div className={styles.agency_section}>
			<div>
				<div className={styles.search_field}>
					<Input
						type="text"
						size="large"
						placeholder="Search ... "
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				{agencies?.length ? (
					<div>
						<div>
							<Row gutter={[24, 24]}>
								{agencies.map((agency: any) => (
									<Col xs={24} sm={24} md={12} lg={12} xl={8} key={agency.id}>
										<AgencyCard agency={agency} />
									</Col>
								))}
							</Row>
						</div>
						<PaginationCompo
							totalPage={meta?.totalPage}
							setSize={setSize}
							setPage={setPage}
						/>
					</div>
				) : (
					<div style={{ margin: '0 auto', display: 'block' }}>
						<DataNotFound
							title={`No Agency matched with`}
							searchValue={searchTerm}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default AgenciesContainer;
