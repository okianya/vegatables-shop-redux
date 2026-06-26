import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import React from 'react';

export const customRender = (ui: React.ReactElement) => {
	return render(<MantineProvider>{ui}</MantineProvider>);
};

export * from '@testing-library/react';
export { customRender as render };
