import Providers from '@/lib/Providers';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Next Adventure',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Providers>
			<ConfigProvider
				theme={{
					components: {
						Input: {
							activeBg: 'white',
							hoverBg: 'rgb(229, 235, 240)',
						},
						Button: {
							fontWeight: 600
						},
						Drawer: {
							colorBgElevated: 'var(--accent-color)',
						},
						Breadcrumb: {
							itemColor: '#327012',
							linkHoverColor: '#327012',
							fontSize: 25,
						},
					},
					token: {
						colorPrimary: '#088345',
						borderRadius: 0,
					},
				}}
			>
				<html lang="en">
					<body className={inter.className}>{children}</body>
				</html>
			</ConfigProvider>
		</Providers>
	);
}
