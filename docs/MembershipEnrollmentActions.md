# MembershipEnrollmentActions

**Level:** Molecule · **Path:** `src/components/molecules/MembershipEnrollmentActions/`

Commit area at the end of the membership enrollment page and sheet: terms, charge summary and primary CTA. Price and tax appear only here; each fact appears once and charge lines always show cents.

**Figma:** [MembershipEnrollmentActions](https://www.figma.com/design/jyoCsqRduPNMzwSRkyFcR6/%F0%9F%90%AF--Agilitee-Tiger-Team-for-MCP?node-id=67-990) (section `67:990`; instances `123:8789` appAndMobile, `123:8790` desktop)

## Platforms

| Platform | Layout |
|---|---|
| `appAndMobile` | App (iOS, Android) and mobile web. Centered price text, full-width CTA, hairline top border. **The parent fixes it to the bottom of the screen** and adds the OS/browser safe-area inset; the component's own bottom padding excludes it. |
| `desktop` | Inline at the end of page content. Left-aligned, no border or padding. CTA hugs its label with a 240px minimum width. |

## Usage

```jsx
import MembershipEnrollmentActions from '../components/molecules/MembershipEnrollmentActions'

// 1. Trial, taxed
<MembershipEnrollmentActions
  platform="appAndMobile"
  legal={<>By selecting “Start your free 30-day trial”, you agree to the <a href="/terms">Membership Terms</a>.</>}
  leadIn="You won’t be charged until"
  emphasis="Nov 18, 2026"
  detail="Then $103.79/year ($97.00 + $6.79 tax)"
  ctaLabel="Start your free 30-day trial"
  onCtaClick={startTrial}
  ctaDisabled={!hasSavedPaymentMethod}
/>

// 3. Paid, taxed (no lead-in)
<MembershipEnrollmentActions
  platform="desktop"
  emphasis="$103.79 due today"
  detail="$97.00 + $6.79 tax · Renews Oct 19, 2027"
  ctaLabel="Enroll"
  onCtaClick={enroll}
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `platform` | `'appAndMobile' \| 'desktop'` | `'appAndMobile'` | Layout variant |
| `legal` | `ReactNode` | — | Terms copy (may contain links). Must quote the CTA label. Hidden when omitted |
| `leadIn` | `string` | — | Regular text before `emphasis`. Use for trials; omit for paid |
| `emphasis` | `string` | required | Medium-weight text: charge date (trial) or amount due (paid) |
| `detail` | `string` | — | Second line: recurring charge, tax breakdown, renewal date |
| `ctaLabel` | `string` | required | Primary button label |
| `onCtaClick` | `() => void` | — | Primary button click handler |
| `ctaDisabled` | `boolean` | `false` | Disable the CTA, e.g. when there's no saved payment method |

## Permutations (from Figma)

| # | Case | `leadIn` | `emphasis` | `detail` | `ctaLabel` |
|---|---|---|---|---|---|
| 1 | Trial, taxed | You won’t be charged until | Nov 18, 2026 | Then $103.79/year ($97.00 + $6.79 tax) | Start your free 30-day trial |
| 2 | Trial, no tax | You won’t be charged until | Nov 18, 2026 | Then $97.00/year | Start your free 30-day trial |
| 3 | Paid, taxed | — | $103.79 due today | $97.00 + $6.79 tax · Renews Oct 19, 2027 | Enroll |
| 4 | Paid, no tax | — | $97.00 due today | Renews Oct 19, 2027 | Enroll |

## Notes

- The CTA is the shared `Button` atom (primary variant), restyled to the Figma primaryCta.
- The disabled CTA style isn't in this Figma file (the button lives in an external library); it currently uses `border/default` background with `text/default/secondary` text.
- Legal copy is pending from Legal.

## Testing

`MembershipEnrollmentActions.test.jsx` covers rendering, CTA click, disabled CTA, optional legal/lead-in/detail, links in legal copy and the platform modifier.
