import { useState } from 'react'
import Button from '../components/atoms/Button'
import MembershipRadioCardGroup from '../components/molecules/MembershipRadioCardGroup'
import styles from './Showcase.module.scss'

const membershipPlans = [
  { id: 'annual', label: 'Annual', price: '$97', period: '/year', note: 'Save $46.88', noteTone: 'highlight', badge: 'best value' },
  { id: 'monthly', label: 'Monthly', price: '$11.99', period: '/month', note: '($143.88/year)' },
]

const MembershipRadioCardGroupDemo = () => {
  const [plan, setPlan] = useState('annual')
  const [govClicks, setGovClicks] = useState(0)

  return (
    <div className={styles['showcase__demo-stack']}>
      <MembershipRadioCardGroup
        plans={membershipPlans}
        value={plan}
        onChange={setPlan}
        trialText="Free 30-day trial,"
        trialSubtext="then $97/year"
        govDiscountText="On gov assistance? Verify to get 50% off"
        onGovDiscountClick={() => setGovClicks((count) => count + 1)}
      />
      <p className={styles.showcase__state}>
        Selected: <strong>{plan}</strong> · Gov discount clicks: <strong>{govClicks}</strong>
      </p>
    </div>
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
      <>
        <MembershipRadioCardGroupDemo />
        <MembershipRadioCardGroup plans={membershipPlans} defaultValue="monthly" />
      </>
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
