import React from 'react';
import styled from 'styled-components';

import theme from '../config/theme';

function Heading(props: HeadingProps) {
	const { as: Tag, children, className } = props;

	return <Tag className={className}>{children}</Tag>;
}

export default styled(Heading)<{ size: HeadingProps['size']; fontWeight?: number }>`
	font-size: ${props => {
		return {
			normal: theme.text.md,
			small: theme.dimensions['6'],
			medium: theme.dimensions['8'],
			large: theme.dimensions['10']
		}[props.size] as string;
	}}};
	font-weight: ${props => {
		return props.fontWeight === undefined ? 400 : props.fontWeight;
	}};
`;

interface HeadingProps {
	size: 'normal' | 'small' | 'medium' | 'large';
	as: 'h1' | 'h2' | 'h3' | 'h4';
	children: React.ReactNode;
	fontWeight?: number;
	className?: string;
}
