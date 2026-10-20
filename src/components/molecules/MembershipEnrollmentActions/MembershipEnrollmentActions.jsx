import Button from '../../atoms/Button'
import styles from './MembershipEnrollmentActions.module.scss'

const MembershipEnrollmentActions = ({
  platform = 'appAndMobile',
  legal,
  leadIn,
  emphasis,
  detail,
  ctaLabel,
  onCtaClick,
  ctaDisabled = false,
}) => (
  <div
    data-platform={platform}
    className={`${styles['membership-enrollment-actions']} ${
      styles[`membership-enrollment-actions--${platform}`]
    }`}
  >
    {legal && <p className={styles['membership-enrollment-actions__legal']}>{legal}</p>}

    <div className={styles['membership-enrollment-actions__price']}>
      <p className={styles['membership-enrollment-actions__summary']}>
        {leadIn && <span className={styles['membership-enrollment-actions__lead-in']}>{leadIn}</span>}
        <span className={styles['membership-enrollment-actions__emphasis']}>{emphasis}</span>
      </p>
      {detail && <p className={styles['membership-enrollment-actions__detail']}>{detail}</p>}
    </div>

    <Button
      className={styles['membership-enrollment-actions__cta']}
      onClick={onCtaClick}
      disabled={ctaDisabled}
    >
      {ctaLabel}
    </Button>
  </div>
)

export default MembershipEnrollmentActions
