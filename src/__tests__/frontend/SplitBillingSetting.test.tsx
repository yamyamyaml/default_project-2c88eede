{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import SplitBillingSetting from '@/pages/SplitBillingSetting';
import { jest } from '@jest/globals';

// ヘッダーコンポーネントのモック
jest.mock('@/components/common/Header', () => () => <div>Header Mock</div>);

// サイドバーコンポーネントのモック
jest.mock('@/components/common/Sidebar', () => () => <div>Sidebar Mock</div>);

describe('分割請求設定画面', () => {
  test('ヘッダーとサイドバーが表示されること', () => {
    render(<SplitBillingSetting />);
    expect(screen.getByText('Header Mock')).toBeInTheDocument();
    expect(screen.getByText('Sidebar Mock')).toBeInTheDocument();
  });

  test('契約IDに基づいてデータが取得されること', async () => {
    // モックデータ
    const mockData = {
      subscription_id: '123',
      contract_no: 'ABC-456',
      start_issue_no: '001',
      end_issue_no: '012',
      total_issues: 12,
    };

    // fetch のモック
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
        ok: true,
      })
    ) as jest.Mock;

    render(<SplitBillingSetting />);

    // データが画面に表示されることを確認
    expect(await screen.findByText('契約番号: ABC-456')).toBeInTheDocument();
  });

  test('分割請求設定と請求スケジュール設定ができること', async () => {
    render(<SplitBillingSetting />);

    // フォーム要素の取得
    // 例: 分割回数入力フィールド
    const splitCountInput = screen.getByRole('textbox', { name: /分割回数/i });

    // 値の入力
    fireEvent.change(splitCountInput, { target: { value: '3' } });

    // 設定ボタンのクリック
    // 例: 設定ボタン
    const setButton = screen.getByRole('button', { name: /設定/i });
    fireEvent.click(setButton);

    // 設定後の状態を確認
    // 例: 分割回数が3回になっていることを確認
    // expect(...).toBe(...);
  });

  test('エラーハンドリングが正しく行われること', async () => {
    // fetch のエラーモック
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API エラー'))
    ) as jest.Mock;

    render(<SplitBillingSetting />);

    // エラーメッセージが表示されることを確認
    expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument();
  });
});
"}