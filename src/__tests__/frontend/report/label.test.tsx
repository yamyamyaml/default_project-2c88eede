{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import Label from '@/pages/report/label';

// ヘッダーコンポーネント（モック）
const Header = () => <div>ヘッダー</div>;

// サイドメニューコンポーネント（モック）
const SideMenu = () => <div>サイドメニュー</div>;

describe('ラベル出力条件画面', () => {
  test('コンポーネントが正しくレンダリングされる', () => {
    render(<Label />);
    expect(screen.getByText('ラベル出力条件画面')).toBeInTheDocument();
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドメニュー')).toBeInTheDocument();

  });

  test('発送日指定の入力とクリア', () => {
    render(<Label />);
    const 発送日From = screen.getByLabelText('発送日（From）');
    const 発送日To = screen.getByLabelText('発送日（To）');
    fireEvent.change(発送日From, { target: { value: '2024-01-01' } });
    fireEvent.change(発送日To, { target: { value: '2024-01-31' } });
    expect(発送日From.value).toBe('2024-01-01');
    expect(発送日To.value).toBe('2024-01-31');

    fireEvent.change(発送日From, { target: { value: '' } });
    fireEvent.change(発送日To, { target: { value: '' } });
    expect(発送日From.value).toBe('');
    expect(発送日To.value).toBe('');

  });


  test('ダウンロードボタンのクリック', async () => {
    render(<Label />);
    const downloadButton = screen.getByRole('button', { name: 'ダウンロード' });

    // Axios モックの設定
    axios.get.mockResolvedValueOnce({ data: [] });

    fireEvent.click(downloadButton);

    // Axios が想定されたエンドポイントにリクエストを送信したことを確認
    expect(axios.get).toHaveBeenCalled();

  });
});"}