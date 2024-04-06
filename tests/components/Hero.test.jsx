import { render, screen } from '@testing-library/react';
import Hero from '../../src/components/Hero';
import React from 'react';

describe('Hero', () => {
    it('renders hero text correctly', () => {
        render(<Hero />);
        const heroTextElement = screen.getByText(/Task Management Dashboard/i);
        expect(heroTextElement).toBeInTheDocument();
    });
})