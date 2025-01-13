{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import Shipping from '@/pages/report/shipping';
import Header from '@/components/common/Header';
import SideMenu from '@/components/common/SideMenu';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('発送データ出力条件画面', () => {
  test('コンポーネントが正しくレンダリングされる', () => {
    render(
      <>
        <Header />
        <SideMenu />
        <Shipping />
      </>
    );

    expect(screen.getByText('発送データ出力条件画面')).toBeInTheDocument();
  });

  test('発送日Fromの入力', () => {
    render(
      <>
      <Header />
      <SideMenu />
      <Shipping />
    </>
    );
    const fromDateInput = screen.getByLabelText('発送日From') as HTMLInputElement;
    fireEvent.change(fromDateInput, { target: { value: '2024-01-01' } });
    expect(fromDateInput.value).toBe('2024-01-01');
  });

  test('発送日Toの入力', () => {
    render(
      <>
      <Header />
      <SideMenu />
      <Shipping />
    </>
    );
    const toDateInput = screen.getByLabelText('発送日To') as HTMLInputElement;
    fireEvent.change(toDateInput, { target: { value: '2024-12-31' } });
    expect(toDateInput.value).toBe('2024-12-31');
  });

  test('ダウンロードボタンのクリック', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(
      <>
      <Header />
      <SideMenu />
      <Shipping />
    </>
    );

    fireEvent.click(screen.getByText('ダウンロード'));
    expect(mockPush).toHaveBeenCalledWith('/download'); // download画面への遷移を想定
  });
});"}