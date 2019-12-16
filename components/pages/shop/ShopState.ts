import { ProductSortKeys } from '../../../generated/globalTypes';

export default interface ShopState {
	sort: {
		title: string;
		sortKey: ProductSortKeys;
		reverse: boolean;
	};
	filtersOpen:boolean;
	filters: Array<{
		title: string;
		handle: string;
		choices: Array<{
			title: string;
			selected: boolean;
		}>;
	}>;
}

export type ShopStateReducerAction =
	| { type: 'INIT'; state: ShopState }
	| { type: 'TOGGLE_SELECTED'; filterTitle: string; choiceTitle: string }
	| { type: 'CLEAR_FILTER'; filterTitle: string }
	| { type: 'SET_SORT'; title: string; sortKey: ProductSortKeys; reverse: boolean }
	| { type: 'TOGGLE_FILTERS' };

export const SORTS = [
	{
		title: 'Newest',
		sortKey: ProductSortKeys.CREATED_AT,
		reverse: true
	},
	{
		title: 'Popular',
		sortKey: ProductSortKeys.BEST_SELLING,
		reverse: true
	},
	{
		title: 'Price: High-Low',
		sortKey: ProductSortKeys.PRICE,
		reverse: true
	},
	{
		title: 'Price: Low-High',
		sortKey: ProductSortKeys.PRICE,
		reverse: false
	},
	{
		title: 'Type',
		sortKey: ProductSortKeys.PRODUCT_TYPE,
		reverse: false
	}
] as const;
