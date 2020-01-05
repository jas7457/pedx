import React, { useState } from 'react';
import styled from 'styled-components';
import ConstrainedWidth from './ConstrainedWidth';
import theme from '../config/theme';
import ThemeButton from './ThemeButton';

export default function Footer() {
	return (
		<footer className="flex-shrink-none">
			<Newsletter />
		</footer>
	);
}

function Newsletter() {
	const [email, setEmail] = useState('');

	return (
		<StyledNewsletter>
			<ConstrainedWidth>
				<form
					className="text-center"
					onSubmit={e => {
						e.preventDefault();
						alert('Not yet implemented');
					}}
				>
					<div className="subscribe uppercase">Join Our Newsletter</div>
					<div>Subscribe to our newsletter and be the first to hear about new items, deals, and more!</div>

					<input
						className="w-full block text-center"
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder="Enter your email address"
					/>

					<ThemeButton className="w-full uppercase" inverse>
						Subscribe
					</ThemeButton>
				</form>
			</ConstrainedWidth>
		</StyledNewsletter>
	);
}

const StyledNewsletter = styled.section`
	background: ${theme.colors.gray.darkest};
	color: white;
	padding: ${theme.dimensions['6']} 0;

	form {
		max-width: 800px;
		margin: 0 auto;
	}

	input {
		color: ${theme.colors.text};
		&::placeholder {
			color: ${theme.colors.gray.medium};
		}
		margin: ${theme.dimensions['2']} 0;
		height: 40px;
		padding: 0 ${theme.dimensions['2']};
	}

	.subscribe {
		font-size: ${theme.text['4xl']};
		letter-spacing: 4px;
		font-weight: 100;
		margin-bottom: ${theme.dimensions['2']};
	}
`;
