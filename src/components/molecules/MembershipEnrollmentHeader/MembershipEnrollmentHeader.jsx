import logo from '../../../assets/brand/mydg-plus-logo-boxed.svg'
import styles from './MembershipEnrollmentHeader.module.scss'

// Renders "®" raised and smaller, as in the Figma title.
const withRegisteredMarks = (text) =>
  typeof text === 'string'
    ? text.split(/(®)/).map((part, index) =>
        part === '®' ? (
          <sup key={index} className={styles['membership-enrollment-header__mark']}>®</sup>
        ) : (
          part
        ),
      )
    : text

const MembershipEnrollmentHeader = ({
  platform = 'appAndMobile',
  tagline,
  title,
  logoAlt = 'myDG+',
  headingLevel = 1,
}) => {
  const level = Number(headingLevel)
  const Heading = `h${Number.isInteger(level) && level >= 1 && level <= 6 ? level : 1}`

  return (
    <header
      data-platform={platform}
      className={`${styles['membership-enrollment-header']} ${
        styles[`membership-enrollment-header--${platform}`]
      }`}
    >
      <img className={styles['membership-enrollment-header__logo']} src={logo} alt={logoAlt} width="48" height="39" />
      {tagline && <p className={styles['membership-enrollment-header__tagline']}>{tagline}</p>}
      <Heading className={styles['membership-enrollment-header__title']}>{withRegisteredMarks(title)}</Heading>
    </header>
  )
}

export default MembershipEnrollmentHeader
