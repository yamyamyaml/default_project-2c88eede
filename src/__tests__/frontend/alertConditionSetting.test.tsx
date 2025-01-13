{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AlertConditionSetting from '@/pages/alertConditionSetting';

describe('アラート条件設定画面', () => {
  test('コンポーネントがレンダリングされる', () => {
    render(<AlertConditionSetting />);  
    expect(screen.getByRole('heading', { name: /アラート条件設定/i })).toBeInTheDocument();
  });

  test('保存ボタンのクリックイベント', async () => {
    const mockPost = jest.fn().mockResolvedValue({ status: 200 });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: '保存しました' }),
        ok: true,
        status: 200,
      })
    ) as jest.Mock;

    render(<AlertConditionSetting />);
    const saveButton = screen.getByRole('button', { name: /保存/i });

    fireEvent.click(saveButton);
    await expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('アラート種別選択', async () => {
    render(<AlertConditionSetting />);
    const select = screen.getByRole('combobox', { name: /アラート種別/i });
    fireEvent.change(select, { target: { value: '2' } });
    expect(select.value).toBe('2');
  });

  test('閾値入力', async () => {
    render(<AlertConditionSetting />);
    const input = screen.getByRole('textbox', { name: /閾値/i });
    fireEvent.change(input, { target: { value: '100' } });
    expect(input.value).toBe('100');
  });

  describe('HeaderとFooterコンポーネント', () => {
    test('Headerコンポーネントが表示される', () => {
      render(<AlertConditionSetting />);
      expect(screen.getByRole('banner')).toBeVisible();
    });

    test('Footerコンポーネントが表示される', () => {
      render(<AlertConditionSetting />);
      expect(screen.getByRole('contentinfo')).toBeVisible();
    });
  });
});
"}