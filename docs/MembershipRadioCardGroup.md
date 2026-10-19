# MembershipRadioCardGroup

**Level:** Molecule · **Path:** `src/components/molecules/MembershipRadioCardGroup/`

Membership plan picker: an optional trial heading, side-by-side selectable plan cards, and an optional gov-assistance discount link.

**Figma:** [MembershipRadioCardGroup/AppAndMobile](https://www.figma.com/design/jyoCsqRduPNMzwSRkyFcR6/%F0%9F%90%AF--Agilitee-Tiger-Team-for-MCP?node-id=2-489) (node `2:489`)

## Usage

```jsx
import { useState } from 'react'
import MembershipRadioCardGroup from '../components/molecules/MembershipRadioCardGroup'

const plans = [
  { id: 'annual', label: 'Annual', price: '$97', period: '/year', note: 'Save $46.88', noteTone: 'highlight', badge: 'best value' },
  { id: 'monthly', label: 'Monthly', price: '$11.99', period: '/month', note: '($143.88/year)' },
]

const PlanPicker = () => {
  const [plan, setPlan] = useState('annual')

  return (
    <MembershipRadioCardGroup
      plans={plans}
      value={plan}
      onChange={setPlan}
      trialText="Free 30-day trial,"
      trialSubtext="then $97/year"
      govDiscountText="On gov assistance? Verify to get 50% off"
      onGovDiscountClick={() => openGovVerification()}
    />
  )
}
```

Uncontrolled: omit `value` and optionally pass `defaultValue`. The first plan is selected by default.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `plans` | `Plan[]` | required | Plans to render as cards, left to right |
| `value` | `string` | — | Selected plan `id` (controlled) |
| `defaultValue` | `string` | first plan's `id` | Initial selection when uncontrolled |
| `onChange` | `(id: string) => void` | — | Called with the newly selected plan `id` |
| `name` | `string` | auto-generated | `name` attribute shared by the radio inputs |
| `label` | `string` | `'Membership plan'` | Accessible name for the group (visually hidden legend) |
| `trialText` | `string` | — | Bold trial heading; heading hidden when omitted |
| `trialSubtext` | `string` | — | Smaller grey text after the trial heading |
| `govDiscountText` | `string` | — | Link text under the cards |
| `onGovDiscountClick` | `() => void` | — | Click handler; link only renders when both this and `govDiscountText` are set |

### `Plan`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique value for the plan |
| `label` | `string` | Plan name, e.g. "Annual" |
| `price` | `string` | Formatted price, e.g. "$97" |
| `period` | `string` | Price suffix, e.g. "/year" |
| `note` | `string?` | Line under the price |
| `noteTone` | `'highlight' \| 'muted'` | `highlight` = bold blue (savings), `muted` = grey. Default `muted` |
| `badge` | `string?` | Yellow badge on the card's top edge, e.g. "best value" |

## Accessibility

- Cards are `<label>`s wrapping native `<input type="radio">`s inside a `<fieldset>`, so arrow-key navigation, focus and screen-reader announcements come from the browser.
- The radio circle is drawn in SCSS and hidden from assistive tech; the real input is visually hidden.
- Keyboard focus shows a ring around the whole card.
- The gov discount link is a `<button>` because it triggers an action, not navigation.

## Testing

`MembershipRadioCardGroup.test.jsx` covers rendering, default/controlled/uncontrolled selection, `onChange`, optional trial/note/badge/link, and the gov link handler.
