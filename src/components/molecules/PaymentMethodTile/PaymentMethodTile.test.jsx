import { render, screen, fireEvent } from '@testing-library/react'
import PaymentMethodTile from './PaymentMethodTile'

const visa = { brand: 'visa', label: 'Visa * 1243' }

describe('PaymentMethodTile', () => {
  describe('saved payment method', () => {
    it('renders the card label and brand logo', () => {
      const { container } = render(<PaymentMethodTile paymentMethod={visa} />)
      expect(screen.getByText('Visa * 1243')).toBeInTheDocument()
      const logo = container.querySelector('img')
      expect(logo.getAttribute('src')).toBeTruthy()
      expect(logo).toHaveAttribute('alt', '')
      expect(screen.getByText('Visa * 1243')).toHaveAttribute('title', 'Visa * 1243')
    })

    it('matches brands case-insensitively', () => {
      const { container } = render(<PaymentMethodTile paymentMethod={{ brand: 'VISA', label: 'Visa * 1243' }} />)
      expect(container.querySelector('img')).toBeInTheDocument()
    })

    it.each(['constructor', 'toString', undefined, 42])('falls back to the generic icon for brand %s', (brand) => {
      const { container } = render(<PaymentMethodTile paymentMethod={{ brand, label: 'Card * 0001' }} />)
      expect(container.querySelector('img')).not.toBeInTheDocument()
      expect(screen.getByText('Card * 0001')).toBeInTheDocument()
    })

    it('calls onEdit from an accessible edit button', () => {
      const onEdit = vi.fn()
      render(<PaymentMethodTile paymentMethod={visa} onEdit={onEdit} />)
      const edit = screen.getByRole('button', { name: 'edit Visa * 1243' })
      expect(edit).toHaveTextContent('edit')
      fireEvent.click(edit)
      expect(onEdit).toHaveBeenCalledTimes(1)
    })

    it('hides the edit button without an onEdit handler', () => {
      render(<PaymentMethodTile paymentMethod={visa} />)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('supports a custom edit label', () => {
      render(<PaymentMethodTile paymentMethod={visa} onEdit={() => {}} editLabel="change" />)
      expect(screen.getByRole('button', { name: 'change Visa * 1243' })).toBeInTheDocument()
    })

    it('falls back to the generic card icon for unknown brands', () => {
      const { container } = render(<PaymentMethodTile paymentMethod={{ brand: 'discover', label: 'Discover * 0042' }} />)
      expect(screen.getByText('Discover * 0042')).toBeInTheDocument()
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })
  })

  describe('add payment method', () => {
    it('renders a button that calls onAdd', () => {
      const onAdd = vi.fn()
      render(<PaymentMethodTile onAdd={onAdd} />)
      fireEvent.click(screen.getByRole('button', { name: 'Add payment method' }))
      expect(onAdd).toHaveBeenCalledTimes(1)
    })

    it('supports a custom add label', () => {
      render(<PaymentMethodTile addLabel="Add a card" onAdd={() => {}} />)
      expect(screen.getByRole('button', { name: 'Add a card' })).toBeEnabled()
    })

    it('is disabled without an onAdd handler', () => {
      render(<PaymentMethodTile />)
      expect(screen.getByRole('button', { name: 'Add payment method' })).toBeDisabled()
    })
  })
})
