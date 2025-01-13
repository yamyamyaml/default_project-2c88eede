{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// モック
jest.mock('axios');
jest.mock('next/navigation');

// コンポーネント
const Header = () => <header>ヘッダー</header>;
const SideMenu = () => <nav>サイドメニュー</nav>;
const CustomerEditForm = ({ customerData }) => {
  const router = useRouter();
  const handleSubmit = jest.fn();

  return (
    <form onSubmit={handleSubmit}>
      <input type=\"text\" name=\"name\" defaultValue={customerData.name} />
      <button type=\"submit\">更新</button>
      <button type=\"button\" onClick={() => router.back()}>キャンセル</button>
    </form>
  );
};

const Edit = ({ params }) => {
  const [customerData, setCustomerData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/customers/${params.customerId}`);
        setCustomerData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [params.customerId]);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error.message}</div>;

  return (
    <div>
      <Header />
      <SideMenu />
      <CustomerEditForm customerData={customerData} />
    </div>
  );
};

// テスト
describe('顧客情報修正画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      back: jest.fn(),
    });
  });

  it('データ取得成功時の表示', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { customerId: '1', name: 'テスト太郎' },
    });
    render(<Edit params={{ customerId: '1' }} />);    
    expect(await screen.findByText('テスト太郎')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '更新' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument();
  });

  it('データ取得失敗時の表示', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('エラーが発生しました'));
    render(<Edit params={{ customerId: '1' }} />);
    expect(await screen.findByText('エラー: エラーが発生しました')).toBeInTheDocument();
  });

  it('更新ボタンクリック', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { customerId: '1', name: 'テスト太郎' },
    });
    render(<Edit params={{ customerId: '1' }} />);
    fireEvent.submit(screen.getByRole('form'));
    // 更新処理のテスト
  });

  it('キャンセルボタンクリック', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { customerId: '1', name: 'テスト太郎' },
    });
    render(<Edit params={{ customerId: '1' }} />);
    fireEvent.click(screen.getByRole('button', { name: 'キャンセル' }));
    expect((useRouter as jest.Mock).mock.results[0].value.back).toHaveBeenCalled();
  });
});
"}