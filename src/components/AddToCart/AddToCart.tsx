import { Text, Button, Group } from '@mantine/core';
import { ShoppingCartIcon } from '@phosphor-icons/react';
import { Vegetable } from '../../types/vegetables';
import styles from './AddToCart.module.scss';
import { addToCart } from '../../store/cartSlice';
import { useAppDispatch } from '../../hooks/stateHooks';
import { useCallback } from 'react';

type AddToCartProps = {
	vegetable: Vegetable;
	count: number;
	onAdded?: () => void;
};

function AddToCart({ vegetable, count, onAdded }: AddToCartProps) {
	const dispatch = useAppDispatch();

	const handleAddToCart = useCallback(() => {
		dispatch(addToCart({ product: vegetable, count }));
		onAdded?.();
	}, [dispatch, vegetable, count, onAdded]);

	const icon = <ShoppingCartIcon size={20} color="#3B944E" />;

	return (
		<Group justify="space-between">
			<Text fw={600} size="xl">
				{vegetable.price} $
			</Text>
			<Button
				rightSection={icon}
				color="#E7FAEB"
				w={180}
				className={styles.button}
				onClick={handleAddToCart}
			>
				<Text c="#3B944E" fw={600}>
					Add to cart
				</Text>
			</Button>
		</Group>
	);
}

export default AddToCart;
