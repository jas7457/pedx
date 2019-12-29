import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import theme from '../config/theme';

export default function Dialog(props: DialogProps) {
	const { header, children, footer, onCloseClick } = props;

	return (
		<StyledDialog className="flex flex-column h-full">
			<header className="flex flex-shrink-none">
				{header}
				{onCloseClick && (
					<button
						className="close-button ml-auto clickable"
						title="Close"
						aria-label="Close"
						onClick={onCloseClick}
					>
						<FontAwesomeIcon icon={faTimes} />
					</button>
				)}
			</header>

			<div className="middle flex-grow flex-shrink">{children}</div>

			{footer && <footer>{footer}</footer>}
		</StyledDialog>
	);
}

const StyledDialog = styled.div`
	& > * {
		padding: 1rem;
	}

	header {
		font-weight: 100;
		font-size: ${theme.text['3xl']};

		.close-button {
			font-size: ${theme.text.md};
		}
	}

	.middle {
		padding: 1rem;
		overflow-y: auto;
		border-top: 1px solid ${theme.colors.gray.lighter};
	}

	footer {
		border-top: 1px solid ${theme.colors.gray.lighter};
	}
`;

interface DialogProps {
	header: React.ReactNode;
	children: React.ReactNode;
	footer?: React.ReactNode;
	onCloseClick?: () => void;
}
