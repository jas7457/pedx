import React from 'react';
import styled from 'styled-components';

import theme from '../config/theme';

export default function Select(props: SelectProps) {
	const { options, value, onChange, label, disabled = false, className } = props;

	return (
		<>
			{label && (
				<label>
					<b>{label}</b>
				</label>
			)}
			<StyledSelect value={value} onChange={onChange} disabled={disabled} className={className}>
				{options.map(option => {
					return <option key={option}>{option}</option>;
				})}
			</StyledSelect>
		</>
	);
}

const StyledSelect = styled.select`
	border: 1px solid black;
	min-height: 30px;
	padding: ${theme.dimensions['2']};
	background-color: white;

	&[disabled] {
		color: ${theme.colors.gray.lighter};
		border-color: ${theme.colors.gray.lighter};
	}
`;

interface SelectProps {
	options: string[];
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	className?: string;
	label?: string;
	disabled?: boolean;
}
