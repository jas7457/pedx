import React from 'react';
import styled from 'styled-components';

import theme from '../config/theme';

export default function Select(props: SelectProps) {
	const { options, value, onChange, label } = props;

	return (
		<>
			{label && (
				<label>
					<b>{label}</b>
				</label>
			)}
			<StyledSelect value={value} onChange={onChange}>
				{options.map(option => {
					return <option key={option}>{option}</option>;
				})}
			</StyledSelect>
		</>
	);
}

const StyledSelect = styled.select`
	width: 100%;
	border: 1px solid ${theme.colors.gray_500};
	min-height: 30px;
	padding: ${theme.dimensions['2']};
	background-color: white;
`;

interface SelectProps {
	options: string[];
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	label?: string;
}
