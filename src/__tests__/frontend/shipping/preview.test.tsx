{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import ShippingPreview from '@/pages/shipping/preview';

// モックデータ
const shippingList = [
  { 発送ID: '1', 顧客ID: '123', 住所: '東京都...', 宛名: '山田太郎', 商品名: '商品A', 号数: '1号' },
  { 発送ID: '2', 顧客ID: '456', 住所: '大阪府...', 宛名: '佐藤花子', 商品名: '商品B', 号数: '2号' },
];

// ヘッダーコンポーネント（モック）
const Header = () => <div>ヘッダー</div>;

// フッターコンポーネント（モック）
const Footer = () => <div>フッター</div>;

describe('ShippingPreview コンポーネントのテスト', () => {
  beforeEach(() => {
    // fetch のモック設定
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(shippingList),
      })
    );

    render(
      <div>
        <Header />
        <ShippingPreview />
        <Footer />
      </div>
    );
  });

  it('発送リストが正しく表示されること', async () => {
    // 発送ID, 顧客ID, 住所, 宛名, 商品名, 号数 が表示されていることを確認
    shippingList.forEach((item) => {
      expect(screen.getByText(item.発送ID)).toBeInTheDocument();
      expect(screen.getByText(item.顧客ID)).toBeInTheDocument();
      expect(screen.getByText(item.住所)).toBeInTheDocument();
      expect(screen.getByText(item.宛名)).toBeInTheDocument();
      expect(screen.getByText(item.商品名)).toBeInTheDocument();
      expect(screen.getByText(item.号数)).toBeInTheDocument();
    });
  });

  it('発送リスト出力ボタンがクリックされた時、遷移処理が実行されること', async () => {
    // Router のモック
    const mockRouter = {
      push: jest.fn(),
    };
    jest.mock('next/navigation', () => ({
      useRouter: () => mockRouter,
    }));

    // 出力ボタンをクリック
    fireEvent.click(screen.getByText('発送リスト出力'));

    // 遷移先を確認
    expect(mockRouter.push).toHaveBeenCalledWith('/shipping/complete'); // 仮の遷移先
  });

  it('戻るボタンがクリックされた時、遷移処理が実行されること', async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    jest.mock('next/navigation', () => ({
      useRouter: () => mockRouter,
    }));

    fireEvent.click(screen.getByText('戻る'));
    expect(mockRouter.push).toHaveBeenCalledWith('/shipping/create'); // 仮の遷移先
  });

  it('データ取得エラー発生時、エラーメッセージが表示されること', async () => {
    global.fetch = jest.fn(() => Promise.reject('エラー'));
    render(
      <div>
        <Header />
        <ShippingPreview />
        <Footer />
      </div>
    );
    // エラーメッセージが表示されることを確認
    expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument();
  });
});"}