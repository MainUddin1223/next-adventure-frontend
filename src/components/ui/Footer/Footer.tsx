'use client';
import {
	FacebookOutlined,
	GithubOutlined,
	LinkedinOutlined,
	MediumOutlined,
} from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import styles from './Footer.module.css';

const FooterSection = () => {
	const handleNewsletter = () => {
		console.log('submitted');
	};
	const date = new Date();
	const year = date.getFullYear();
	return (
		<div className={styles.footer}>
			<div className={styles.container}>
			<div>
				<Row gutter={[20, 20]}>
					{/* ------------contact info---------- */}
					<Col md={8} sm={24}>
						<div className={styles.footer_info}>
							<h4>Contact Info</h4>
							<p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
								GEC, Chattogram, Bangladesh
							</p>
							<p style={{ margin: '10px 0' }}>
								Email : mainuddin.dev@gmail.com
							</p>
							<p>Phone : +8801852902208 </p>
						</div>
					</Col>
					{/* ------------Social media---------- */}
					<Col md={8} sm={24}>
						<div className={styles.footer_info}>
							<h4>Social Media</h4>
							<a href="https://github.com/MainUddin1223/" target="_blank">
								Github
							</a>
							<a href="www.linkedin.com/in/md-main-uddin-dev" target="_blank">
								Linkedin
							</a>
							<a href="https://medium.com/@main-uddin" target="_blank">
								Medium
							</a>
							<a
								href="https://www.facebook.com/webdev.main.uddin"
								target="_blank"
							>
								Facebook
							</a>
						</div>
					</Col>
					{/* ------------Newsletter---------- */}
					<Col md={8} sm={24}>
						<div className={styles.footer_info}>
							<h4>Newsletter</h4>
							<p>
								Stay in the Loop! Subscribe to our newsletter and never miss a
								beat. Be consistently updated about our latest offerings and
								exciting news. Join us on this journey!
							</p>
							<div style={{ display: 'flex', margin: '15px 0' }}>
								<Input type="email" placeholder="Your email address" />
								<Button type="primary" onClick={handleNewsletter}>
									Subscribe
								</Button>
							</div>
						</div>
					</Col>
				</Row>
			</div>
			<hr />
			<div className={styles.icons_container}>
				<p>{` © ${year} · Next Adventure`}</p>
				<div className={styles.icons}>
					<a href="https://github.com/MainUddin1223/" target="_blank">
						<GithubOutlined style={{ fontSize: '25px' }} />
					</a>
					<a
						href="www.linkedin.com/in/md-main-uddin-dev"
						target="_blank"
						style={{ fontSize: '25px' }}
					>
						{' '}
						<LinkedinOutlined />
					</a>
					<a
						href="https://medium.com/@main-uddin"
						target="_blank"
						style={{ fontSize: '25px' }}
					>
						<MediumOutlined />
					</a>
					<a
						href="https://www.facebook.com/webdev.main.uddin"
						target="_blank"
						style={{ fontSize: '25px' }}
					>
						<FacebookOutlined />
					</a>
				</div>
			</div>
		</div>
		</div>
	);
};

export default FooterSection;
