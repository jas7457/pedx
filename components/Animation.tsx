import React from 'react';
import { useSpring, animated, SpringBaseProps } from 'react-spring';

import useIntersectionObserver from '../hooks/useIntersectionObserver';

import { Animation as IAnimation } from '../animations/composeAnimations';

export default function Animation(props: AnimationProps) {
	const { animation, children, className, usingIntersectionObserver = true, config } = props;

	const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
		intOptions: {
			threshold: 0.3
		}
	});

	const style = (() => {
		if (usingIntersectionObserver) {
			return useSpring({
				config,
				...(isIntersecting ? animation.to : animation.from)
			});
		}
		return useSpring({
			...animation,
			config
		});
	})();

	return (
		<animated.div ref={ref} className={className} style={style}>
			{children}
		</animated.div>
	);
}

interface AnimationProps {
	animation: IAnimation;
	children: React.ReactNode;
	className?: string;
	usingIntersectionObserver?: boolean;
	config?: SpringBaseProps['config'];
}
