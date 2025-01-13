{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import BillingBulkApproval from '@/pages/BillingBulkApproval';
import { useRouter } from 'next/navigation';
import axios from 'axios';

jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockRouter = { push: jest.fn() , back: jest.fn() } as any

describe('BillingBulkApproval Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<BillingBulkApproval/>);
    expect(screen.getByRole('heading', { name: /請求書一括承認/i})).toBeInTheDocument();
  });

  it('handles approval successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 200, data: { message: 'success' } });
    render(<BillingBulkApproval/>);
    await fireEvent.click(screen.getByRole('button', { name: /承認/i }));
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/billing/bulk_approve', []);
    expect(mockRouter.push).toHaveBeenCalledWith('/請求書送付記録');
  });

  it('handles approval failure', async () => {
    mockedAxios.post.mockRejectedValueOnce({ response: { status: 500, data: { message: 'error' } } });
    render(<BillingBulkApproval/>);
    await fireEvent.click(screen.getByRole('button', { name: /承認/i }));
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/billing/bulk_approve', []);
    expect(screen.getByText('エラーが発生しました。')).toBeVisible();
  });

  it('handles cancel button click', async () => {
    render(<BillingBulkApproval/>);
    await fireEvent.click(screen.getByRole('button', { name: /キャンセル/i }));
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it('renders Header and Sidebar components', () => {
    render(<BillingBulkApproval/>);
    // Header.tsx
    expect(screen.getByRole('banner')).toBeVisible();
    // Sidebar.tsx
    expect(screen.getByRole('navigation')).toBeVisible();
  });
});
"}