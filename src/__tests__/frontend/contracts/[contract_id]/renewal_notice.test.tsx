{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import RenewalNotice from '@/pages/contracts/[contract_id]/renewal_notice';

// モックデータ
const mockData = {
  subscription_id: 1,
  contract_no: \"C-001\",
  customer_id: 1,
  product_code: \"P-001\",
  // ... other data
};

// ヘッダーコンポーネントのモック
jest.mock('@/components/Header', () => () => <div>ヘッダー</div>);

describe('契約更新案内作成画面', () => {
  beforeEach(() => {
    // fetch のモックを設定
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });
  });

  it('契約更新案内情報が正しく表示される', async () => {
    render(<RenewalNotice contract_id=\"1\" />); // contract_id を渡す

    // データの読み込みを待つ
    await screen.findByText(\"C-001\");

    // 契約情報が表示されていることを確認
    expect(screen.getByText(\"C-001\")).toBeInTheDocument();
    // ... other data assertions
    expect(screen.getByText(\"ヘッダー\")).toBeInTheDocument();
  });

  it('作成ボタンクリックで更新案内が作成される', async () => {
    render(<RenewalNotice contract_id=\"1\" />);
    await screen.findByText(\"C-001\");

    // 作成ボタンのクリックイベントをモック
    const createButton = screen.getByRole('button', { name: /作成/i });
    fireEvent.click(createButton);

    // 更新案内作成処理が呼び出されたことを確認
    // 実際にはAPI呼び出しなどが行われるため、その部分のモックが必要
  });
});"}