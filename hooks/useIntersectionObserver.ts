import { useEffect, useState, useRef, RefObject } from 'react';

export default function useIntersectionObserver<T extends HTMLElement>(
	options: {
		intersectionOptions?: IntersectionObserverInit;
		disconnectOnIntersect?: boolean;
	} = {}
) {
	const { intersectionOptions, disconnectOnIntersect = true } = options;

	const [isIntersecting, setIsIntersecting] = useState(false);
	const ref: RefObject<T> = useRef<T>(null);

	useEffect(() => {
		if (!window || !window.IntersectionObserver) {
			setIsIntersecting(true);
			return;
		}

		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				setIsIntersecting(entry.isIntersecting);

				if (entry.isIntersecting && disconnectOnIntersect) {
					observer.disconnect();
				}
			});
		}, intersectionOptions);

		observer.observe(ref.current as HTMLElement);

		return () => observer.disconnect();
	}, []);

	return { ref, isIntersecting };
}
