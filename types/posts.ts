// TS
export interface PostsProps {
	error?: string;
	loading?: boolean;
	msg: string;
	blogpost: PostProps;
	blogposts: PostProps[];
}

export interface PostProps {
	_id: string;
	isLive: boolean;
	title: string;
	link: string;
	postintro: string;
	content: string;
	seotitle: string;
	category: CategoryProps[];
	featuredimg: string;
	othersizes: {
		tablet: '';
		mobile: '';
	};
	fullname: string;
	photo: string;
	updatedAt: string;
	createdAt: string;
}

export interface CategoryProps {
	_id: string;
	cattitle: string;
	link: string;
}
