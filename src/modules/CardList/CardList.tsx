import { SimpleGrid, Title, Loader, Alert } from '@mantine/core';
import CardItem from '../../components/CardItem/CardItem';
import { useEffect } from 'react';
import { fetchVegetables } from '../../store/vegetablesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';

function CardList() {
	const { item, loading, error } = useAppSelector((state) => state.vegetables);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchVegetables());
	}, [dispatch]);

	if (loading) {
		return (
			<div
				style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}
			>
				<Loader size="xl" color="green" />
			</div>
		);
	}

	if (error) {
		return (
			<Alert
				title="Ошибка"
				color="red"
				variant="filled"
				style={{ margin: '2rem 0' }}
			>
				Не удалось загрузить товары
			</Alert>
		);
	}

	return (
		<>
			<Title order={2} mb="xl">
				Catalog
			</Title>

			<SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
				{item.map((vegetable) => (
					<CardItem key={vegetable.id} vegetable={vegetable} />
				))}
			</SimpleGrid>
		</>
	);
}

export default CardList;
