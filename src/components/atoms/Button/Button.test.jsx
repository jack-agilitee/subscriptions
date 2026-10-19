import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders children and handles clicks', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Subscribe</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
