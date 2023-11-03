'use client';

import { useGetTourPlansQuery } from '@/redux/api/publicApi';
import { useAppSelector, useDebounced } from '@/redux/hooks';
import { Col, Input, Row } from 'antd';
import { useState } from 'react';
import DataNotFound from '../DataNotFound/DataNotFound';
import SkeletonLoader from '../Skeleton/Skeleton';
import PaginationCompo from '../pagination/Pagination';
import PlanCard from '../planCard/PlanCard';
import styles from './TourPlanContainer.module.css';

const TourPlanContainer = () => {
	const query: Record<string, any> = {};
	const [size, setSize] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const { searchTermValue } = useAppSelector((state) => state.planState);
	const [searchTerm, setSearchTerm] = useState<string>(searchTermValue);

	query['limit'] = size;
	query['page'] = page;

	const debouncedTerm = useDebounced({
		searchQuery: searchTerm,
		delay: 1500,
	});

	if (!!debouncedTerm) {
		query['search'] = debouncedTerm;
	}

	const { data, isLoading } = useGetTourPlansQuery({ ...query });

	if (isLoading) {
		return (
			<>
				<SkeletonLoader items={8} sm={24} md={6} />
			</>
		);
	}

	//@ts-ignore
	const tourPlans: [] = data?.result;
	//@ts-ignore
	const meta = data?.meta;

	return (
		<div>
			<div>
				<div className={styles.search_field}>
					<Input
						type="text"
						size="large"
						placeholder="Search ... "
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				{tourPlans?.length ? (
					<div>
						<div>
							<Row gutter={[24, 24]}>
								{tourPlans.map((plan: any) => (
									<Col xs={24} sm={24} md={12} lg={12} xl={8} key={plan.id}>
										<PlanCard plan={plan} />
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
							title={`No Plan matched with`}
							searchValue={searchTerm}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default TourPlanContainer;
