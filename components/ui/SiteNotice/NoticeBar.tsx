'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useSyncExternalStore } from 'react';

import { matchesNotice, NOTICE_STORAGE_KEY } from '@/helpers/notice/notice';

type NoticeBarProps = {
	html: string;
	hash: string;
	everywhere: boolean;
	homepage: boolean;
	itemPaths: string[];
};

const DISMISS_EVENT = 'mil-amores-notice-dismissed';
const HEIGHT_VAR = '--site-notice-h';
const dismissedInMemory = new Set<string>();

function readDismissed(hash: string): boolean {
	if (dismissedInMemory.has(hash)) return true;
	try {
		return window.sessionStorage.getItem(NOTICE_STORAGE_KEY) === hash;
	} catch {
		// Storage errors fail open: the bar shows.
		return false;
	}
}

function subscribe(onChange: () => void) {
	window.addEventListener(DISMISS_EVENT, onChange);
	return () => window.removeEventListener(DISMISS_EVENT, onChange);
}

function dismiss(hash: string) {
	dismissedInMemory.add(hash);
	try {
		window.sessionStorage.setItem(NOTICE_STORAGE_KEY, hash);
	} catch {
		// The in-memory set keeps it closed until the next full page load.
	}
	window.dispatchEvent(new Event(DISMISS_EVENT));
}

/**
 * Full-width bar in normal flow above the header. It publishes its own height
 * as `--site-notice-h` on <html> so the fixed mobile menu can sit under the
 * header while the bar is showing.
 */
const NoticeBar = (props: NoticeBarProps) => {
	const { html, hash, everywhere, homepage, itemPaths } = props;
	const pathname = usePathname() ?? '/';
	const dismissed = useSyncExternalStore(
		subscribe,
		() => readDismissed(hash),
		() => false,
	);
	const barRef = useRef<HTMLDivElement>(null);
	const visible =
		!dismissed && matchesNotice(pathname, { everywhere, homepage }, itemPaths);

	useEffect(() => {
		const root = document.documentElement;
		const bar = barRef.current;
		if (!visible || !bar) {
			root.style.removeProperty(HEIGHT_VAR);
			return;
		}
		const publish = () =>
			root.style.setProperty(HEIGHT_VAR, `${bar.offsetHeight}px`);
		publish();
		const observer =
			typeof ResizeObserver === 'undefined'
				? null
				: new ResizeObserver(publish);
		observer?.observe(bar);
		return () => {
			observer?.disconnect();
			root.style.removeProperty(HEIGHT_VAR);
		};
	}, [visible]);

	if (!visible) return null;

	return (
		<div
			ref={barRef}
			data-site-notice=""
			role="region"
			aria-label="Site notice"
			className="bg-dp-ma-red font-Poppins text-dp-softer-ma-cream relative z-30 py-3 pr-12 pl-5 text-center text-sm"
		>
			<div
				className="mx-auto max-w-5xl leading-snug [&_a]:underline [&_ol]:list-inside [&_ol]:list-decimal [&_p]:my-0 [&_ul]:list-inside [&_ul]:list-disc"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
			<button
				type="button"
				onClick={() => dismiss(hash)}
				aria-label="Close the notice"
				className="text-dp-softer-ma-cream focus-visible:outline-dp-softer-ma-cream absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-white/15 focus-visible:outline focus-visible:outline-2"
			>
				<svg
					viewBox="0 0 14 14"
					width="14"
					height="14"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					aria-hidden="true"
				>
					<path d="M2 2l10 10M12 2L2 12" />
				</svg>
			</button>
		</div>
	);
};

export default NoticeBar;
