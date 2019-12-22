import { PRODUCT_BY_HANDLE_productByHandle_variants_edges } from '../generated/PRODUCT_BY_HANDLE';

export interface ProductState {
	variantGroups: Record<
		string,
		{
			name: string;
			values: Array<{ value: string; variant: PRODUCT_BY_HANDLE_productByHandle_variants_edges }>;
		}
	>;
	variantsByUniqueImages: Array<{
		image: string;
		variants: PRODUCT_BY_HANDLE_productByHandle_variants_edges[];
	}>;
	currentQuantity: number;
	selection: Record<string, string>;
	adding: boolean;
	pending: boolean;
}

export type ProductStateReducerAction =
	| { type: 'SELECT_VARIANT'; selection: ProductState['selection'] }
	| { type: 'SET_ADDING'; adding: boolean }
	| { type: 'SET_PENDING'; pending: boolean }
	| { type: 'SET_CURRENT_QUANTITY'; quantity: number };

export function ProductStateReducer(state: ProductState, action: ProductStateReducerAction): ProductState {
	switch (action.type) {
		case 'SELECT_VARIANT': {
			return {
				...state,
				selection: action.selection
			};
		}
		case 'SET_ADDING': {
			return {
				...state,
				adding: action.adding
			};
		}
		case 'SET_PENDING': {
			return {
				...state,
				pending: action.pending
			};
		}
		case 'SET_CURRENT_QUANTITY': {
			return {
				...state,
				currentQuantity: action.quantity
			};
		}
	}

	return state;
}
