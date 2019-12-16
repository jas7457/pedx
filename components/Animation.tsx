import React from 'react';
import { useSpring, animated } from 'react-spring';

import useIntersectionObserver from '../hooks/useIntersectionObserver';

import {Animation as IAnimation} from '../animations/composeAnimations';

export default function Animation(props: AnimationProps) {
	const {animation, children, className} = props;

	const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
		intOptions: {
			threshold: 0.3
		}
	});

	return (
		<animated.div ref={ref} className={className} style={useSpring(isIntersecting ? animation.to : animation.from)}>
			{children}
		</animated.div>
	);
}

interface AnimationProps {
	animation:IAnimation;
	children: React.ReactNode;
	className?: string;
}
