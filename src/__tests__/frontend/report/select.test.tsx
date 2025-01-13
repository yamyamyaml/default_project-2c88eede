{"code": "import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReportSelect } from '@/pages/report/select';

// モック
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('レポート種別選択画面', () => {
  it('初期表示の確認', () => {
    render(<ReportSelect />);
    expect(screen.getByText('レポート種別選択')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '契約者一覧表' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '売上一覧表' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '入金集計表' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'ラベル' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '発送データ' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '定期元帳' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '次へ' })).toBeInTheDocument();
  });

  it('ラジオボタンの選択', () => {
    render(<ReportSelect />);
    fireEvent.click(screen.getByRole('radio', { name: '売上一覧表' }));
    expect(screen.getByRole('radio', { name: '売上一覧表' }).checked).toBeTruthy();
  });

  it('次へボタンのクリック', () => {
    const useRouter = jest.fn(() => ({
      push: jest.fn(),
    }));
    (useRouter as jest.Mock).mockImplementationOnce(() => ({
      push: jest.fn(),
    }));

    render(<ReportSelect />);
    fireEvent.click(screen.getByRole('radio', { name: '売上一覧表' }));
    fireEvent.click(screen.getByRole('button', { name: '次へ' }));

    expect(useRouter).toHaveBeenCalled();
  });
});"}