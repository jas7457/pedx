import { useEffect, useState } from 'react';

import theme from '../config/theme';

export default function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		function testMedia(mq: MediaQueryListEvent | MediaQueryList) {
			setIsMobile(!mq.matches);
		}

		const mq = window.matchMedia(`(min-width: ${theme.breakpoints.tablet})`);
		testMedia(mq);

		mq.addListener(testMedia);
		return () => mq.removeListener(testMedia);
	}, []);

	return isMobile;
}
