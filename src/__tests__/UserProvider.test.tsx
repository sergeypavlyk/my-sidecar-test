import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react';
import { useUser, UserProvider } from '@/providers/UserProvider';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
});

function TestComponent() {
  const { user, login } = useUser();

  return (
    <div>
      <p>{user ? user.name : 'No user'}</p>
      <button onClick={() => login({ id: '1', name: 'John Doe', email: 'john@example.com' })}>
        Login
      </button>
    </div>
  );
}

test('UserProvider updates user state on login', async () => {
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
