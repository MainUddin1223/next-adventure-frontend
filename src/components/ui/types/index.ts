export interface IPublicAgencyData {
	id: number;
	name: string;
	profileImg: string;
	rating: string;
	ongoingPlans: number;
	location?: true;
}

export type IAgencyProps = {
	agency: IPublicAgencyData;
};

export type IItemsInfo = {
	label: string;
	link: string;
};
export type IBreadCrumbProps = {
	items: IItemsInfo[];
};

export type IButtonProps = {
	handler: () => void;
	value: string;
	disabled?: boolean;
};

export type ICardListProps = {
	children: React.ReactNode;
	title: string;
	description: string;
};

export type ImageUploadProps = {
	name: string;
};

export type IDataNotFoundProps = {
	title?: string;
	searchValue?: string;
};

export type ImageUploadrProps = {
	name: string;
	defaultUrl: string;
};

export type IPaginationProps = {
	setSize: (value: number) => void;
	setPage: (value: number) => void;
	totalPage: number;
};

export type ICheckoutProps = {
	setStep: (arg: number) => void;
};

export type IConfirmationProps = {
	setStep: (arg: number) => void;
	handleConfirmation: () => void;
};

export type IRatingProps = {
	name: string;
	desc: string[];
};

export type IRegisterFormValues = {
	first_name: string;
	last_name: string;
	role: 'user' | 'agency';
	email: string;
	password: string;
	contact_no: string;
	about_user: string;
	profile_img: string;
};

export interface DataType {
	key: string;
	name: string;
	age: number;
	address: string;
	tags: string[];
}
export type ITableProps = {
	loading?: boolean;
	columns: any;
	dataSource: any;
	pageSize?: number;
	totalPages?: number;
	showSizeChanger?: boolean;
	showPagination?: boolean;
	onPaginationChange: (page: number, pageSize: number) => void;
	onTableChange: (pagination: any, filter: any, sorter: any) => void;
	expandable?: any;
};

export interface MobileDataType {
	key: number;
	name: string;
	age: number;
	address: string;
	description: string;
}

export type IStepsProps = {
	step: number;
};

export interface INavProps {
	role: string;
	isUser: boolean;
	logout: () => void;
	profile_img: string | null;
}

export interface IPublicPlanData {
	id: number;
	planName: string;
	images: string[];
	price: number;
	destination: string;
	departureFrom: string;
	deadline: Date;
	agency: {
		id: number;
		name: string;
		rating: number;
		profileImg: string;
	};
}

export interface IFeaturedTourDataProps {
	tours: IPublicPlanData[];
}
export interface IPlanProps {
	plan: IPublicPlanData;
	agencyProfile?: boolean;
}
