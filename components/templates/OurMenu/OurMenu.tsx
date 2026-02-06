import ContentWithImage from '@/components/ContentWithImage';
import OnlineMenu from '@/components/OnlineMenu';
import SpecialsCarousel from '@/components/SpecialsCarousel';
import { PageProps } from '@/types/pages';

import InternalPagesHero from '../../InternalPagesHero';

const OurMenu = (props: PageProps) => {
	const { featuredimg, title, subtitle, content } = props;

	return (
		<main>
			<InternalPagesHero
				title={title}
				subtitle={subtitle}
				anchorText="Start Your Order"
				anchorLink="#full-menu"
			/>

			{/** Page body content intro */}
			<ContentWithImage content={content} featuredimg={featuredimg} />

			{/** Full menu with tabs */}
			<OnlineMenu />

			{/** Specials slider for more */}
			<SpecialsCarousel />
		</main>
	);
};

export default OurMenu;
