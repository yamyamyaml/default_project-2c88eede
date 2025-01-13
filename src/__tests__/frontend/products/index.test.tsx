{"code": "import { render, screen, fireEvent, act } from '@testing-library/react';
import ProductsIndex from '@/pages/products/index';
import { Layout } from '@/components/Layout';

jest.mock('@/components/Layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => <div data-testid=\"layout-component\">{children}</div>,
}));

describe('ProductsIndex Component', () => {
  beforeEach(() => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: [
        { product_code: 'P001', product_name: '商品A', unit_price: 100 },
        { product_code: 'P002', product_name: '商品B', unit_price: 200 },
      ],
      status: 200,
    });
  });

  it('renders Layout component', async () => {
    render(<ProductsIndex />);  
    expect(screen.getByTestId('layout-component')).toBeInTheDocument();
  });

  it('fetches and displays product data', async () => {
    render(<ProductsIndex />);
    await act(() => Promise.resolve()); // Wait for data fetching

    expect(screen.getByText('商品A')).toBeInTheDocument();
    expect(screen.getByText('商品B')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  it('handles search input', async () => {
    render(<ProductsIndex />);
    await act(() => Promise.resolve());

    const searchInput = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: '商品A' } });

    // Add assertions to check if filtering logic works as expected
    // For example: expect(screen.getByText('商品B')).not.toBeVisible();
  });


  it('navigates to product registration page', async () => {
    render(<ProductsIndex />);
    const registerButton = screen.getByText('登録') as HTMLButtonElement;

    fireEvent.click(registerButton);
    expect(mockRouter.push).toHaveBeenCalledWith('/products/create');
  });

  it('navigates to product edit page', async () => {
    render(<ProductsIndex />);
    await act(() => Promise.resolve());
    // Assuming the edit button is associated with a specific product
    const editButton = screen.getAllByText('編集')[0] as HTMLButtonElement; // Get the first edit button

    fireEvent.click(editButton);
    expect(mockRouter.push).toHaveBeenCalledWith('/products/edit/P001');// Replace with the expected product code
  });

  it('navigates to CSV export page', async () => {
    render(<ProductsIndex />);
    const csvButton = screen.getByText('CSV出力') as HTMLButtonElement;
    fireEvent.click(csvButton);
    expect(mockRouter.push).toHaveBeenCalledWith('/products/csv');
  });
});"}