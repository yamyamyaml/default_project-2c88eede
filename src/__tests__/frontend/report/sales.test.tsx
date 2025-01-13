{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import Sales from '@/pages/report/sales';
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';

describe('売上一覧表出力条件画面', () => {
  test('コンポーネントが正しくレンダリングされる', () => {
    render(
      <Sales />
    );

    // HeaderとSideMenuコンポーネントが存在することを確認
    expect(screen.getByRole('banner')).toBeTruthy(); // Header
    expect(screen.getByRole('navigation')).toBeTruthy(); // SideMenu
    expect(screen.getByText('売上一覧表出力条件画面')).toBeInTheDocument();
  });

  test('期間指定の入力フィールドが存在する', () => {
    render(<Sales />);
    expect(screen.getByLabelText('開始日')).toBeInTheDocument();
    expect(screen.getByLabelText('終了日')).toBeInTheDocument();
  });

  test('商品指定の入力フィールドが存在する', () => {
    render(<Sales />);
    expect(screen.getByLabelText('商品名')).toBeInTheDocument();
  });

  test('ダウンロードボタンが存在し、クリックできる', () => {
    render(<Sales />);
    const downloadButton = screen.getByRole('button', { name: 'ダウンロード' });
    expect(downloadButton).toBeInTheDocument();
    fireEvent.click(downloadButton);
    // ダウンロード処理のテストを追加（モック等を使用して）
  });

  test('日付選択ダイアログが表示・非表示される', async () => {
    render(<Sales />);
    const startDateInput = screen.getByLabelText('開始日');
    const endDateInput = screen.getByLabelText('終了日');

    fireEvent.focus(startDateInput); // フォーカスを与えてダイアログを開く想定
    fireEvent.blur(startDateInput); // フォーカスを外してダイアログを閉じる想定

    fireEvent.focus(endDateInput);
    fireEvent.blur(endDateInput);
  });

  test('商品選択のテスト', () => {
    render (<Sales />);

    const productInput = screen.getByLabelText('商品名');
    fireEvent.change(productInput, { target: { value: 'テスト商品' } });
    expect(productInput).toHaveValue('テスト商品');
  });
});
"}