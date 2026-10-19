import { useState } from 'react'
import Button from '../components/atoms/Button'
import MembershipRadioCardGroup from '../components/molecules/MembershipRadioCardGroup'
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
