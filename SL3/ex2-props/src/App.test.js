import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Pizza products header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Danh Sách Sản Phẩm Pizza/i);
  expect(headerElement).toBeInTheDocument();
});
