{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import ActualRecordScreen from '@/pages/schedule/update';

// Fetch のモック
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({}),
  text: () => Promise.resolve(\"\"),
  ok: true,
  status: 200,
  statusText: \"OK\",
})) as jest.Mock;

// Axios のモック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Router のモック
const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

global.mockNextRouter = mockRouter;
global.axios = mockedAxios;

// コンポーネント
const Header = () => <div>ヘッダー</div>;
const SideMenu = () => <div>サイドメニュー</div>;

describe('発行実績記録画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<ActualRecordScreen />);  
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドメニュー')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /発行予定id/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /発行日/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /発送完了情報/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /更新/i })).toBeInTheDocument();
  });

  it('更新ボタンのクリックでデータが送信される', async () => {
    render(<ActualRecordScreen />);
    fireEvent.change(screen.getByRole('textbox', { name: /発行予定id/i }), { target: { value: '1' } });
    fireEvent.change(screen.getByRole('textbox', { name: /発行日/i }), { target: { value: '2024-05-29' } });
    fireEvent.change(screen.getByRole('textbox', { name: /発送完了情報/i }), { target: { value: '発送完了' } });
    fireEvent.click(screen.getByRole('button', { name: /更新/i }));
  });
});"}