{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import ReportsOutput from '@/pages/reports/output';

describe('ReportsOutput Component', () => {
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    render(<ReportsOutput onSubmit={mockHandleSubmit} />);  // onSubmit prop
  });

  it('renders Header component', () => {
    // Header component is expected to be rendered within ReportsOutput
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('レポート選択メニューが存在する', () => {
    expect(screen.getByRole('combobox', { name: /レポート種別/i })).toBeInTheDocument();
  });

  it('出力条件設定フォームが存在する', () => {
    expect(screen.getByRole('textbox', { name: /開始日/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /終了日/i })).toBeInTheDocument();
    // Add more input fields as needed based on your actual form
  });

  it('出力ボタンが存在し、クリックできる', () => {
    const submitButton = screen.getByRole('button', { name: /出力/i });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  describe('レポート選択メニューの変更', () => {
    it('契約者一覧を選択できる', () => {
      const select = screen.getByRole('combobox', { name: /レポート種別/i });
      fireEvent.change(select, { target: { value: '契約者一覧' } });
      expect(select.value).toBe('契約者一覧');
    });

    // 他のレポート種別についても同様のテストを追加
  });

  // 出力条件設定フォームへの入力とバリデーションのテスト
  describe('出力条件設定フォームのバリデーション', () => {
    it('開始日と終了日の入力とバリデーション', () => {
      const startDateInput = screen.getByRole('textbox', { name: /開始日/i });
      const endDateInput = screen.getByRole('textbox', { name: /終了日/i });

      fireEvent.change(startDateInput, { target: { value: '2024-07-20' } });
      fireEvent.change(endDateInput, { target: { value: '2024-07-25' } });

      expect(startDateInput.value).toBe('2024-07-20');
      expect(endDateInput.value).toBe('2024-07-25');

      // ここにバリデーションのテストを追加 (例: 終了日が開始日より前だとエラー)
    });

    // 他の入力フィールドについても同様のテストを追加
  });
});
"}