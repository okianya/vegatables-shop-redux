export type Vegetable = {
	id: number;
	name: string;
	price: number;
	image: string;
	category: string;
};

export type CartItem = Vegetable & {
	count: number;
};
