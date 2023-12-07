import { Skeleton } from 'antd';
import styles from './Skeleton.module.css';

const PlanSkeleton = () => {
	return (
		<div className={styles.plan_Skeleton_container}>
			<Skeleton active />
			<hr />
			<div className={styles.plans_container}>
				<div
					className={`${styles.plans_ipad} ${styles.plans_mobile}`}
					style={{
						width: '350px',
						boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
						padding: '5px',
					}}
				>
					<Skeleton.Image
						active
						style={{ marginBottom: '20px', width: '340px', height: '180px' }}
					/>
					<Skeleton active />
					<hr />
					<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
						<Skeleton.Avatar active style={{ width: '50px', height: '50px' }} />
						<Skeleton.Input active />
					</div>
					<Skeleton.Input
						active
						style={{ marginTop: '10px', height: '15px' }}
					/>
					<br />
					<Skeleton.Button
						active
						style={{ marginTop: '20px', width: '150px' }}
					/>
				</div>

				<div
					style={{
						width: '350px',
						boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
						padding: '5px',
					}}
				>
					<Skeleton.Image
						active
						style={{ marginBottom: '20px', width: '340px', height: '180px' }}
					/>
					<Skeleton active />
					<hr />
					<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
						<Skeleton.Avatar active style={{ width: '50px', height: '50px' }} />
						<Skeleton.Input active />
					</div>
					<Skeleton.Input
						active
						style={{ marginTop: '10px', height: '15px' }}
					/>
					<br />
					<Skeleton.Button
						active
						style={{ marginTop: '20px', width: '150px' }}
					/>
				</div>
			</div>
		</div>
	);
};

export default PlanSkeleton;
