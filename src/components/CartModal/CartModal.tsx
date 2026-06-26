import {
	Text,
	Group,
	Stack,
	Divider,
	ActionIcon,
	Image,
	Flex,
	Box,
} from '@mantine/core';
import cartEmptyImage from '../../assets/cart_empty.svg';
import { updateCount } from '../../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import { useMemo } from 'react';

function CartModal() {
	const { cartItem } = useAppSelector((state) => state.cart);

	const totalPrice = useMemo(() => {
		return cartItem.reduce((sum, item) => sum + item.price * item.count, 0);
	}, [cartItem]);

	const dispatch = useAppDispatch();

	return (
		<Stack gap="md" p="md">
			{cartItem.length === 0 ? (
				<Flex direction="column" gap="sm" align="center">
					<Image src={cartEmptyImage} fit="contain" w={120} alt="" />
					<Text size="lg" c="gray" p={20}>
						Your cart is empty!
					</Text>
				</Flex>
			) : (
				<Stack gap="sm">
					{cartItem.map((item) => (
						<Group
							key={item.id}
							justify="space-between"
							align="center"
							wrap="nowrap"
						>
							<Image src={item.image} fit="contain" w={64} alt="" />
							<Box style={{ flex: 1 }}>
								<Text fw={600}>{item.name}</Text>
								<Text size="md" c="black" fw={600}>
									{item.price} $
								</Text>
							</Box>

							<Group gap={4}>
								<ActionIcon
									variant="light"
									color="gray"
									size="sm"
									onClick={() =>
										dispatch(
											updateCount({ id: item.id, newCount: item.count - 1 }),
										)
									}
								>
									-
								</ActionIcon>

								<Text fw={600} w={24} ta="center">
									{item.count}
								</Text>

								<ActionIcon
									variant="light"
									color="gray"
									size="sm"
									onClick={() =>
										dispatch(
											updateCount({ id: item.id, newCount: item.count + 1 }),
										)
									}
								>
									+
								</ActionIcon>
							</Group>
						</Group>
					))}
				</Stack>
			)}

			{cartItem.length > 0 && (
				<>
					<Divider />
					<Group justify="space-between" fw={700}>
						<Text size="md" fw={600}>
							Total
						</Text>
						<Text size="md" c="black" fw={600}>
							{totalPrice} $
						</Text>
					</Group>
				</>
			)}
		</Stack>
	);
}

export default CartModal;
