import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the calculator by default', () => {
  render(<App />);

  expect(screen.getByRole('button', { name: 'Calculator' })).toHaveAttribute('aria-current', 'page');
  expect(screen.getByText('Pint')).toBeInTheDocument();
});
