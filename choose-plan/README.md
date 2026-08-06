# choose-plan

Responsive "Choose your cover" screen. One template serves phone and desktop.

## Files

| File | Purpose |
|---|---|
| `choose-plan.component.ts` | State, lowest-price logic, scroll handling, price formatting |
| `choose-plan.component.html` | Markup — Bootstrap 5 for all layout/responsiveness |
| `choose-plan.component.scss` | Brand visuals only (colours, type scale, radius, accordion transition) |
| `choose-plan.model.ts` | Interfaces — translation keys, never display text |
| `choose-plan.data.ts` | Static catalogue. **Replace the `price` values when the API lands.** |
| `choose-plan.module.ts` | NgModule; declares the component, provides `DecimalPipe`, registers the `tr` locale |
| `i18n/en.json`, `i18n/tr.json` | Merge the `choosePlan` block into your existing files |
| `preview.html` | Throwaway browser preview — **delete when you copy this folder** |

## Install

1. Copy the folder into `src/app/...` (drop `preview.html` and this README).
2. Merge `i18n/*.json` into your existing `en.json` / `tr.json`.
3. Import the module where you need it:

```ts
import { ChoosePlanModule } from './choose-plan/choose-plan.module';
```

4. Use it:

```html
<app-choose-plan-mobile *ngIf="isMobile"
                        (planChosen)="onPlanChosen($event)"
                        (offerSelected)="onOfferSelected($event)">
</app-choose-plan-mobile>
```

The selector is `app-choose-plan-mobile` (matching your existing snippet) even though
the class is `ChoosePlanComponent` — rename either freely.

## Responsive approach

All breakpoint behaviour is in the **template**, as Bootstrap classes — nothing is
duplicated in SCSS, and there is no separate desktop component.

| | `< md` (phone) | `>= md` (tablet/desktop) |
|---|---|---|
| Cards | stacked, `col-12` | side by side, `col-md-6` |
| Content width | full bleed | capped + centred, `col-md-11 col-lg-9 col-xl-8` |
| CTA | full width | narrowed, `col-md-8 col-lg-6 col-xl-5` |
| Scroll chip | visible | hidden via `d-md-none` |
| Tab pills | spread evenly, `me-auto` | tight group, `me-md-2` |

The SCSS only bumps the type scale at `md` / `xl`. Component styles out-specify
Bootstrap automatically (Angular's `[_ngcontent]` attribute adds specificity), so
there is no `!important` anywhere.

## Wiring the price API

`choose-plan.data.ts` holds the catalogue. Either edit the `price` fields there, or
feed the whole array in from the parent — the `tiers` `@Input()` overrides it:

```html
<app-choose-plan-mobile [tiers]="tiersFromApi"></app-choose-plan-mobile>
```

The **"Lowest price" badge is never hard-coded** — it is derived from the prices at
render time, so it moves on its own. It is deliberately hidden when only one offer
exists, or when prices tie.

Verified behaviour: Economic → Aksigorta (18,900 < 19,600); Standard → Allianz
(23,750 < 24,300); Premium → Aksigorta (31,400 < 32,900).

## Behaviour notes

- **Accordion** — only one card open at a time; opening the second collapses the
  first. Switching tabs closes any open card.
- **Selection** vs **expansion** are independent: reading a competitor's coverage
  never silently changes what the CTA buys. Selection is remembered per tab.
- **Default selection** is the cheapest offer in the tab until the user taps a card.
- **Continue button** emits `planChosen` with the selected `ProviderOffer`. Put
  routing / quote creation in the parent so the component stays route-agnostic.
- **Scroll chip** scrolls ~70% of a screenful. It finds the nearest scrollable
  ancestor at runtime, so it works whether the host page scrolls at document level
  or inside a wrapper. It auto-hides once the page is scrolled to the bottom, and
  its scroll listener runs outside the Angular zone (it only re-enters when the
  visibility actually flips).

## Turkish number formatting

`choose-plan.module.ts` calls `registerLocaleData(localeTr, 'tr')` so prices group as
`18.900` in Turkish and `18,900` in English. Harmless if your `AppModule` already
does it.

The currency symbol is `currencySymbol = '₺'` in the component — change it there if
you'd rather use the `TL` suffix your old markup used.
