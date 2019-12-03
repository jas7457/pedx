import React from 'react';
import styled from 'styled-components';

import BackgroundImage, {BackgroundImageProps} from './BackgroundImage';

import theme from '../config/theme';

export default function ScaledBackgroundImage(props:BackgroundImageProps) {
	return <StyledScaledBackgroundImage {...props} />;
}

const StyledScaledBackgroundImage = styled(BackgroundImage)`
	transform: scale(1);
	will-change: transform;
	transition: transform ${theme.transitionTime};
	
	&:hover {
		transform: scale(${theme.scale.sm});
	}
`;
