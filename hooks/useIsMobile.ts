import { useEffect, useState } from 'react';

import theme from '../config/theme';

export default function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const tablet = window.matchMedia(`(min-width: ${theme.breakpoints.tablet})`);
		setIsMobile(!tablet.matches);
	}, []);

	return isMobile;
}
