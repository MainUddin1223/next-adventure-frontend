import { Skeleton } from 'antd';

const PlanSkeleton = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				width: '80%',
				margin: '50px auto',
			}}
		>
			<div style={{ margin: '10px', width: '350px' }}>
				<Skeleton.Image
					active={true}
					style={{ width: '200px', height: '150px', margin: '10px 0' }}
				/>
				<Skeleton active style={{ margin: '15px 0' }} />
				<Skeleton.Input active={true} block={true} style={{ width: '150px' }} />
			</div>
			<div style={{ margin: '10px', width: '350px' }}>
				<Skeleton.Image
					active={true}
					style={{ width: '200px', height: '150px', margin: '10px 0' }}
				/>
				<Skeleton active style={{ margin: '15px 0' }} />
				<Skeleton.Input active={true} block={true} style={{ width: '150px' }} />
			</div>
			<div style={{ margin: '10px', width: '350px' }}>
				<Skeleton.Image
					active={true}
					style={{ width: '200px', height: '150px', margin: '10px 0' }}
				/>
				<Skeleton active style={{ margin: '15px 0' }} />
				<Skeleton.Input active={true} block={true} style={{ width: '150px' }} />
			</div>
			<div style={{ margin: '10px', width: '350px' }}>
				<Skeleton.Image
					active={true}
					style={{ width: '200px', height: '150px', margin: '10px 0' }}
				/>
				<Skeleton active style={{ margin: '15px 0' }} />
				<Skeleton.Input active={true} block={true} style={{ width: '150px' }} />
			</div>
		</div>
	);
};

export default PlanSkeleton;
