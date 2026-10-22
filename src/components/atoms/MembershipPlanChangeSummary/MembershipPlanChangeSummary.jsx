import styles from './MembershipPlanChangeSummary.module.scss'

// Copy is fixed per variant (from Figma); only the renewal date is semibold.
const copy = {
  monthly: {
    current: (date) => <>You’re on the monthly plan, which renews {date}.</>,
    switching: (date) => <>Your annual plan continues until {date}, then your monthly plan starts.</>,
    keeping: (date) => <>You’ll stay on the monthly plan, which renews {date}.</>,
  },
  annual: {
    current: (date, savings) => <>You’re saving {savings} a year on the annual plan, which renews {date}.</>,
    switching: (date, savings) => (
      <>Your monthly plan continues until {date}, then your annual plan starts and you’ll save {savings} a year.</>
    ),
    keeping: (date, savings) => <>You’ll keep saving {savings} a year on the annual plan, which renews {date}.</>,
  },
}

const MembershipPlanChangeSummary = ({ selectedPlan = 'monthly', mode = 'current', renewalDate, savings }) => {
  const date = <strong className={styles['membership-plan-change-summary__date']}>{renewalDate}</strong>

  return (
    <p
      data-selected-plan={selectedPlan}
      data-mode={mode}
      className={styles['membership-plan-change-summary']}
    >
      {copy[selectedPlan][mode](date, savings)}
    </p>
  )
}

export default MembershipPlanChangeSummary
