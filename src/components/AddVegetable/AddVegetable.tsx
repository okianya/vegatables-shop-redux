import { PlusIcon, MinusIcon } from '@phosphor-icons/react';
import { ActionIcon, Box, Group } from '@mantine/core';

type AddVegetableProps = {
	value: number;
	onIncrement: () => void;
	onDecrement: () => void;
	onAdded?: () => void;
};

function AddVegetable({ value, onIncrement, onDecrement }: AddVegetableProps) {
	return (
		<Group gap={0}>
			<ActionIcon
				variant="filled"
				color="#DEE2E6"
				size="md"
				onClick={onDecrement}
				aria-label="Decrement value"
			>
				<MinusIcon color="black" />
			</ActionIcon>
			<ActionIcon.GroupSection
				variant="transparent"
				color="black"
				size="md"
				p={0}
			>
				<Box w={32} ta="center">
					{value}
				</Box>
			</ActionIcon.GroupSection>
			<ActionIcon
				variant="filled"
				color="#DEE2E6"
				size="md"
				onClick={onIncrement}
				aria-label="Increment value"
			>
				<PlusIcon color="black" />
			</ActionIcon>
		</Group>
	);
}

export default AddVegetable;
