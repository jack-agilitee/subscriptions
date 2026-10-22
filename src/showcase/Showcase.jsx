import { useState } from 'react'
import Button from '../components/atoms/Button'
import MembershipPlanChangeSummary from '../components/atoms/MembershipPlanChangeSummary'
import MembershipEnrollmentActions from '../components/molecules/MembershipEnrollmentActions'
import MembershipEnrollmentHeader from '../components/molecules/MembershipEnrollmentHeader'
import MembershipRadioCardGroup from '../components/molecules/MembershipRadioCardGroup'
import PaymentMethodTile from '../components/molecules/PaymentMethodTile'
import styles from './Showcase.module.scss'

const annualPlan = { id: 'annual', label: 'Annual', price: '$48', period: '/year' }
const monthlyPlan = { id: 'monthly', label: 'Monthly', price: '$5.99', period: '/month' }

const plansWithNotes = [
  { ...annualPlan, note: 'Save $24.88', noteTone: 'highlight', badge: 'best value' },
  { ...monthlyPlan, note: '($71.88/year)' },
]

const plansWithSavingsBadge = [
  { ...annualPlan, badge: 'Save $23.88' },
  monthlyPlan,
]

const membershipExamples = [
  { caption: 'Annual selected', plans: plansWithNotes, defaultValue: 'annual' },
  { caption: 'Monthly selected', plans: plansWithNotes, defaultValue: 'monthly' },
  { caption: 'Savings badge, annual selected', plans: plansWithSavingsBadge, defaultValue: 'annual' },
  { caption: 'Savings badge, monthly selected', plans: plansWithSavingsBadge, defaultValue: 'monthly' },
  { caption: 'With gov discount link', plans: plansWithNotes, defaultValue: 'annual', govDiscount: true },
]

const MembershipExample = ({ caption, plans, defaultValue, govDiscount }) => {
  const [value, setValue] = useState(defaultValue)
  const [govClicks, setGovClicks] = useState(0)
  const selectedPlan = plans.find((plan) => plan.id === value)

  return (
    <figure className={styles.showcase__example}>
      <figcaption className={styles['showcase__example-caption']}>
        {caption}
        {govDiscount && ` (clicked ${govClicks}×)`}
      </figcaption>
      <MembershipRadioCardGroup
        plans={plans}
        value={value}
        onChange={setValue}
        trialText="Free 30-day trial,"
        trialSubtext={`then ${selectedPlan.price}${selectedPlan.period}`}
        govDiscountText={govDiscount ? 'On gov assistance? Verify to get 50% off' : undefined}
        onGovDiscountClick={govDiscount ? () => setGovClicks((count) => count + 1) : undefined}
      />
    </figure>
  )
}

const legalFor = (ctaLabel) => (
  <>
    By selecting “{ctaLabel}”, you agree to the <a href="#terms">Membership Terms</a> and{' '}
    <a href="#privacy">Privacy Policy</a>. Cancel anytime.
  </>
)

const trialLeadIn = 'You won’t be charged until'

const enrollmentExamples = [
  {
    caption: '1. Trial, taxed',
    leadIn: trialLeadIn,
    emphasis: 'Nov 18, 2026',
    detail: 'Then $103.79/year ($97.00 + $6.79 tax)',
    ctaLabel: 'Start your free 30-day trial',
  },
  {
    caption: '2. Trial, no tax',
    leadIn: trialLeadIn,
    emphasis: 'Nov 18, 2026',
    detail: 'Then $97.00/year',
    ctaLabel: 'Start your free 30-day trial',
  },
  {
    caption: '3. Paid, taxed',
    emphasis: '$103.79 due today',
    detail: '$97.00 + $6.79 tax · Renews Oct 19, 2027',
    ctaLabel: 'Enroll',
  },
  {
    caption: '4. Paid, no tax',
    emphasis: '$97.00 due today',
    detail: 'Renews Oct 19, 2027',
    ctaLabel: 'Enroll',
  },
  {
    caption: 'No saved payment method (CTA disabled)',
    leadIn: trialLeadIn,
    emphasis: 'Nov 18, 2026',
    detail: 'Then $103.79/year ($97.00 + $6.79 tax)',
    ctaLabel: 'Start your free 30-day trial',
    ctaDisabled: true,
  },
]

const EnrollmentExample = ({ caption, ...props }) => {
  const [clicks, setClicks] = useState(0)
  const actionProps = {
    ...props,
    legal: legalFor(props.ctaLabel),
    onCtaClick: () => setClicks((count) => count + 1),
  }

  return (
    <div className={styles.showcase__permutation}>
      <p className={styles['showcase__example-caption']}>
        {caption}
        {!props.ctaDisabled && ` (CTA clicked ${clicks}×)`}
      </p>
      <div className={styles.showcase__platforms}>
        <figure className={styles.showcase__example}>
          <figcaption className={styles['showcase__platform-caption']}>appAndMobile</figcaption>
          <MembershipEnrollmentActions {...actionProps} platform="appAndMobile" />
        </figure>
        <figure className={styles.showcase__example}>
          <figcaption className={styles['showcase__platform-caption']}>desktop</figcaption>
          <MembershipEnrollmentActions {...actionProps} platform="desktop" />
        </figure>
      </div>
    </div>
  )
}

const PaymentMethodTileExamples = () => {
  const [lastAction, setLastAction] = useState('none')

  return (
    <div className={styles.showcase__permutation}>
      <p className={styles['showcase__example-caption']}>Last action: {lastAction}</p>
      <div className={styles.showcase__tiles}>
        <figure className={styles.showcase__example}>
          <figcaption className={styles['showcase__platform-caption']}>Saved card</figcaption>
          <PaymentMethodTile
            paymentMethod={{ brand: 'visa', label: 'Visa * 1243' }}
            onEdit={() => setLastAction('edit Visa * 1243')}
          />
        </figure>
        <figure className={styles.showcase__example}>
          <figcaption className={styles['showcase__platform-caption']}>No saved payment method</figcaption>
          <PaymentMethodTile onAdd={() => setLastAction('add payment method')} />
        </figure>
      </div>
    </div>
  )
}

const enrollmentHeaderProps = {
  tagline: 'Get free delivery and tons of other discounts. Cancel anytime.',
  title: 'Get myDG+® free for 30 days',
  headingLevel: 3,
}

const planChangeSummaryData = { renewalDate: 'Nov 18, 2026', savings: '$23.88' }

const planChangeSummaryExamples = ['current', 'switching', 'keeping'].flatMap((mode) =>
  ['monthly', 'annual'].map((selectedPlan) => ({ selectedPlan, mode })),
)

const sections = [
  {
    title: 'Button',
    level: 'Atom',
    render: () => (
      <>
        <Button>Subscribe</Button>
        <Button variant="secondary">Manage plan</Button>
        <Button disabled>Disabled</Button>
      </>
    ),
  },
  {
    title: 'MembershipPlanChangeSummary',
    level: 'Atom',
    render: () => (
      <div className={styles.showcase__examples}>
        {planChangeSummaryExamples.map(({ selectedPlan, mode }) => (
          <figure key={`${selectedPlan}-${mode}`} className={styles.showcase__example}>
            <figcaption className={styles['showcase__example-caption']}>
              {selectedPlan} / {mode}
            </figcaption>
            <MembershipPlanChangeSummary {...planChangeSummaryData} selectedPlan={selectedPlan} mode={mode} />
          </figure>
        ))}
      </div>
    ),
  },
  {
    title: 'MembershipRadioCardGroup',
    level: 'Molecule',
    render: () => (
      <div className={styles.showcase__examples}>
        {membershipExamples.map((example) => (
          <MembershipExample key={example.caption} {...example} />
        ))}
      </div>
    ),
  },
  {
    title: 'MembershipEnrollmentActions',
    level: 'Molecule',
    render: () => (
      <div className={styles.showcase__permutations}>
        {enrollmentExamples.map((example) => (
          <EnrollmentExample key={example.caption} {...example} />
        ))}
      </div>
    ),
  },
  {
    title: 'PaymentMethodTile',
    level: 'Molecule',
    render: () => <PaymentMethodTileExamples />,
  },
  {
    title: 'MembershipEnrollmentHeader',
    level: 'Molecule',
    render: () => (
      <div className={styles.showcase__platforms}>
        <figure className={styles.showcase__example}>
          <figcaption className={styles['showcase__platform-caption']}>appAndMobile</figcaption>
          <MembershipEnrollmentHeader {...enrollmentHeaderProps} platform="appAndMobile" />
        </figure>
        <figure className={styles.showcase__example}>
          <figcaption className={styles['showcase__platform-caption']}>desktop</figcaption>
          <MembershipEnrollmentHeader {...enrollmentHeaderProps} platform="desktop" />
        </figure>
      </div>
    ),
  },
]

const Showcase = () => (
  <main className={styles.showcase}>
    <header className={styles.showcase__header}>
      <h1 className={styles.showcase__title}>Subscriptions Components</h1>
      <p className={styles.showcase__subtitle}>Component showcase for the subscriptions project.</p>
    </header>

    {sections.map(({ title, level, render }) => (
      <section key={title} className={styles.showcase__section}>
        <div className={styles['showcase__section-header']}>
          <h2 className={styles['showcase__section-title']}>{title}</h2>
          <span className={styles.showcase__level}>{level}</span>
        </div>
        <div className={styles.showcase__demo}>{render()}</div>
      </section>
    ))}
  </main>
)

export default Showcase
