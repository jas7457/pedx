import React, { useReducer } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import ShopFilter from './ShopFilter';
import ShopList from './ShopList';
import ConstrainedWidth from '../../ConstrainedWidth';
import Drawer from '../../Drawer';

import ShopState, { ShopStateReducerAction } from './ShopState';
import theme from '../../../config/theme';
import useIsMobile from '../../../hooks/useIsMobile';
import Dialog from '../../Dialog';

export default function Shop() {
	const [state, dispatch] = useReducer(StateReducer, null);
	const isMobile = useIsMobile();

	const query = (() => {
		if (!state) {
			return '';
		}

		const queryStrs = state.filters
			.map(filter => {
				const oneSelected = filter.choices.some(choice => choice.selected);
				if (oneSelected) {
					return filter.choices
						.filter(choice => choice.selected)
						.map(choice => `${filter.handle}:"${choice.title}"`)
						.join(' OR ');
				}
				return undefined;
			})
			.filter(str => str);

		return queryStrs.join(' AND ');
	})();

	const filter = <ShopFilter state={state} dispatch={dispatch} />;

	return (
		<ConstrainedWidth size="large">
			<StyledShop>
				<div className={classNames('left flex-shrink-none', { 'is-open': state?.filtersOpen })}>
					{isMobile ? (
						<Drawer
							isOpen={!!state?.filtersOpen}
							onOverlayClick={() => dispatch({ type: 'TOGGLE_FILTERS' })}
							className="overlay-children"
						>
							<Dialog header="Shop Filters" onCloseClick={() => dispatch({ type: 'TOGGLE_FILTERS' })}>
								{filter}
							</Dialog>
						</Drawer>
					) : (
						<>{filter}</>
					)}
				</div>
				<div className="right flex-grow flex-shrink overflow-hidden">
					<ShopList query={query} sort={state?.sort} dispatch={dispatch} />
				</div>
			</StyledShop>
		</ConstrainedWidth>
	);
}

function StateReducer(state: ShopState | null, action: ShopStateReducerAction): ShopState | null {
	switch (action.type) {
		case 'INIT': {
			return action.state;
		}
		case 'TOGGLE_SELECTED': {
			const { filterTitle, choiceTitle } = action;

			return {
				...state!,
				filters: state!.filters.map(filter => {
					if (filter.title === filterTitle) {
						return {
							...filter,
							choices: filter.choices.map(choice => {
								if (choice.title === choiceTitle) {
									return {
										...choice,
										selected: !choice.selected
									};
								}
								return choice;
							})
						};
					}
					return filter;
				})
			};
		}
		case 'CLEAR_FILTER': {
			const { filterTitle } = action;
			return {
				...state!,
				filters: state!.filters.map(filter => {
					if (filter.title === filterTitle) {
						return {
							...filter,
							choices: filter.choices.map(choice => {
								return {
									...choice,
									selected: false
								};
							})
						};
					}
					return filter;
				})
			};
		}
		case 'SET_SORT': {
			const { sortKey, reverse, title } = action;
			return {
				...state!,
				sort: { title, sortKey, reverse }
			};
		}
		case 'TOGGLE_FILTERS': {
			return {
				...state!,
				filtersOpen: !state?.filtersOpen
			};
		}
	}
	return state;
}

const StyledShop = styled.div`
	padding-top: ${theme.dimensions['2']};

	.left {
		width: 0;
		overflow: hidden;
		max-width: 30%;

		&.is-open {
			margin-right: ${theme.dimensions['4']};
			width: 100%;
		}
	}

	@media (min-width: ${theme.breakpoints.tablet}) {
		display: flex;

		.left {
			opacity: 1;

			will-change: width;
			transition: width ${theme.transitionTime} ease;

			&.is-open {
				width: 250px;
			}
		}
	}
`;
