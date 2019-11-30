import React from 'react';
import styled from 'styled-components';

export default function ContrainedWidth({ children }: { children: JSX.Element }) {
	return <StyledConstrainedWidth>{children}</StyledConstrainedWidth>;
}

const StyledConstrainedWidth = styled.div`
	width: 95%;
	max-width: 1280px;
	margin: 0 auto;
`;
