{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import PaymentApproval from '@/pages/PaymentApproval';
import { jest } from '@jest/globals';

// モック
const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

jest.mock('axios');

describe('消込承認画面', () => {
  it('コンポーネントが正しくレンダリングされる', () => {
    render(<PaymentApproval />);  
    expect(screen.getByRole('button', { name: /消込承認/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /キャンセル/i })).toBeInTheDocument();
  });

  it('消込承認ボタンがクリックされた際に適切な処理が実行される', async () => {
    render(<PaymentApproval />);

    fireEvent.click(screen.getByRole('button', { name: /消込承認/i }));

    // postData の値を確認
    expect(axios.post).toHaveBeenCalledWith('/api/paymentConfirmation', {
      table: 'subscriptions',
      items: ['subscription_id', 'confirmed_payment_date'],
    });

    // 画面遷移の確認
    expect(mockRouter.push).toHaveBeenCalledWith('/billing/paymentHistory');
  });

  it('キャンセルボタンがクリックされた際に適切な処理が実行される', async () => {
    render(<PaymentApproval />);

    fireEvent.click(screen.getByRole('button', { name: /キャンセル/i }));

    // 画面遷移の確認
    expect(mockRouter.push).toHaveBeenCalledWith('/billing/unpaidList');
  });

  describe('Header コンポーネント', () => {
    it('Header コンポーネントが表示される', () => {
      render(<PaymentApproval />);
      // Header コンポーネントの内容を検証
      // 例: 特定のテキストが存在することを確認
      // expect(screen.getByText('ヘッダーテキスト')).toBeVisible();
    });
  });

  describe('Sidebar コンポーネント', () => {
    it('Sidebar コンポーネントが表示される', () => {
      render(<PaymentApproval />);
      // Sidebar コンポーネントの内容を検証
      // 例: 特定のリンクが存在することを確認
      // expect(screen.getByRole('link', { name: '請求管理' })).toBeVisible();
    });
  });
});"}