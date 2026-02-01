import Image from 'next/image';

import OutlinedButton from '@/components/ui/OutlinedButton';
import SolidButton from '@/components/ui/SolidButton';

export default function Home() {
	return (
		<div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
			<main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
				<h1 className="text-center">Ready for Digital Potter</h1>
				<div className="flex w-full flex-col items-center gap-4 sm:items-center sm:justify-center md:flex-row">
					<OutlinedButton label="Button One" href="/" />
					<SolidButton label="Button Two" href="/" />
				</div>
			</main>
			<footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://digitalpotter.io"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/globe.svg"
						alt="Globe icon"
						width={16}
						height={16}
					/>
					Digital Potter, LLC →
				</a>
			</footer>
		</div>
	);
}
