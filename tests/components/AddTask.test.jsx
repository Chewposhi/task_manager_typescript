import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTask from '../../src/components/AddTask';
import React from 'react';

describe('Form', () => {
    it('renders form elements correctly', () => {
        render(<AddTask />);
        
        // Assert the presence of form elements
        expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    });

    it('allows user to input values', () => {
        render(<AddTask />);
        
        // Simulate user input
        userEvent.type(screen.getByLabelText(/Title:/i), 'Example Title');
       
        // Assert that the input values are reflected in the form
        expect(screen.getByLabelText(/Title:/i)).toHaveValue('Example Title');
    });


    it('submits form with correct values and stores task in local storage', async () => {
        render(<AddTask />);

        // Simulate user input
        userEvent.type(screen.getByLabelText(/Title:/i), 'Example Title');

        // Simulate form submission
        userEvent.click(screen.getByRole('button', { name: /Submit/i }));

        // Add assertions for form submission behavior
        // For example, you might assert that the form submission triggers a specific function
        // or that it causes a certain UI change.

        // Check if the task is stored in local storage
        const storedTasksString = localStorage.getItem('tasks');
        expect(storedTasksString).toBeTruthy();
        const storedTasks = JSON.parse(storedTasksString || '');
        // You can also assert the content of the stored task if needed
        // Extract the first task from the array
        const firstStoredTask = storedTasks[0];
        console.log(firstStoredTask);

        // Assert that the first stored task contains the specified values
        expect(firstStoredTask.title).toBe('Example Title');
        });
});
