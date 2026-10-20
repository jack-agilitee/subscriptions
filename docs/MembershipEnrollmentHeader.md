# MembershipEnrollmentHeader

**Level:** Molecule · **Path:** `src/components/molecules/MembershipEnrollmentHeader/`

Top of the myDG+ membership enrollment page: boxed myDG+ logo, tagline and page title.

**Figma:** [myDG+ enrollment page](https://www.figma.com/design/jyoCsqRduPNMzwSRkyFcR6/%F0%9F%90%AF--Agilitee-Tiger-Team-for-MCP?node-id=127-14082) (header frame `I129:14164;69:1456` on desktop, `I127:11040;69:1335` on mobile; the frame has no component name in Figma)

## Platforms

| Platform | Layout |
|---|---|
| `appAndMobile` | Logo centered; tagline and title left-aligned |
| `desktop` | Everything left-aligned |

## Usage

```jsx
import MembershipEnrollmentHeader from '../components/molecules/MembershipEnrollmentHeader'

<MembershipEnrollmentHeader
  platform="desktop"
  tagline="Get free delivery and tons of other discounts. Cancel anytime."
  title="Get myDG+® free for 30 days"
/>
```

Any `®` in a string `title` is rendered raised and smaller (12.9px Bold against the 20px Black title, as in Figma).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `platform` | `'appAndMobile' \| 'desktop'` | `'appAndMobile'` | Layout variant |
| `tagline` | `string` | — | Small grey line above the title; hidden when omitted |
| `title` | `string \| ReactNode` | required | Page title; strings get `®` styling automatically |
| `logoAlt` | `string` | `'myDG+'` | Alt text for the logo |
| `headingLevel` | `1–6` | `1` | Heading element used for the title |

## Assets

The logo is `src/assets/brand/mydg-plus-logo-boxed.svg`, downloaded from Figma at its native 48×39.

## Testing

`MembershipEnrollmentHeader.test.jsx` covers the logo, tagline and heading, the `®` styling, node titles, the optional tagline, custom heading level and alt text, and the platform attribute.
