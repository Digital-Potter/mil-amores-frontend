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
			<head>
				<link
					rel="icon"
					type="image/png"
					href="/icons/favicon-96x96.png"
					sizes="96x96"
				/>
				<link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
				<link rel="shortcut icon" href="/icons/favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/icons/apple-touch-icon.png"
				/>
				<meta name="apple-mobile-web-app-title" content="Mil Amores" />
				<link rel="manifest" href="/icons/site.webmanifest" />
			</head>
			<body
				className={`${primaryFont.variable} ${secondaryFont.variable} antialiased`}
			>
				<TopBar />
				<div
					className="flex w-screen flex-col overflow-x-clip"
					style={{ minHeight: 'calc(100vh - 150px)' }}
				>
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}
