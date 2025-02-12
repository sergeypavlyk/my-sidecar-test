import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react';
import { useAuth } from '@/hooks';
import { UserProvider } from './UserProvider';

function TestComponent() {
  const { user, login } = useAuth();

  return (
    <div>
      <p>{user ? user.name : 'No user'}</p>
      <button onClick={() => login({ id: '1', name: 'John Doe', email: 'john@example.com' })}>
        Login
      </button>
    </div>
  );
}

test('UserProvider changes state', () => {
  render(
    <UserProvider>
      <TestComponent />
    </UserProvider>,
  );

  expect(screen.getByText('No user')).toBeInTheDocument();

  act(() => {
    screen.getByText('Login').click();
  });

  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
