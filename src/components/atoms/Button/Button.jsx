import styles from './Button.module.scss'

const Button = ({ children, variant = 'primary', type = 'button', ...props }) => (
  <button
    type={type}
    className={`${styles.button} ${styles[`button--${variant}`]}`}
    {...props}
  >
    {children}
  </button>
)

export default Button
