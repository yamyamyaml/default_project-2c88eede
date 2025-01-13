{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import Send from '@/pages/billing/send';

// ヘッダーコンポーネントのモック
jest.mock('@/components/Header', () => () => <div>Header</div>);
// サイドメニューコンポーネントのモック
jest.mock('@/components/SideMenu', () => () => <div>SideMenu</div>);

// Axios のモック設定
const mockedAxios = axios as jest.Mocked<typeof axios>;

// モックデータ
billingData = [{
    billing_id: 1,
    subscription_id: 101,
    billing_date: \"2024-07-20\",
    billing_amount: 1000,
    payment_status: \"未払い\",
    sent_date: null
  },
  {
    billing_id: 2,
    subscription_id: 102,
    billing_date: \"2024-07-20\",
    billing_amount: 2000,
    payment_status: \"未払い\",
    sent_date: null
  }
];

describe('請求書送付記録更新画面', () => {
  beforeEach(() => {
    // Axios の get メソッドをモック
    mockedAxios.get.mockResolvedValue({ data: billingData });
    render(<Send />);    
  });

  it('請求書一覧が表示されること', async () => {
    // 請求書IDが表示されていることを確認
    expect(await screen.findByText(\"1\")).toBeInTheDocument();
    expect(await screen.findByText(\"2\")).toBeInTheDocument();
  });

  it('送付記録が更新できること', async () => {
    // 送付記録更新ボタンをクリック
    mockedAxios.post.mockResolvedValue({ status: 200 });
    fireEvent.click(await screen.findAllByRole('button', { name: /送付記録更新/ })[0]);
    // 更新完了メッセージが表示されていることを確認
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  it('キャンセルボタンで前の画面に戻ること', async () => {
    const mockRouterPush = jest.fn();
    global.mockNextRouter = { push: mockRouterPush } as any;

    fireEvent.click(await screen.findByRole('button', { name: /キャンセル/ }));

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith('/billing');
  });
});"}