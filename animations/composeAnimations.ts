export default function composeAnimations(animations: Animation[]): Animation {
	return animations.reduce(
		(memo, current) => {
			return {
				from: {
					...memo.from,
					...current.from
				},
				to: {
					...memo.to,
					...current.to
				}
			};
		},
		{ from: {}, to: {} }
	);
}

export interface Animation {
	from: object;
	to: object;
}
