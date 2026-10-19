import { useId, useState } from 'react'
import styles from './MembershipRadioCardGroup.module.scss'

const MembershipRadioCardGroup = ({
  plans,
  value,
  defaultValue,
  onChange,
  name,
  label = 'Membership plan',
  trialText,
  trialSubtext,
  govDiscountText,
  onGovDiscountClick,
}) => {
  const generatedName = useId()
  const groupName = name || generatedName
  const [internalValue, setInternalValue] = useState(defaultValue ?? plans[0]?.id)
  const selected = value ?? internalValue

  const handleChange = (id) => {
    if (value === undefined) setInternalValue(id)
    onChange?.(id)
  }

  return (
    <div className={styles['membership-radio-card-group']}>
      {trialText && (
        <p className={styles['membership-radio-card-group__trial']}>
          <span className={styles['membership-radio-card-group__trial-text']}>{trialText}</span>
          {trialSubtext && (
            <span className={styles['membership-radio-card-group__trial-subtext']}>{trialSubtext}</span>
          )}
        </p>
      )}

      <fieldset className={styles['membership-radio-card-group__options']}>
        <legend className={styles['membership-radio-card-group__legend']}>{label}</legend>

        {plans.map((plan) => {
          const isSelected = plan.id === selected

          return (
            <label
              key={plan.id}
              className={`${styles['membership-radio-card-group__card']} ${
                isSelected ? styles['membership-radio-card-group__card--selected'] : ''
              }`}
            >
              <input
                type="radio"
                name={groupName}
                value={plan.id}
                checked={isSelected}
                onChange={() => handleChange(plan.id)}
                className={styles['membership-radio-card-group__input']}
              />

              <span className={styles['membership-radio-card-group__details']}>
                <span className={styles['membership-radio-card-group__name']}>{plan.label}</span>
                <span className={styles['membership-radio-card-group__price']}>
                  <span className={styles['membership-radio-card-group__amount']}>{plan.price}</span>
                  <span className={styles['membership-radio-card-group__period']}>{plan.period}</span>
                </span>
                {plan.note && (
                  <span
                    className={`${styles['membership-radio-card-group__note']} ${
                      styles[`membership-radio-card-group__note--${plan.noteTone || 'muted'}`]
                    }`}
                  >
                    {plan.note}
                  </span>
                )}
              </span>

              <span className={styles['membership-radio-card-group__radio']} aria-hidden="true" />

              {plan.badge && (
                <span className={styles['membership-radio-card-group__badge']}>{plan.badge}</span>
              )}
            </label>
          )
        })}
      </fieldset>

      {govDiscountText && onGovDiscountClick && (
        <button
          type="button"
          className={styles['membership-radio-card-group__link']}
          onClick={onGovDiscountClick}
        >
          {govDiscountText}
        </button>
      )}
    </div>
  )
}

export default MembershipRadioCardGroup
