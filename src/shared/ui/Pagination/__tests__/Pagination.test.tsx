import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../Pagination.tsx';

describe('Pagination', () => {
  it('returns null when totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders all pages when totalPages <= 5', () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={vi.fn()} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onPageChange when a page button is clicked', async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables prev button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);

    const prevBtn = screen.getByLabelText(/предыдущая/i);
    expect(prevBtn).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />);

    const nextBtn = screen.getByLabelText(/следующая/i);
    expect(nextBtn).toBeDisabled();
  });

  it('navigates to previous page', async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByLabelText(/предыдущая/i));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
