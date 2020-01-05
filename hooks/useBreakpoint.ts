import { useEffect, useState } from 'react';

import theme from '../config/theme';

export default function useBreakpoint() {
	const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

	useEffect(() => {
		const tabletMq = window.matchMedia(`(min-width: ${theme.breakpoints.tablet})`);
		const desktopMq = window.matchMedia(`(min-width: ${theme.breakpoints.desktop})`);

		function testMedia() {
			if (desktopMq.matches) {
				setBreakpoint('desktop');
			} else if (tabletMq.matches) {
				setBreakpoint('tablet');
			} else {
				setBreakpoint('mobile');
			}
		}

		testMedia();

		tabletMq.addListener(testMedia);
		desktopMq.addListener(testMedia);
		return () => {
			tabletMq.removeListener(testMedia);
			desktopMq.removeListener(testMedia);
		};
	}, []);

	return breakpoint;
}
