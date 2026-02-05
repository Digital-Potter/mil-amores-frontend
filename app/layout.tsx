import './globals.css';

import type { Metadata } from 'next';

import Footer from '@/components/ui/Footer';
import TopBar from '@/components/ui/TopBar';
import { primaryFont, secondaryFont } from '@/helpers/FontSettings';

export const metadata: Metadata = {
	metadataBase: new URL('https://milamorestaqueriava.com'),
	title: 'Mil Amores Taqueria | Mexican Restaurant in Williamsburg, VA',
	description:
		'Enjoy handcrafted drinks and delicious, wallet-friendly meals right here in Williamsburg, Virginia! Same Taqueria Maria Bonita owners',
	openGraph: {
		locale: 'en_US',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${primaryFont.variable} ${secondaryFont.variable} antialiased`}
			>
				<TopBar />
				<div
					className="flex w-screen flex-col overflow-x-hidden"
					style={{ minHeight: 'calc(100vh - 150px)' }}
				>
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}
