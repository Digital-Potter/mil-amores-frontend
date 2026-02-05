import { SVGProps } from 'react';

const Decorations = (props: SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 158 156" {...props}>
		<defs>
			<clipPath id="a">
				<path fill="none" d="M0 0h150.576v152.286H0z" data-name="Rectangle 5" />
			</clipPath>
		</defs>
		<g data-name="Group 8">
			<g
				clipPath="url(#a)"
				data-name="Group 5"
				transform="rotate(-92 77.854 75.362)"
			>
				<path
					fill="#3e6528"
					d="M6.42 23.4A14.135 14.135 0 0 1 20.556 9.261l130.02 11.177a14.343 14.343 0 0 0-1.285-.061L14.135 0A14.135 14.135 0 0 0 0 14.135l10.3 132.784a14.088 14.088 0 0 0 1.058 5.367Z"
					data-name="Path 52"
				/>
				<path
					fill="#e86814"
					d="M17.292 34.639c0-7.241 5.248-13.111 11.722-13.111l106.527 2.4a10.526 10.526 0 0 0-1.065-.056L23.69 12.938c-6.474 0-11.722 5.87-11.722 13.111l5.054 112.344a14.415 14.415 0 0 0 .877 4.978Z"
					data-name="Path 53"
				/>
			</g>
		</g>
	</svg>
);
export default Decorations;
