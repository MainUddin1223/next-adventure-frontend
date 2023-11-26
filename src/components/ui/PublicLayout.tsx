import { Layout } from 'antd';
import React from 'react';
import FooterSection from './Footer/Footer';
import NavBar from './navBar/NavBar';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Layout>
				<NavBar />
				<div style={{ minHeight: '100vh' }}>{children}</div>
				<div>
					<FooterSection />
				</div>
			</Layout>
		</div>
	);
};

export default PublicLayout;
