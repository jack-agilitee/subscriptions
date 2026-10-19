import { render, screen, fireEvent } from '@testing-library/react'
import MembershipRadioCardGroup from './MembershipRadioCardGroup'

const plans = [
  { id: 'annual', label: 'Annual', price: '$97', period: '/year', note: 'Save $46.88', noteTone: 'highlight', badge: 'best value' },
  { id: 'monthly', label: 'Monthly', price: '$11.99', period: '/month', note: '($143.88/year)' },
]

const getRadio = (name) => screen.getByRole('radio', { name: new RegExp(name) })

describe('MembershipRadioCardGroup', () => {
  it('renders every plan with its price, period, note and badge', () => {
    render(<MembershipRadioCardGroup plans={plans} />)
    expect(screen.getByRole('group', { name: 'Membership plan' })).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(2)
    ;['Annual', '$97', '/year', 'Save $46.88', 'best value', 'Monthly', '$11.99', '/month', '($143.88/year)']
      .forEach((text) => expect(screen.getByText(text)).toBeInTheDocument())
  })

  it('selects the first plan by default and supports defaultValue', () => {
    const { unmount } = render(<MembershipRadioCardGroup plans={plans} />)
    expect(getRadio('Annual')).toBeChecked()
    unmount()
    render(<MembershipRadioCardGroup plans={plans} defaultValue="monthly" />)
    expect(getRadio('Monthly')).toBeChecked()
  })

  it('updates selection and calls onChange when uncontrolled', () => {
    const onChange = vi.fn()
    render(<MembershipRadioCardGroup plans={plans} onChange={onChange} />)
    fireEvent.click(screen.getByText('Monthly'))
    expect(getRadio('Monthly')).toBeChecked()
    expect(getRadio('Annual')).not.toBeChecked()
    expect(onChange).toHaveBeenCalledWith('monthly')
  })

  it('respects the value prop when controlled', () => {
    const onChange = vi.fn()
    render(<MembershipRadioCardGroup plans={plans} value="annual" onChange={onChange} />)
    fireEvent.click(getRadio('Monthly'))
    expect(onChange).toHaveBeenCalledWith('monthly')
    expect(getRadio('Annual')).toBeChecked()
  })

  it('uses the provided name and a custom group label', () => {
    render(<MembershipRadioCardGroup plans={plans} name="plan" label="Choose a plan" />)
    expect(screen.getByRole('group', { name: 'Choose a plan' })).toBeInTheDocument()
    screen.getAllByRole('radio').forEach((radio) => expect(radio).toHaveAttribute('name', 'plan'))
  })

  it('shows the trial text and subtext only when provided', () => {
    const { rerender } = render(<MembershipRadioCardGroup plans={plans} />)
    expect(screen.queryByText('Free 30-day trial,')).not.toBeInTheDocument()
    rerender(<MembershipRadioCardGroup plans={plans} trialText="Free 30-day trial," />)
    expect(screen.getByText('Free 30-day trial,')).toBeInTheDocument()
    expect(screen.queryByText('then $97/year')).not.toBeInTheDocument()
    rerender(<MembershipRadioCardGroup plans={plans} trialText="Free 30-day trial," trialSubtext="then $97/year" />)
    expect(screen.getByText('then $97/year')).toBeInTheDocument()
  })

  it('renders the gov discount link and calls its handler', () => {
    const onGovDiscountClick = vi.fn()
    render(
      <MembershipRadioCardGroup
        plans={plans}
        govDiscountText="On gov assistance? Verify to get 50% off"
        onGovDiscountClick={onGovDiscountClick}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'On gov assistance? Verify to get 50% off' }))
    expect(onGovDiscountClick).toHaveBeenCalledTimes(1)
  })

  it('hides the gov discount link without a handler', () => {
    render(<MembershipRadioCardGroup plans={plans} govDiscountText="On gov assistance?" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('omits the note and badge when a plan has none', () => {
    render(<MembershipRadioCardGroup plans={[{ id: 'basic', label: 'Basic', price: '$5', period: '/month' }]} />)
    expect(getRadio('Basic')).toBeChecked()
    expect(screen.queryByText('best value')).not.toBeInTheDocument()
  })
})
