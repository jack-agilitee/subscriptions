import visaIcon from '../../../assets/payment-brands/visa.svg'
import styles from './PaymentMethodTile.module.scss'

const brandIcons = {
  visa: visaIcon,
}

const getBrandIcon = (brand) => {
  const key = typeof brand === 'string' ? brand.toLowerCase() : ''
  return Object.hasOwn(brandIcons, key) ? brandIcons[key] : undefined
}

const CardGlyph = () => <span className={styles['payment-method-tile__glyph']} aria-hidden="true" />

const PaymentMethodTile = ({
  paymentMethod,
  onEdit,
  onAdd,
  editLabel = 'edit',
  addLabel = 'Add payment method',
}) => {
  if (!paymentMethod) {
    return (
      <button
        type="button"
        className={`${styles['payment-method-tile']} ${styles['payment-method-tile--add']}`}
        onClick={onAdd}
        disabled={!onAdd}
      >
        <CardGlyph />
        <span className={styles['payment-method-tile__add-label']}>{addLabel}</span>
      </button>
    )
  }

  const { brand, label } = paymentMethod
  const brandIcon = getBrandIcon(brand)

  return (
    <div className={styles['payment-method-tile']}>
      {brandIcon ? (
        <img className={styles['payment-method-tile__brand']} src={brandIcon} alt="" width="24" height="24" />
      ) : (
        <CardGlyph />
      )}
      <span className={styles['payment-method-tile__label']} title={label}>{label}</span>
      {onEdit && (
        <button
          type="button"
          className={styles['payment-method-tile__edit']}
          onClick={onEdit}
          aria-label={`${editLabel} ${label}`}
        >
          {editLabel}
        </button>
      )}
    </div>
  )
}

export default PaymentMethodTile
