import { useState, useEffect } from 'react';
import throttle from 'lodash/throttle';

export default function useWindowSize() {
	const isClient = typeof window === 'object';

	function getSize() {
		return {
			width: isClient ? window.innerWidth : undefined,
			height: isClient ? window.innerHeight : undefined
		};
	}

	const [windowSize, setWindowSize] = useState(getSize);

	useEffect(() => {
		if (!isClient) {
			return;
		}

		const handleResize = throttle(() => {
			setWindowSize(getSize());
		}, 33);

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isClient]);

	return windowSize;
}
