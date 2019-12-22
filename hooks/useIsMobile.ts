import { useLayoutEffect, useState } from 'react';

import theme from '../config/theme';

export default function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useLayoutEffect(() => {
		const tablet = window.matchMedia(`(min-width: ${theme.breakpoints.tablet})`);
		setIsMobile(!tablet.matches);
	}, []);

	return isMobile;
}
