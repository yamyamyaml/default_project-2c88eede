{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import Layout from '@/pages/Layout';

describe('Layout Component Test', () => {
  test('renders children correctly', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

});"}