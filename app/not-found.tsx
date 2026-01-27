import { Metadata } from 'next';

import SolidButton from '@/components/ui/SolidButton';

export const metadata: Metadata = {
	title: '404 - Not Found | Digital Potter, VA',
	description: 'Could not find requested resource',
	robots: 'noindex, nofollow',
};

export default function NotFound() {
	return (
		<div className="flex h-screen min-h-[900px] flex-col items-center justify-center px-10">
			<div className="max-w-7xl text-center">
				<h1 className="mb-7 text-balance">404 - Page Not Found</h1>
				<h2 className="text-balance">
					Sorry, looks like something is not right
				</h2>
				<p className="mt-10 text-balance">
					Oops, looks like the page you were looking for is not here anymore,
					check your URL again or continue browsing our site.
				</p>
				<div className="mt-20 flex justify-center">
					<SolidButton label="Go back home" href="/" />
				</div>
			</div>
		</div>
	);
}
