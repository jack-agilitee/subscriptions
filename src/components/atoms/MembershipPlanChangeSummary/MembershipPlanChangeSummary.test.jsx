import { render, screen } from '@testing-library/react'
import MembershipPlanChangeSummary from './MembershipPlanChangeSummary'

const data = { renewalDate: 'Nov 18, 2026', savings: '$23.88' }

const permutations = [
  ['monthly', 'current', 'You’re on the monthly plan, which renews Nov 18, 2026.'],
  ['annual', 'current', 'You’re saving $23.88 a year on the annual plan, which renews Nov 18, 2026.'],
  ['monthly', 'switching', 'Your annual plan continues until Nov 18, 2026, then your monthly plan starts.'],
  [
    'annual',
    'switching',
    'Your monthly plan continues until Nov 18, 2026, then your annual plan starts and you’ll save $23.88 a year.',
  ],
  ['monthly', 'keeping', 'You’ll stay on the monthly plan, which renews Nov 18, 2026.'],
  ['annual', 'keeping', 'You’ll keep saving $23.88 a year on the annual plan, which renews Nov 18, 2026.'],
]

describe('MembershipPlanChangeSummary', () => {
  it.each(permutations)('renders %s / %s copy', (selectedPlan, mode, sentence) => {
    const { container } = render(
      <MembershipPlanChangeSummary {...data} selectedPlan={selectedPlan} mode={mode} />,
    )
    expect(container.firstChild).toHaveTextContent(sentence)
    expect(container.firstChild).toHaveAttribute('data-selected-plan', selectedPlan)
    expect(container.firstChild).toHaveAttribute('data-mode', mode)
  })

  it('defaults to monthly / current', () => {
    const { container } = render(<MembershipPlanChangeSummary {...data} />)
    expect(container.firstChild).toHaveTextContent(permutations[0][2])
  })

  it('emphasizes the renewal date but not the savings', () => {
    render(<MembershipPlanChangeSummary {...data} selectedPlan="annual" mode="switching" />)
    expect(screen.getByText(data.renewalDate).tagName).toBe('STRONG')
    expect(screen.queryByText(data.savings, { selector: 'strong' })).not.toBeInTheDocument()
  })
})
