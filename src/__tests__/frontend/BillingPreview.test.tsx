{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import BillingPreview from '@/pages/BillingPreview';
import { jest } from '@jest/globals';

// モック
jest.mock('next/navigation', () => {
  const useRouter = jest.fn(() => ({
    push: jest.fn(),
  }));
  return { useRouter };
});

jest.mock('@/components/Header', () => () => <div>Header Mock</div>);
jest.mock('@/components/Sidebar', () => () => <div>Sidebar Mock</div>);

describe('BillingPreview', () => {
  it('請求書プレビューが表示される', async () => {
    render(<BillingPreview />);
    expect(screen.getByText('Header Mock')).toBeInTheDocument();
    expect(screen.getByText('Sidebar Mock')).toBeInTheDocument();
    // PDF表示領域の確認
    expect(screen.getByRole('document')).toBeInTheDocument();
  });

  it('一括承認ボタンが存在する', async () => {
    render(<BillingPreview />);
    expect(screen.getByRole('button', { name: '一括承認' })).toBeInTheDocument();
  });

  it('一括承認ボタンクリックでアラートが表示される', async () => {
    render(<BillingPreview />);
    window.alert = jest.fn();
    fireEvent.click(screen.getByRole('button', { name: '一括承認' }));
    expect(window.alert).toHaveBeenCalledWith('請求書を一括承認しました。');
  });

  // getData のテスト
  it('必要なデータを取得できる', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ([
        { billing_id: '1', customer_id: '1', billing_code: '001', billing_name: '請求先1' },
        { pricing_id: '1', subscription_id: '1', set_price: '1000', set_quantity: '1', total_amount: '1000' },
      ]),
    } as any) // anyで型を回避
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ([
          { product_code: '001', product_name: '商品1', unit_price: '1000' },
        ]),
      } as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ([
          { subscription_id: '1', customer_id: '1', contract_no: '12345', product_code: '001' },
        ]),
      } as any);

    render(<BillingPreview />);

    // データ取得後の状態を確認
    // 例: 取得したデータが画面に表示されているかなどを確認
  });
});"}