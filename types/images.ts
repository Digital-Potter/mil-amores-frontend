export interface allImages {
	fullSize: string;
	othersizes: {
		tablet: string;
		mobile: string;
	};
	/** From CMS Media when available — prefer over filename-derived alt. */
	alt?: string;
	/** Intrinsic dimensions from CMS Media, for next/image width/height. */
	width?: number;
	height?: number;
}
