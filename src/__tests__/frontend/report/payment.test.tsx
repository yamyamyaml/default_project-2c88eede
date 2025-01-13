{"code": "import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// モック
jest.mock('axios');
jest.mock('next/navigation');

// コンポーネント
const Header = () => <div>ヘッダー</div>;
const SideMenu = () => <div>サイドメニュー</div>;
const PaymentReport = () => {
  const router = useRouter();

  const handleDownload = async () => {
    try {
      const response = await axios.get('/api/payment-report');
      // ダウンロード処理
      console.log('ダウンロード処理:', response.data);
      router.push('/download-complete');
    } catch (error) {
      console.error('エラー:', error);
      // エラー処理
    }
  };

  return (
    <div>
      <Header />
      <SideMenu />
      <button onClick={handleDownload}>ダウンロード</button>
    </div>
  );
};

describe('PaymentReport', () => {
  it('ダウンロードボタンクリックでAPI呼び出し、ダウンロード完了画面へ遷移', async () => {
    // モック設定
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (axios.get as jest.Mock).mockResolvedValue({ data: 'レポートデータ' });

    render(<PaymentReport />);n
    // ダウンロードボタンクリック
    fireEvent.click(screen.getByText('ダウンロード'));

    // API呼び出し確認
    expect(axios.get).toHaveBeenCalledWith('/api/payment-report');

    // ダウンロード完了画面へ遷移確認
    expect(mockRouter.push).toHaveBeenCalledWith('/download-complete');
  });

  it('HeaderとSideMenuが表示される', () => {
    render(<PaymentReport />);
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドメニュー')).toBeInTheDocument();
  });
});"}