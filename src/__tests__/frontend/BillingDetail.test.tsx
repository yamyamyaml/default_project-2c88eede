{"code": "import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BillingDetail from '@/pages/BillingDetail';
import { jest } from '@jest/globals';

// モックデータ
const billingData = {
  billing_id: \"1\",
  customer_id: \"1\",
  billing_code: \"001\",
  billing_name: \"テスト請求\",
  // ... other billing data
};

const pricingData = {
  pricing_id: \"1\",
  subscription_id: \"1\",
  set_price: 1000,
  // ... other pricing data
};

const productData = {
  product_code: \"001\",
  product_name: \"テスト商品\",
  // ... other product data
};

const subscriptionData = {
  subscription_id: \"1\",
  customer_id: \"1\",
  // ... other subscription data
};

// fetchのモック
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        billing_addresses: [billingData],
        pricing: [pricingData],
        products: [productData],
        subscriptions: [subscriptionData],
      }),
    ok: true,
  })
) as jest.Mock;

describe('請求詳細画面', () => {
  test('請求詳細情報が表示される', async () => {
    render(<BillingDetail />);

    // 非同期処理が完了するまで待機
    await waitFor(() => {
      expect(screen.getByText('請求詳細')).toBeInTheDocument();
      expect(screen.getByText(billingData.billing_code)).toBeInTheDocument();
      expect(screen.getByText(productData.product_name)).toBeInTheDocument();
      expect(screen.getByText(`￥${pricingData.set_price}`)).toBeInTheDocument(); // 価格
    });
  });

  // エラーハンドリングのテスト
test('データ取得エラー時の処理', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('APIエラー'))) as jest.Mock;

    render(<BillingDetail />);

    // エラーメッセージが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('エラーが発生しました')).toBeInTheDocument();
    });
  });
});
"}