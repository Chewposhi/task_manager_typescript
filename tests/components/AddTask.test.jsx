import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTask from '../../src/components/AddTask';
import React from 'react';

describe('Form', () => {
    it('renders form elements correctly', () => {
        render(<AddTask />);
        
        // Assert the presence of form elements
        expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Due Date:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Priority:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    });

    it('allows user to input values', () => {
        render(<AddTask />);
        
        // Simulate user input
        userEvent.type(screen.getByLabelText(/Title:/i), 'Example Title');
        userEvent.type(screen.getByLabelText(/Description:/i), 'Example Description');

        // Assert that the input values are reflected in the form
        expect(screen.getByLabelText(/Title:/i)).toHaveValue('Example Title');
        expect(screen.getByLabelText(/Description:/i)).toHaveValue('Example Description');
    });

    it('allows user to select priority', async () => {
        render(<AddTask />);

        // Simulate user selecting priority
        const prioritySelect = screen.getByRole('combobox', { name: /Priority:/i });
        userEvent.click(prioritySelect);

        // Assert that the dropdown options are present
        const priorityOptions = screen.getAllByRole('option');
        expect(priorityOptions.length).toBe(4); // Including the "Select Priority" option
        expect(priorityOptions[0]).toHaveTextContent('Select Priority');
        expect(priorityOptions[1]).toHaveTextContent('High');
        expect(priorityOptions[2]).toHaveTextContent('Medium');
        expect(priorityOptions[3]).toHaveTextContent('Low');
    });

    it('allows user to input due date', async () => {
        render(<AddTask />);

        // Simulate user inputting due date
        const dueDateInput = screen.getByLabelText(/Due Date:/i);
        userEvent.type(dueDateInput, '2024-04-10'); // Example due date

        // Assert that the inputted due date is reflected in the form
        expect(dueDateInput).toHaveValue('2024-04-10');
    });

    it('submits form with correct values and stores task in local storage', async () => {
        render(<AddTask />);

        // Simulate user input
        userEvent.type(screen.getByLabelText(/Title:/i), 'Example Title');
        userEvent.type(screen.getByLabelText(/Description:/i), 'Example Description');

        // Simulate user selecting priority and inputting due date
        userEvent.selectOptions(screen.getByLabelText(/Priority:/i), 'High');
        userEvent.type(screen.getByLabelText(/Due Date:/i), '2024-04-10'); // Example due date

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
        expect(firstStoredTask.description).toBe('Example Description');
        expect(firstStoredTask.priority).toBe('High');
        expect(firstStoredTask.dueDate).toBe('2024-04-10');
        });
});
