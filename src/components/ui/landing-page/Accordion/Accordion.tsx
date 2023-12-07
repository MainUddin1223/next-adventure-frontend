import { Collapse, CollapseProps } from 'antd';
import styles from './Accordian.module.css';

const Accordion = () => {
	const items: CollapseProps['items'] = [
		{
			key: '1',
			label: <h3>What is our service</h3>,
			children: (
				<p style={{ fontSize: '15px', fontWeight: 'bold' }}>
					We are providing a platform where user and agencies can exchange their
					platform.Agencies can list their upcoming plans and user can Book and
					manage the plans
				</p>
			),
		},
		{
			key: '2',
			label: <h3>Why should you use our platform</h3>,
			children: (
				<p style={{ fontSize: '15px', fontWeight: 'bold' }}>
					We are providing user options to choose the best tour plan from the
					uncountable tour agencies.
				</p>
			),
		},
		{
			key: '3',
			label: <h3>How can I book a plan</h3>,
			children: (
				<p style={{ fontSize: '15px', fontWeight: 'bold' }}>
					Pleas go through the user guideline
				</p>
			),
		},
		{
			key: '4',
			label: <h3>How can I Register my agency profile</h3>,
			children: (
				<p style={{ fontSize: '15px', fontWeight: 'bold' }}>
					Go to the login page and click "Register as tour planner"
				</p>
			),
		},
	];
	return (
		<div className={styles.container}>
			<h2>Frequently asked questions</h2>
			<Collapse items={items} defaultActiveKey={['1']} />
		</div>
	);
};

export default Accordion;
