import styles from './Button.module.scss'

const Button = ({ children, variant = 'primary', type = 'button', className = '', ...props }) => (
  <button
    type={type}
    className={`${styles.button} ${styles[`button--${variant}`]} ${className}`.trim()}
    {...props}
  >
    {children}
  </button>
)

export default Button
