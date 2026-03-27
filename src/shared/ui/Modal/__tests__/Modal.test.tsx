import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../Modal.tsx';

describe('Modal', () => {
  it('returns null when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={vi.fn()} title="Test">
        Content
      </Modal>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders title and children when open', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="My Modal">
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.getByText('My Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('calls onClose when Escape is pressed', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        Content
      </Modal>,
    );

    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when overlay is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        Content
      </Modal>,
    );

    // Click the overlay (the outermost div)
    const overlay = screen.getByText('Content').parentElement!.parentElement!;
    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });
});
