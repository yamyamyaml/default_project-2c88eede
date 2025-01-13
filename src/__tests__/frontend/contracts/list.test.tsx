{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';

// ヘッダーコンポーネント
const Header = () => {
  return <header>ヘッダー</header>;
};

// モックデータ
const contractData = [
  { 契約ID: '1', 顧客名: '顧客A', 契約開始日: '2024-01-01', 終了日: '2024-12-31' },
  { 契約ID: '2', 顧客名: '顧客B', 契約開始日: '2024-02-01', 終了日: '2025-01-31' },
];

// テスト対象コンポーネント
const 契約一覧画面 = () => {
  const [contracts, setContracts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/contracts');
        setContracts(result.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Header />
      <table>
        <thead>
          <tr>
            <th>契約ID</th>
            <th>顧客名</th>
            <th>契約開始日</th>
            <th>終了日</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.契約ID}>
              <td>{contract.契約ID}</td>
              <td>{contract.顧客名}</td>
              <td>{contract.契約開始日}</td>
              <td>{contract.終了日}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

describe('契約一覧画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('契約データが正しく表示される', async () => {
    // Axios モックの設定
    axios.get.mockResolvedValue({ data: contractData });

    render(<契約一覧画面 />);

    // ローディング表示の確認
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // データ取得後の表示確認
    await screen.findByRole('table'); // table が表示されるまで待つ
    expect(screen.getByText('顧客A')).toBeInTheDocument();
    expect(screen.getByText('顧客B')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('2025-01-31')).toBeInTheDocument();
  });

  it('エラー発生時にエラーメッセージが表示される', async () => {
    const errorMessage = 'エラーが発生しました';
    axios.get.mockRejectedValue(new Error(errorMessage));

    render(<契約一覧画面 />);

    await screen.findByText(`Error: ${errorMessage}`);
  });

  it('ヘッダーコンポーネントが表示される', async () => {
    axios.get.mockResolvedValue({ data: [] }); // データは空でも良い
    render(<契約一覧画面 />);
    await screen.findByRole('table');
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
  });
});
"}