import { render, screen } from '@testing-library/react'
import MembershipEnrollmentHeader from './MembershipEnrollmentHeader'

const props = {
  tagline: 'Get free delivery and tons of other discounts. Cancel anytime.',
  title: 'Get myDG+® free for 30 days',
}

describe('MembershipEnrollmentHeader', () => {
  it('renders the logo, tagline and title as a level-1 heading', () => {
    render(<MembershipEnrollmentHeader {...props} />)
    expect(screen.getByRole('img', { name: 'myDG+' })).toBeInTheDocument()
    expect(screen.getByText(props.tagline)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Get myDG+® free for 30 days')
  })

  it('raises the registered mark in the title', () => {
    render(<MembershipEnrollmentHeader {...props} />)
    const mark = screen.getByRole('heading').querySelector('sup')
    expect(mark).toHaveTextContent('®')
  })

  it('raises every registered mark, including at the edges', () => {
    render(<MembershipEnrollmentHeader title="®myDG+® Plus®" />)
    const heading = screen.getByRole('heading')
    expect(heading.querySelectorAll('sup')).toHaveLength(3)
    expect(heading).toHaveTextContent('®myDG+® Plus®')
  })

  it.each([0, 7, null, 'abc', 2.5])('falls back to h1 for invalid heading level %s', (headingLevel) => {
    render(<MembershipEnrollmentHeader {...props} headingLevel={headingLevel} />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('makes the logo decorative with an empty logoAlt', () => {
    const { container } = render(<MembershipEnrollmentHeader {...props} logoAlt="" />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(container.querySelector('img')).toHaveAttribute('alt', '')
  })

  it('renders a title without a registered mark unchanged', () => {
    render(<MembershipEnrollmentHeader title="Join myDG+" />)
    const heading = screen.getByRole('heading')
    expect(heading).toHaveTextContent('Join myDG+')
    expect(heading.querySelector('sup')).not.toBeInTheDocument()
  })

  it('accepts a node as the title', () => {
    render(<MembershipEnrollmentHeader title={<em>Custom title</em>} />)
    expect(screen.getByRole('heading')).toContainHTML('<em>Custom title</em>')
  })

  it('omits the tagline when not provided', () => {
    render(<MembershipEnrollmentHeader title={props.title} />)
    expect(screen.queryByText(props.tagline)).not.toBeInTheDocument()
  })

  it('supports a custom heading level and logo alt text', () => {
    render(<MembershipEnrollmentHeader {...props} headingLevel={2} logoAlt="myDG+ membership" />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'myDG+ membership' })).toBeInTheDocument()
  })

  it('exposes the platform, defaulting to appAndMobile', () => {
    const { container, rerender } = render(<MembershipEnrollmentHeader {...props} />)
    expect(container.firstChild).toHaveAttribute('data-platform', 'appAndMobile')
    rerender(<MembershipEnrollmentHeader {...props} platform="desktop" />)
    expect(container.firstChild).toHaveAttribute('data-platform', 'desktop')
  })
})
