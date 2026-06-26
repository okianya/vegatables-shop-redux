import { Text, Button, Modal, Badge } from '@mantine/core';
import { ShoppingCartIcon } from '@phosphor-icons/react';
import { useDisclosure } from '@mantine/hooks';
import CartModal from '../CartModal/CartModal';
import { useAppSelector } from '../../hooks/stateHooks';
import { useMemo } from 'react';

function CartButton() {
	const icon = <ShoppingCartIcon size={20} color="white" />;
	const [opened, { open, close }] = useDisclosure(false);

	const { cartItem } = useAppSelector((state) => state.cart);
	const totalCart = useMemo(() => {
		return cartItem.reduce((sum, item) => sum + item.count, 0);
	}, [cartItem]);

	return (
		<>
			<Button
				justify="center"
				rightSection={icon}
				color="#54B46A"
				w={140}
				onClick={open}
			>
				{totalCart > 0 && (
					<Badge size="auto" circle c={'dark'} color="white" m={10} fz={'sm'}>
						{totalCart}
					</Badge>
				)}
				<Text c="white" fw={600}>
					Cart
				</Text>
			</Button>
			{/* ---------- Модалка корзины ---------- */}
			<Modal
				size="auto"
				opened={opened}
				onClose={close}
				withCloseButton={false}
				overlayProps={{
					backgroundOpacity: 0,
					blur: 0,
				}}
				styles={{
					inner: {
						justifyContent: 'flex-end',
						padding: '70px 30px 0 0',
					},
				}}
			>
				<CartModal />
			</Modal>
		</>
	);
}

export default CartButton;
