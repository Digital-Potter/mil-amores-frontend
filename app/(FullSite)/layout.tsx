import Footer from '@/components/ui/Footer/Footer';
import SiteNotice from '@/components/ui/SiteNotice';
import TopBar from '@/components/ui/TopBar/TopBar';
import {
	fetchNavigationOrEmpty,
	fetchStoreSettingsOrNull,
} from '@/helpers/cms/settings';

export default async function FullSiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [headerNav, footerNav, settingsData] = await Promise.all([
		fetchNavigationOrEmpty('header'),
		fetchNavigationOrEmpty('footer'),
		fetchStoreSettingsOrNull(),
	]);
	const siteStructure = settingsData?.settings?.siteStructure;

	return (
		<>
			<SiteNotice settings={settingsData?.settings ?? null} />
			<TopBar headerNav={headerNav} siteStructure={siteStructure} />
			<div
				className="flex w-screen flex-col overflow-x-clip"
				style={{ minHeight: 'calc(100vh - 150px)' }}
			>
				{children}
				<Footer footerNav={footerNav} siteStructure={siteStructure} />
			</div>
		</>
	);
}
