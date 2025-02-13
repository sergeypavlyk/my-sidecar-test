import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { useEffect, useState } from 'react';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

function TestComponent() {
  return <div data-testid="test-child">Hello Theme</div>;
}

describe('ThemeProvider', () => {
  it('renders children after mounting', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(await screen.findByTestId('test-child')).toBeInTheDocument();
  });

  it('does not render children until mounted', async () => {
    const TestThemeProvider = () => {
      const [mounted, setMounted] = useState(false);
      useEffect(() => {
        setTimeout(() => setMounted(true), 0);
      }, []);

      return mounted ? <div data-testid="mounted">Mounted</div> : null;
    };

    render(<TestThemeProvider />);

    expect(screen.queryByTestId('mounted')).toBeNull();
    await screen.findByTestId('mounted');
  });
});
