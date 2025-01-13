{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { jest } from '@jest/globals';
import History from '@/pages/billing/payment/history';
import Header from '@/components/common/Header';
import SideMenu from '@/components/common/SideMenu';

jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

describe('入金履歴管理画面', () => {
  beforeEach(() => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: [],
      status: 200,
      statusText: 'OK',
    });
  });

  test('契約ID入力と履歴表示', async () => {
    render(
      <History />
    );

    const contractIdInput = screen.getByLabelText('契約ID');
    fireEvent.change(contractIdInput, { target: { value: 'TEST-001' } });

    // モックデータ
    const mockHistoryData = [
      { paymentDate: '2024-07-29', amount: 10000 },
      { paymentDate: '2024-08-29', amount: 10000 },
    ];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockHistoryData,
      status: 200,
      statusText: 'OK',
    });

    const searchButton = screen.getByRole('button', { name: '検索' });
    fireEvent.click(searchButton);

    await screen.findByText('入金履歴');

    mockHistoryData.forEach((item) => {
      screen.getByText(item.paymentDate);
      screen.getByText(String(item.amount));
    });
  });

  test('ヘッダーとサイドメニューが表示される', () => {
    render(
      <History />
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('データ取得エラー時の表示', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error('エラーが発生しました'));

    render(
      <History />
    );

    const contractIdInput = screen.getByLabelText('契約ID');
    fireEvent.change(contractIdInput, { target: { value: 'TEST-001' } });

    const searchButton = screen.getByRole('button', { name: '検索' });
    fireEvent.click(searchButton);

    expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument();
  });
});
"}