import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';
import classNames from 'classnames';

import AspectRatio from './AspectRatio';
import Animation from './Animation';
import ScaledBackgroundImage from './ScaledBackgroundImage';

import useBreakpoint from '../hooks/useBreakpoint';
import useWindowSize from '../hooks/useWindowSize';
import theme from '../config/theme';
import composeAnimations from '../animations/composeAnimations';
import fadeIn from '../animations/fadeIn';
import transformLeft from '../animations/transformLeft';

const SliderAnimation = composeAnimations([fadeIn, transformLeft]);

export default function Slider(props: SliderProps) {
	const { items, className, includeIndex = false, config = defaultConfig } = props;
	const [currentIndex, setCurrentIndex] = useState(0);
	const breakpoint = useBreakpoint();
	const [sliderRef, setSliderRef] = useState<HTMLUListElement | null>(null);

	// make sure things get recalculated when the window size changes
	useWindowSize();

	const currentConfig = config![breakpoint];
	const { widthPercent, onScreen, showButtons = true } = currentConfig;

	// if there are more than one page
	const hasPages = onScreen < items.length;

	// figure out how to translate the ul
	const translateX = (() => {
		if (!sliderRef) {
			return 0;
		}
		const remainder = 100 - onScreen * widthPercent;
		const outerWidth = sliderRef.clientWidth;
		const additionalPercent = remainder ? remainder / 2 : 0;
		const totalPercent = -1 * currentIndex * widthPercent * outerWidth + additionalPercent * outerWidth;
		return totalPercent / 100;
	})();

	const springStyles = useSpring({
		transform: `translateX(${translateX}px)`
	});

	// for the case where you go from mobile at index 1 to tablet, you need to reset the index so everything is on screen
	useEffect(() => {
		if (currentIndex + onScreen > items.length) {
			setCurrentIndex(Math.max(items.length - onScreen, 0));
		}
	}, [currentIndex, onScreen, items]);

	return (
		<StyledSlider className={classNames(className, 'uppercase text-center overflow-hidden w-full')}>
			<div className="relative">
				{hasPages && showButtons && (
					<button
						disabled={currentIndex === 0}
						aria-label="Last Item"
						onClick={() => {
							setCurrentIndex(Math.max(currentIndex - onScreen, 0));
						}}
					>
						<FontAwesomeIcon icon={faChevronLeft} />
					</button>
				)}

				<Animation animation={SliderAnimation}>
					<div className="list-container overflow-hidden">
						<animated.ul
							className="flex relative w-full list-reset"
							ref={setSliderRef}
							style={springStyles}
						>
							{items.map((item, index) => {
								return (
									<li
										className="flex-shrink-none relative"
										style={{ width: `${widthPercent}%` }}
										key={item.id}
									>
										<Link href={item.href} as={item.as}>
											<a
												className="block"
												title={item.title}
												tabIndex={
													index >= currentIndex && index < currentIndex + onScreen
														? undefined
														: -1
												}
											>
												<AspectRatio ratio={1} className="slider-aspect-ratio overflow-hidden">
													<ScaledBackgroundImage image={item.image} />
												</AspectRatio>
												<div className="truncate">{item.title}</div>
												{item.subtitle && <div className="item-subtitle">{item.subtitle}</div>}
											</a>
										</Link>

										{includeIndex && (
											<div className="item-index absolute top-0">{pad(index + 1)}</div>
										)}
									</li>
								);
							})}
						</animated.ul>
					</div>
				</Animation>

				{hasPages && showButtons && (
					<button
						disabled={currentIndex + onScreen >= items.length}
						aria-label="Next Item"
						onClick={() => {
							setCurrentIndex(Math.min(currentIndex + onScreen, items.length - 1));
						}}
					>
						<FontAwesomeIcon icon={faChevronRight} />
					</button>
				)}
			</div>
		</StyledSlider>
	);
}

function pad(num: number) {
	if (num < 10) {
		return `0${num}`;
	}
	return `${num}`;
}

const defaultConfig: SliderProps['config'] = {
	mobile: {
		widthPercent: 75,
		onScreen: 1,
		showButtons: true
	},
	tablet: {
		widthPercent: 50,
		onScreen: 2,
		showButtons: true
	},
	desktop: {
		widthPercent: 25,
		onScreen: 4,
		showButtons: true
	}
};

interface SliderProps {
	items: Array<{
		id: string;
		title: string;
		subtitle?: string;
		href: string;
		as: string;
		image: string;
	}>;
	config?: {
		mobile: BreakpointConfig;
		tablet: BreakpointConfig;
		desktop: BreakpointConfig;
	};
	includeIndex?: boolean;
	className?: string;
}

interface BreakpointConfig {
	widthPercent: number;
	onScreen: number;
	showButtons?: boolean;
}

const StyledSlider = styled.div`
	user-select: none;
	font-size: ${theme.text.sm};

	.list-container {
		width: 95%;
		margin: 0 auto;
	}

	ul {
		& > li {
			padding: 0 5px;
		}
	}

	.item-index {
		clip-path: polygon(0 0, 0% 100%, 100% 0);
		background: rgba(255, 255, 255, 0.5);
		height: 40px;
		width: 40px;
		text-align: left;
		padding: 5px;
		line-height: 1;
		font-weight: 100;
		font-size: 12px;
	}

	.item-subtitle {
		font-weight: 100;
		color: ${theme.colors.gray.medium};
	}

	button {
		position: absolute;
		z-index: 1;
		top: 50%;
		padding: 1rem;
		height: 50px;
		width: 50px;
		border-radius: 50%;
		background: white;
		border: 1px solid ${theme.colors.gray.lighter};
		color: ${theme.colors.text};
		font-size: ${theme.text.xs};
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
		transform: translateY(-50%);

		&:hover,
		&:focus {
			border-color: ${theme.colors.gray.darker};
		}
		&:disabled {
			color: ${theme.colors.gray.lightest};
			border-color: currentColor;
		}

		&:nth-of-type(1) {
			left: 0.2rem;
		}
		&:nth-of-type(2) {
			right: 0.2rem;
		}
	}

	.slider-aspect-ratio {
		max-height: 300px;
	}
`;
