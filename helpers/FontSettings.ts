import { Croissant_One, Poppins } from 'next/font/google';

export const primaryFont = Croissant_One({
	variable: '--primary-font',
	display: 'swap',
	weight: ['400'],
	subsets: ['latin'],
});

export const secondaryFont = Poppins({
	variable: '--secondary-font',
	display: 'swap',
	weight: ['300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});
