/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import ky from 'ky';
import { vi } from 'vitest';

vi.mock('ky');

const vegetablesMock = [
	{
		id: 1,
		name: 'Carrot',
		price: 4,
		image: 'https://example.com/carrot.png',
		category: 'Vegetable',
	},
	{
		id: 2,
		name: 'Tomato',
		price: 6,
		image: 'https://example.com/tomato.png',
		category: 'Vegetable',
	},
];

const renderApp = async () => {
	const jsonMock = vi.fn().mockResolvedValue(vegetablesMock);
	vi.mocked(ky).get.mockReturnValue({ json: jsonMock } as any);

	render(<App />);
	await screen.findByText('Catalog');
};

const addToCartFirstProduct = async (count = 2) => {
	const incrementBtn = screen.getAllByLabelText('Increment value')[0];
	for (let i = 1; i < count; i++) {
		await userEvent.click(incrementBtn);
	}

	const addButton = screen.getAllByRole('button', { name: /Add to cart/i })[0];
	await userEvent.click(addButton);
};

const openCart = async () => {
	const cartButton = screen.getByText(/^Cart$/i).closest('button');
	await userEvent.click(cartButton as HTMLElement);
	return await screen.findByRole('dialog');
};

describe('App', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.spyOn(console, 'error').mockImplementation(() => undefined);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('Загружает список продуктов', async () => {
		await renderApp();
		expect(screen.getByText('Carrot')).toBeInTheDocument();
		expect(screen.getByText('Tomato')).toBeInTheDocument();
	});

	it('Добавляет товар в корзину и показывает бейдж с количеством товаров', async () => {
		await renderApp();
		await addToCartFirstProduct(2);

		const cartButton = screen.getByText(/^Cart$/i).closest('button');
		expect(cartButton).toHaveTextContent('2');
	});

	it('Обновляет количество в корзине и показывает пустую корзину', async () => {
		await renderApp();
		await addToCartFirstProduct(2);

		const modal = await openCart();

		expect(within(modal).getByText('Carrot')).toBeInTheDocument();
		expect(within(modal).getAllByText(/^\d+$/)).not.toHaveLength(0);

		const decrementBtn = within(modal).getByRole('button', { name: '-' });
		await userEvent.click(decrementBtn);

		expect(within(modal).getByText('Carrot')).toBeInTheDocument();
	});

	it('Показывает сообщение об ошибке, если список продуктов не загружается', async () => {
		const jsonMock = vi.fn().mockRejectedValue(new Error('Network error'));
		vi.mocked(ky).get.mockReturnValue({ json: jsonMock } as any);

		render(<App />);

		expect(
			await screen.findByText('Не удалось загрузить товары'),
		).toBeInTheDocument();
	});
});
