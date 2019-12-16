import React from 'react';

import Drawer from './Drawer';

export default function Cart(props: CartProps) {
	const { isOpen, handleClose } = props;

	return (
		<Drawer isOpen={isOpen} onOverlayClick={() => handleClose()} type="secondary" side="right">
			Haven't implemented the cart yet!!!
		</Drawer>
	);
}

interface CartProps {
	isOpen: boolean;
	handleClose: () => void;
}
