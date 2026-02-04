jest.mock('react-toastify/dist/ReactToastify.css', () => ({}));
jest.mock('./App.scss', () => ({}));

jest.mock('./hooks/useShouldShowBanner', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./components/Payment/CardCheckoutBanner.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid="card-checkout-banner">Card Checkout Banner</div>,
}));

jest.mock('./components/Layout/Footer.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer</div>,
}));

jest.mock('./AppyLayout.tsx', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="appy-layout">{children}</div>
  ),
}));

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useLocation: jest.fn(() => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
  })),
  Outlet: () => <div data-testid="outlet">Outlet Content</div>,
  MemoryRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ element }: { element: React.ReactNode }) => <div>{element}</div>,
}));

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import useShouldShowBanner from './hooks/useShouldShowBanner';

const mockUseShouldShowBanner = useShouldShowBanner as jest.MockedFunction<typeof useShouldShowBanner>;

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderApp = (shouldShowBanner = false) => {
    mockUseShouldShowBanner.mockReturnValue(shouldShowBanner);
    
    return render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('should render AppyLayout component', () => {
    renderApp();
    expect(screen.getByTestId('appy-layout')).toBeInTheDocument();
  });

  test('should render Outlet component', () => {
    renderApp();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  test('should render CardCheckoutBanner when shouldShowBanner is true', () => {
    renderApp(true);
    expect(screen.getByTestId('card-checkout-banner')).toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });

  test('should render Footer when shouldShowBanner is false', () => {
    renderApp(false);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.queryByTestId('card-checkout-banner')).not.toBeInTheDocument();
  });

  test('should call useShouldShowBanner hook', () => {
    renderApp();
    expect(mockUseShouldShowBanner).toHaveBeenCalledTimes(1);
  });
});