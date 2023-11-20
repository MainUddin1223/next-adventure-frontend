import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { IBreadCrumbProps } from '../types';
import styles from './BredCrumn.module.css';

const BreadCrumb = ({ items }: IBreadCrumbProps) => {
	const breadCrumbItems = [
		{
			title: (
				<Link href="/">
					<HomeOutlined
						style={{ fontSize: '18px', color: 'var(--primary-color)' }}
					/>
				</Link>
			),
		},
		...items.map((item) => {
			return {
				title: item.link ? (
					<Link href={item.link}>{item.label}</Link>
				) : (
					<span>{item.label}</span>
				),
			};
		}),
	];
	return (
		<div className={styles.bread_crumb_container}>
			<Breadcrumb items={breadCrumbItems} />
		</div>
	);
};

export default BreadCrumb;
