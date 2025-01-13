{"code": "import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// モック
jest.mock('axios');
jest.mock('next/navigation');

// コンポーネント
const Header = () => <header>ヘッダー</header>;
const Footer = () => <footer>フッター</footer>;
const AlertList = ({ alerts }) => (
  <div>
    <h2>アラート一覧</h2>
    <ul>
      {alerts.map((alert) => (
        <li key={alert.alert_id}>
          {alert.alert_message} - {alert.alert_time}
          <button onClick={() => alert.onClick(alert.alert_id)}>詳細</button>
        </li>
      ))}
    </ul>
    <button onClick={() => alerts.onCSVClick()}>CSV出力</button>
  </div>
);

const AlertListScreen = () => {
  const router = useRouter();
  const [alerts, setAlerts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/alerts');
        setAlerts(res.data);
      } catch (error) {
        console.error(\"アラート一覧取得エラー\", error);
        setAlerts([]);
      }
    };
    fetchData();
  }, []);

  const handleAlertClick = (alertId) => {
    router.push(`/alert/${alertId}`);
  };

  const handleCSVClick = () => {
    // CSV出力処理
    console.log(\"CSV出力\");
  };

  return (
    <div>
      <Header />
      <AlertList alerts={{ alerts, onClick: handleAlertClick, onCSVClick: handleCSVClick }} />
      <Footer />
    </div>
  );
};

describe('アラート一覧画面', () => {
  test('アラート一覧が表示される', async () => {
    const mockAlerts = [
      { alert_id: 1, alert_message: 'アラート1', alert_time: '2024-07-24 10:00' },
      { alert_id: 2, alert_message: 'アラート2', alert_time: '2024-07-24 11:00' },
    ];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockAlerts });

    render(<AlertListScreen />);

    await act(async () => {});

    mockAlerts.forEach((alert) => {
      expect(screen.getByText(alert.alert_message)).toBeInTheDocument();
    });
  });

  test('詳細ボタンクリックでアラート詳細画面に遷移する', async () => {
    const mockAlerts = [
      { alert_id: 1, alert_message: 'アラート1', alert_time: '2024-07-24 10:00' },
    ];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockAlerts });
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<AlertListScreen />);
    await act(async () => {});

    fireEvent.click(screen.getByText('詳細'));

    expect(mockRouter.push).toHaveBeenCalledWith('/alert/1');
  });

  test('CSV出力ボタンクリックでCSV出力処理が実行される', async () => {
    const mockAlerts = [];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockAlerts });

    render(<AlertListScreen />);
    await act(async () => {});
    const spy = jest.spyOn(console, 'log');

    fireEvent.click(screen.getByText('CSV出力'));

    expect(spy).toHaveBeenCalledWith(\"CSV出力\");
  });

  test('アラート一覧取得エラー時の処理', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error('エラー'));

    render(<AlertListScreen />);

    await act(async () => {});
    // エラーメッセージが表示されないことを確認
    expect(screen.queryByText('エラー')).not.toBeInTheDocument();
  });
});
"}