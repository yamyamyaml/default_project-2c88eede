{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import AlertSetting from '@/pages/alertSetting';

jest.mock('next/navigation');

// モックコンポーネント
const Header = () => <div>Header</div>;
const Footer = () => <div>Footer</div>;

describe('アラート設定画面', () => {
  test('HeaderとFooterが表示されること', () => {
    render(<AlertSetting />);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  test('アラート条件設定ボタンクリックで画面遷移すること', () => {
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

    render(<AlertSetting />);
    fireEvent.click(screen.getByRole('button', { name: /アラート条件設定/i }));
    expect(mockRouterPush).toHaveBeenCalledWith('/alertConditionSetting'); // 仮のパス
  });

  test('アラート通知先設定ボタンクリックで画面遷移すること', () => {
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

    render(<AlertSetting />);
    fireEvent.click(screen.getByRole('button', { name: /アラート通知先設定/i }));
    expect(mockRouterPush).toHaveBeenCalledWith('/alertNotificationSetting'); // 仮のパス
  });
});"}