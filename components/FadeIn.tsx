import React from 'react';

import fadeIn from '../animations/fadeIn';

import Animation from './Animation';

export default function FadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<Animation className={className} animation={fadeIn}>
			{children}
		</Animation>
	);
}
