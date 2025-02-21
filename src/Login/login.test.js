import { render, screen, fireEvent } from '@testing-library/react';
import Login from './login';

test('Should display all fields', () => {
    // Render the Login component
    render(<Login />);

    // Get elements by their placeholders and role
    const userNameInput = screen.getByPlaceholderText('Enter your name');
    const userPasswordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Verify if all elements are present
    expect(screen.queryByText(/Login/)).toBeInTheDocument();
    expect(userNameInput).toBeInTheDocument();
    expect(userPasswordInput).toBeInTheDocument();
    expect(userNameInput).toHaveValue('');
    expect(userPasswordInput).toHaveValue('');
    expect(submitButton).toBeInTheDocument();

    // Check input attributes
    expect(userNameInput).toHaveAttribute('type', 'text');
    expect(userPasswordInput).toHaveAttribute('type', 'password');

    // Ensure no success or failure messages appear initially
    expect(screen.queryByText(/Login Successful!|Invalid Credentials!/)).not.toBeInTheDocument();
});

test('Should update the state when user types in the input fields', () => {
    render(<Login />);

    // Get input fields
    const userNameInput = screen.getByPlaceholderText('Enter your name');
    const userPasswordInput = screen.getByPlaceholderText('Enter your password');

    // Simulate typing in the input fields
    fireEvent.change(userNameInput, { target: { value: 'admin' } });
    expect(userNameInput).toHaveValue('admin');

    fireEvent.change(userPasswordInput, { target: { value: 'Admin@123' } });
    expect(userPasswordInput).toHaveValue('Admin@123');
});

test('Login Success and Failure Messages, and clear when user types again', async () => {
    render(<Login />);

    const userNameInput = screen.getByPlaceholderText('Enter your name');
    const userPasswordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // **Simulate valid credentials (successful login)**
    fireEvent.change(userNameInput, { target: { value: 'admin' } });
    fireEvent.change(userPasswordInput, { target: { value: 'Admin@123' } });
    fireEvent.click(submitButton);

    // Wait for success message to appear
    await screen.findByText('Login Successful!', {}, { timeout: 3000 });
    expect(screen.getByText('Login Successful!')).toBeInTheDocument();
    expect(userNameInput.value).toBe(''); // Input field should be cleared

    // **Simulate invalid credentials (failed login)**
    fireEvent.change(userNameInput, { target: { value: 'admin' } });
    fireEvent.change(userPasswordInput, { target: { value: 'Admin@1234' } });
    fireEvent.click(submitButton);

    // Wait for failure message to appear
    await screen.findByText('Invalid Credentials!', {}, { timeout: 3000 });
    expect(screen.getByText('Invalid Credentials!')).toBeInTheDocument();
    expect(userPasswordInput.value).toBe(''); // Password input should be cleared

    // **When the user starts typing again, the message should disappear**
    fireEvent.change(userNameInput, { target: { value: 'newuser' } });
    expect(screen.queryByText('Invalid Credentials!')).not.toBeInTheDocument();
});
