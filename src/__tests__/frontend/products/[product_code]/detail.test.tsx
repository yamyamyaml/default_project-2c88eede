{"code": "import { render, screen, act } from '@testing-library/react';
import ProductDetail from '@/pages/products/[product_code]/detail';

// モックデータ
const productData = {
  id: \"SCR-095\",
  category: \"商品管理\",
  screenName: \"商品詳細画面\",
  description: \"商品の詳細情報を表示する画面。\",
  \"Screen components\": \"商品詳細情報表示（商品コード、商品名、商品詳細、単価、税率など）、編集ボタン、一覧へ戻るボタン\",
  operatingProcedure: \"商品詳細情報を確認し、編集ボタンで商品編集画面へ遷移、一覧へ戻るボタンで商品一覧画面へ遷移\",
  user: \"定期購読管理システムの管理者\",
  accessRight: \"loged-in user\",
  fileName: \"products/[product_code]/detail.tsx\",
  getData: [{\"table\":\"products\", \"items\":[\"product_code\", \"product_name\", \"product_description\", \"unit_price\",\"tax_rate\"]}],
  postData: null,
  commonComponent: [\"Layout.tsx\"],
  relatedBackendHandles: []
};

describe('商品詳細画面', () => {
  beforeEach(() => {
    // fetch モックの設定
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(productData),
      ok: true
    });
  });

  it('商品詳細情報が正しく表示されること', async () => {
    render(<ProductDetail />); // Layout.tsx を使用

    // ロード状態の表示を待つ
    expect(screen.getByRole('heading', { name: 'Loading...' })).toBeInTheDocument();

    // データが読み込まれるまで待つ
    await act(() => Promise.resolve());

    // 各項目が表示されていることを確認
    expect(screen.getByText(`商品コード: ${productData.id}`)).toBeInTheDocument();
    expect(screen.getByText(`カテゴリー: ${productData.category}`)).toBeInTheDocument();
    expect(screen.getByText(`画面名: ${productData.screenName}`)).toBeInTheDocument();
    // ... その他の項目についても同様のテストを追加
  });

  // 編集ボタンのテスト
  it('編集ボタンをクリックすると、商品編集画面に遷移すること', async () => {
    render(<ProductDetail />); 
    await act(() => Promise.resolve());

    // 編集ボタンをクリック
    await act(async() => {
      screen.getByRole('button', { name: '編集' }).click(); // 編集ボタンが存在すると仮定
    });
    // 遷移先の確認 (モックの動作確認)
    expect(mockNextRouter.push).toHaveBeenCalledWith(`/products/${productData.id}/edit`);
  });

  // 一覧へ戻るボタンのテスト
    it('一覧へ戻るボタンをクリックすると、商品一覧画面に遷移すること', async () => {
    render(<ProductDetail />);
    await act(() => Promise.resolve());

    // 一覧へ戻るボタンをクリック
    await act(async() => {
      screen.getByRole('button', { name: '一覧へ戻る' }).click(); // 一覧へ戻るボタンが存在すると仮定
    });
    // 遷移先の確認
    expect(mockNextRouter.push).toHaveBeenCalledWith('/products');
  });

  // fetch エラー時のテスト
  it('データ取得に失敗した場合、エラーメッセージが表示されること', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Fetch error'));

    render(<ProductDetail />);
    await act(() => Promise.resolve());

    // エラーメッセージが表示されていることを確認
    expect(screen.getByText('エラーが発生しました。')).toBeInTheDocument();// エラーメッセージは適切に設定してください。
  });
});
"}