import React from 'react';
import styled from 'styled-components';

import theme from '../config/theme';

function Heading(props: HeadingProps) {
	const { size, as: Tag, children, className } = props;

	return <Tag className={className}>{children}</Tag>;
}

export default styled(Heading)<{ size: HeadingProps['size'] }>`
	font-size: ${props => {
		return {
			small: theme.dimensions['6'],
			medium: theme.dimensions['8'],
			large: theme.dimensions['10']
		}[props.size] as string;
	}}};
`;

interface HeadingProps {
	size: 'small' | 'medium' | 'large';
	as: 'h1' | 'h2' | 'h3' | 'h4';
	children: React.ReactNode;
	className?: string;
}
