import { Card, Image, Text, Group } from '@mantine/core';
import AddVegetable from '../AddVegetable/AddVegetable';
import AddToCart from '../AddToCart/AddToCart';
import { Vegetable } from '../../types/vegetables';
import styles from './CardItem.module.scss';
import { useCounter } from '../../hooks/useCounter';

type CardItemProps = {
	vegetable: Vegetable;
};

function CardItem({ vegetable }: CardItemProps) {
	const { count, increment, decrement, reset } = useCounter(1, 1);

	const handleAddedToCart = () => {
		reset();
	};

	return (
		<Card padding="lg" radius={24} w={300} className={styles.card}>
			<Image src={vegetable.image} alt={vegetable.name} />

			<Group mt="md" mb="md" justify="space-between">
				<Text fw={600} size="md">
					{vegetable.name}
				</Text>
				{/* -------------- Добавление количества товара ------------- */}
				<AddVegetable
					value={count}
					onIncrement={increment}
					onDecrement={decrement}
				/>
			</Group>
			{/* ------------ Кнопка добавить в корзину ------------- */}
			<AddToCart
				vegetable={vegetable}
				count={count}
				onAdded={handleAddedToCart}
			/>
		</Card>
	);
}

export default CardItem;
