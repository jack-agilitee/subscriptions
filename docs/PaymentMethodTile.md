# PaymentMethodTile

**Level:** Molecule · **Path:** `src/components/molecules/PaymentMethodTile/`

Shows the customer's saved payment method with an edit link, or a prompt to add one when nothing is saved.

**Figma:** [PaymentMethodTile/Subscription/AppAndMobile](https://www.figma.com/design/jyoCsqRduPNMzwSRkyFcR6/%F0%9F%90%AF--Agilitee-Tiger-Team-for-MCP?node-id=2-485) (section `2:485`; instances `2:486` saved, `2:487` add)

## Variants

| Variant | When | Renders |
|---|---|---|
| Saved | `paymentMethod` is set | Brand logo, card label (truncates), `edit` link button |
| Add | `paymentMethod` is omitted | The whole tile is a button: generic card icon + "Add payment method" in link blue (truncates) |

## Usage

```jsx
import PaymentMethodTile from '../components/molecules/PaymentMethodTile'

// Saved
<PaymentMethodTile
  paymentMethod={{ brand: 'visa', label: 'Visa * 1243' }}
  onEdit={openPaymentSheet}
/>

// Nothing saved
<PaymentMethodTile onAdd={openPaymentSheet} />
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `paymentMethod` | `{ brand: string, label: string }` | — | Saved method. Omit to show the add variant. `brand` is matched case-insensitively; `label` also shows as a hover title when truncated |
| `onEdit` | `() => void` | — | Edit click handler; the edit link only renders when set |
| `onAdd` | `() => void` | — | Add-variant click handler; the tile is disabled without it |
| `editLabel` | `string` | `'edit'` | Edit link text (accessible name is `"{editLabel} {label}"`) |
| `addLabel` | `string` | `'Add payment method'` | Add-variant text |

## Brand logos

Logos live in `src/assets/payment-brands/` and are mapped in `brandIcons` inside the component. Only **Visa** is in the Figma file so far; any other brand falls back to the generic card icon. To add one, drop its SVG in that folder and add it to `brandIcons`.

## Not implemented

The Figma component also has hidden `warning`, `error1` and `error2` notices (placeholder lorem ipsum). They're off in both variants, so they aren't built yet.

## Testing

`PaymentMethodTile.test.jsx` covers both variants, the edit/add handlers, custom labels, the hidden edit link without a handler, and the unknown-brand fallback.
