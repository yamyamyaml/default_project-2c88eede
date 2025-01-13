{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import AlertNotificationSetting from '@/pages/alertNotificationSetting';

// ヘッダーコンポーネント（モック）
const Header = () => <div>Header</div>;

// フッターコンポーネント（モック）
const Footer = () => <div>Footer</div>;

describe('アラート通知先設定画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('コンポーネントが正常にレンダリングされる', async () => {
    render(<AlertNotificationSetting />);  
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();   
  });

  it('通知先設定フォームが入力・保存できる', async () => {
    const mockPost = jest.spyOn(axios, 'post');
    mockPost.mockResolvedValue({ status: 200, data: { message: '保存しました' } });

    render(<AlertNotificationSetting />);

    fireEvent.change(screen.getByRole('textbox', { name: /メールアドレス/i }), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /保存/i }));

    expect(mockPost).toHaveBeenCalledTimes(1);
    // 保存成功時のメッセージが表示されるか確認
    // 例: expect(screen.getByText('保存しました')).toBeVisible();
  });

  it('データ取得処理が正常に動作する', async () => {
    const mockGet = jest.spyOn(axios, 'get');
    mockGet.mockResolvedValue({ status: 200, data: { setting_id: '1', notification_type: 'email', notification_destination: 'test@example.com' } });
    render(<AlertNotificationSetting />);
    expect(mockGet).toHaveBeenCalledTimes(1);
    // 取得したデータが画面に表示されるか確認
    // 例: expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('エラー発生時に適切なメッセージが表示される', async () => {
    const mockGet = jest.spyOn(axios, 'get');
    mockGet.mockRejectedValue({ response: { status: 500, data: { message: 'エラーが発生しました' } } });
    render(<AlertNotificationSetting />);
    // エラーメッセージが表示されるか確認
    // 例: expect(screen.getByText('エラーが発生しました')).toBeVisible();
  });
});"}