import React, { useRef } from 'react';
import clamp from 'lodash/clamp';
import { useSprings, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import styled from 'styled-components';
import { FullGestureState, Coordinates } from 'react-use-gesture/dist/types';

export default function Slider(props: SliderProps) {
	const { children, htmlRef, onCancel, onDrag } = props;
	const index = useRef(0);
	const offset = htmlRef.offsetWidth * 0.6;
	const fix = htmlRef.offsetWidth * 0.2;

	const [springProps, set] = useSprings(children.length, i => {
		return { x: i * offset + fix, scale: 1, display: 'block' };
	});

	const bind = useDrag(dragValues => {
		const {
			down,
			movement: [mx],
			direction: [xDir],
			cancel
		} = dragValues;

		if (onDrag) {
			onDrag(dragValues);
		}

		if (down && Math.abs(mx) > window.innerWidth / 4) {
			cancel && cancel();
			onCancel && onCancel();
			index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, children.length - 1);
		}

		// @ts-ignore
		set((i: number) => {
			if (i < index.current - 1 || i > index.current + 1) {
				return { display: 'none' };
			}

			const x = (i - index.current) * offset + (down ? mx : 0) + fix;
			const scale = down ? Math.max(1 - Math.abs(mx) / offset, 0.8) : 1;
			return { x, scale, display: 'block' };
		});
	});

	return (
		<StyledSlider className="flex relative w-full">
			{springProps.map(({ x, display, scale }, i) => (
				<animated.div
					{...bind()}
					className="level-1 absolute h-full"
					key={i}
					style={{ display, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}
				>
					<animated.div
						className="level-2 h-full w-full"
						style={{
							transform: scale.interpolate(s => `scale(${s})`),
							backgroundImage: `url(${children[i].image})`
						}}
					>
						{children[i].children}
					</animated.div>
				</animated.div>
			))}
		</StyledSlider>
	);
}

interface SliderProps {
	children: Array<{ image: string; children?: React.ReactNode }>;
	htmlRef: HTMLElement;
	onCancel?: () => void;
	onDrag?: (dragValues: FullGestureState<Coordinates>) => void;
}

const StyledSlider = styled.div`
	user-select: none;
	height: 500px;
	max-height: 60vw;

	.level-1 {
		width: 60%;
		will-change: transform;
		padding: 0 1rem;
	}

	.level-2 {
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		will-change: transform;
		box-shadow: 0 31px 125px -25px rgba(50, 50, 73, 0.5), 0 18px 75px -37.5px rgba(0, 0, 0, 0.6);
	}
`;
