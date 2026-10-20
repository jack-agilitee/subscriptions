import { render, screen, fireEvent } from '@testing-library/react'
import MembershipEnrollmentActions from './MembershipEnrollmentActions'

const trialTaxed = {
  legal: 'By tapping "Start your free 30-day trial", you agree to the Membership Terms.',
  leadIn: 'You won’t be charged until',
  emphasis: 'Nov 18, 2026',
  detail: 'Then $103.79/year ($97.00 + $6.79 tax)',
  ctaLabel: 'Start your free 30-day trial',
}

describe('MembershipEnrollmentActions', () => {
  it('renders legal, lead-in, emphasis, detail and the CTA', () => {
    render(<MembershipEnrollmentActions {...trialTaxed} />)
    ;[trialTaxed.legal, trialTaxed.leadIn, trialTaxed.emphasis, trialTaxed.detail]
      .forEach((text) => expect(screen.getByText(text)).toBeInTheDocument())
    expect(screen.getByRole('button', { name: trialTaxed.ctaLabel })).toBeEnabled()
  })

  it('calls onCtaClick when the CTA is clicked', () => {
    const onCtaClick = vi.fn()
    render(<MembershipEnrollmentActions {...trialTaxed} onCtaClick={onCtaClick} />)
    fireEvent.click(screen.getByRole('button', { name: trialTaxed.ctaLabel }))
    expect(onCtaClick).toHaveBeenCalledTimes(1)
  })

  it('disables the CTA when there is no saved payment method', () => {
    const onCtaClick = vi.fn()
    render(<MembershipEnrollmentActions {...trialTaxed} onCtaClick={onCtaClick} ctaDisabled />)
    const cta = screen.getByRole('button', { name: trialTaxed.ctaLabel })
    expect(cta).toBeDisabled()
    fireEvent.click(cta)
    expect(onCtaClick).not.toHaveBeenCalled()
  })

  it('omits legal, lead-in and detail when not provided (paid, no tax)', () => {
    render(<MembershipEnrollmentActions emphasis="$97.00 due today" ctaLabel="Enroll" />)
    expect(screen.getByText('$97.00 due today')).toBeInTheDocument()
    expect(screen.queryByText(/won’t be charged/)).not.toBeInTheDocument()
    expect(screen.queryByText(/agree/)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Enroll' })).toBeInTheDocument()
  })

  it('accepts links in the legal copy', () => {
    render(
      <MembershipEnrollmentActions
        {...trialTaxed}
        legal={<>You agree to the <a href="/terms">Membership Terms</a>.</>}
      />,
    )
    expect(screen.getByRole('link', { name: 'Membership Terms' })).toHaveAttribute('href', '/terms')
  })

  it('applies the platform modifier class', () => {
    const { container, rerender } = render(<MembershipEnrollmentActions {...trialTaxed} />)
    expect(container.firstChild.className).toMatch(/--appAndMobile/)
    rerender(<MembershipEnrollmentActions {...trialTaxed} platform="desktop" />)
    expect(container.firstChild.className).toMatch(/--desktop/)
  })
})
