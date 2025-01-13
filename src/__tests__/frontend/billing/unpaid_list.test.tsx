{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 未入金一覧表示画面 from '@/pages/billing/unpaid_list';

describe('未入金一覧表示画面', () => {
  test('ヘッダーコンポーネントが表示されること', () => {
    render(<未入金一覧表示画面 />);
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
  });

  test('検索フォームが表示されること', () => {
    render(<未入金一覧表示画面 />);
    expect(screen.getByRole('textbox', { name: /顧客名/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /契約ID/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /検索/i })).toBeInTheDocument();
  });

  test('未入金一覧リストが表示されること', () => {
    render(<未入金一覧表示画面 />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('検索ボタン押下で検索処理が実行されること', async () => {
    const mockFetch = jest.fn().mockResolvedValueOnce({
      json: async () => ({
        data: [],
      }),
      ok: true,
      status: 200,
    });
    global.fetch = mockFetch as jest.Mock;

    render(<未入金一覧表示画面 />);

    fireEvent.click(screen.getByRole('button', { name: /検索/i }));

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});"}