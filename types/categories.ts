// TS
export interface CategoriesProps {
	error?: string;
	loading?: boolean;
	msg: string;
	category: CategoryProps;
	categories: CategoryProps[];
}

export interface CategoryProps {
	_id: string;
	isLive: boolean;
	isMenu: boolean;
	isSubmenu: boolean;
	isUnder: string;
	cattitle: string;
	link: string;
	postintro: string;
	catdescription: string;
	seotitle: string;
	items: PostsByCat[];
	featuredimg: string;
	othersizes: {
		tablet: '';
		mobile: '';
	};
	position: number;
	fullname: string;
	photo: string;
	updatedAt: string;
	createdAt: string;
}

export interface PostsByCat {
	label: string;
	value: string;
}
