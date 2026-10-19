import Button from '../components/atoms/Button'
import styles from './Showcase.module.scss'

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
