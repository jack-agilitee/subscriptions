# MembershipPlanChangeSummary

**Level:** Atom · **Path:** `src/components/atoms/MembershipPlanChangeSummary/`

Gray one-sentence summary under the plan cards on the plan change drawer (app), the mobile web page and the desktop page. It describes the selected plan only; charge amounts live in `MembershipEnrollmentActions`.

**Figma:** [MembershipPlanChangeSummary](https://www.figma.com/design/jyoCsqRduPNMzwSRkyFcR6/%F0%9F%90%AF--Agilitee-Tiger-Team-for-MCP?node-id=273-20476) (section `273:20476`; component set `273:20490`)

## Usage

```jsx
import MembershipPlanChangeSummary from '../components/atoms/MembershipPlanChangeSummary'

<MembershipPlanChangeSummary
  selectedPlan="annual"
  mode="switching"
  renewalDate="Nov 18, 2026"
  savings="$23.88"
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `selectedPlan` | `'monthly' \| 'annual'` | `'monthly'` | The plan selected in the radio group |
| `mode` | `'current' \| 'switching' \| 'keeping'` | `'current'` | See mapping below |
| `renewalDate` | `string` | required | Next billing date, shown semibold |
| `savings` | `string` | — | Monthly price × 12 − annual price. Used by the annual variants only |

## Mapping from the parent

The drawer/page derives `mode` from its own state:

| `toggled` | `switchPending` | `mode` |
|---|---|---|
| false | false | `current` |
| true | false | `switching` |
| false | true | `switching` |
| true | true | `keeping` |

## Permutations (from Figma)

| `selectedPlan` / `mode` | Copy |
|---|---|
| monthly / current | You’re on the monthly plan, which renews **{renewalDate}**. |
| annual / current | You’re saving {savings} a year on the annual plan, which renews **{renewalDate}**. |
| monthly / switching | Your annual plan continues until **{renewalDate}**, then your monthly plan starts. |
| annual / switching | Your monthly plan continues until **{renewalDate}**, then your annual plan starts and you’ll save {savings} a year. |
| monthly / keeping | You’ll stay on the monthly plan, which renews **{renewalDate}**. |
| annual / keeping | You’ll keep saving {savings} a year on the annual plan, which renews **{renewalDate}**. |

## Notes

- Copy is fixed per variant; only `renewalDate` and `savings` come from data.
- Fills its parent's width and hugs its height. At 343px, annual / switching wraps to 3 lines.
- `renewalDate` and `savings` are placeholder names; rename them to the API's field names once the swagger exists.

## Testing

`MembershipPlanChangeSummary.test.jsx` covers the copy for all six permutations, the defaults and the semibold date.
