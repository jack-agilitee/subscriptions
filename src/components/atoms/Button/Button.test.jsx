import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders children and handles clicks', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Subscribe</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('defaults to type="button" and merges a custom className', () => {
    render(<Button className="custom">Enroll</Button>)
    const button = screen.getByRole('button', { name: 'Enroll' })
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveClass('custom')
  })

  it('does not fire clicks when disabled', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick} disabled>Enroll</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Enroll' }))
    expect(onClick).not.toHaveBeenCalled()
  })
})
