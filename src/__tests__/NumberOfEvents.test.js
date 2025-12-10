// src/__tests__/NumberOfEvents.test.js
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    
    test('contains a numeric input (spinbutton)', () => {
        render(<NumberOfEvents />);
        const input = screen.getByRole('spinbutton');
        expect(input).toBeInTheDocument();
    });

    test('default value of textbox is 32', () => {
        render(<NumberOfEvents />);
        const input = screen.getByRole('spinbutton');
        expect(input.value).toBe('32');
    });

    test('textbox value changes when user types', async () => {
        render(<NumberOfEvents />);
        const input = screen.getByRole('spinbutton');
        const user = userEvent.setup();

        // Clear the default value and type '10'
        await user.clear(input);
        await user.type(input, '10');

        expect(input.value).toBe('10');
    });
});
