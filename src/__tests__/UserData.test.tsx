import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserData from '@/components/UserData';
import { useAuth } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { PathEnum } from '@/lib/enums';

// Mock the hooks
jest.mock('@/lib/hooks', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('UserData', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('shows loading state initially', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      logout: jest.fn(),
    });
    mockLocalStorage.getItem.mockReturnValue(null);

    render(<UserData />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('redirects to login if no user in localStorage', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      logout: jest.fn(),
    });
    mockLocalStorage.getItem.mockReturnValue(null);

    render(<UserData />);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(PathEnum.Login);
    });
  });

  it('displays user data when user is authenticated', async () => {
    const mockLogout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      logout: mockLogout,
    });
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser));

    render(<UserData />);

    await waitFor(() => {
      expect(screen.getByText(`Welcome, ${mockUser.name}!`)).toBeInTheDocument();
    });
  });

  it('handles logout correctly', async () => {
    const mockLogout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      logout: mockLogout,
    });
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser));

    render(<UserData />);

    const logoutButton = await screen.findByRole('button', { name: /log out/i });
    await userEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });

  it('handles missing user data gracefully', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      logout: jest.fn(),
    });
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser));

    render(<UserData />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
}); 
