import { Col, Row, Skeleton } from 'antd';
import PlanSkeleton from './PlanSkeleton';

const SkeletonLoader = ({
	items,
	sm = 24,
	md = 12,
}: {
	items: number;
	sm?: number;
	md?: number;
}) => {
	return (
		<div>
			{/* activities sceleton */}
			<div>
				<Row gutter={[20, 20]} style={{ margin: '100px 0' }}>
					<Col xs={24} md={12}>
						<Skeleton.Input
							active={true}
							block={true}
							style={{ width: '100%', height: '80px' }}
						/>
					</Col>
					<Col xs={24} md={12}>
						<Skeleton.Input
							active={true}
							block={true}
							style={{ width: '100%', height: '80px' }}
						/>
					</Col>
					<Col xs={24} md={12}>
						<Skeleton.Input
							active={true}
							block={true}
							style={{ width: '100%', height: '80px' }}
						/>
					</Col>
					<Col xs={24} md={12}>
						<Skeleton.Input
							active={true}
							block={true}
							style={{ width: '100%', height: '80px' }}
						/>
					</Col>
				</Row>
			</div>

			{/* plan section */}
			<PlanSkeleton />

			<Row gutter={[15, 15]} justify={'center'}>
				{Array.from({ length: items }, (_, index) => (
					<Col sm={sm} md={md} key={index}>
						<div>
							<div>
								<Skeleton.Image active style={{ margin: '10px' }} />
								<Skeleton active />
							</div>
							<Skeleton active />
						</div>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default SkeletonLoader;
