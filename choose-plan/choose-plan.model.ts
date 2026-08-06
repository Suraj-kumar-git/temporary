/**
 * Data contracts for the "Choose your cover" screen.
 *
 * Nothing here holds display text — only ngx-translate keys — so every visible
 * string lives in en.json / tr.json and the component stays language agnostic.
 */

/**
 * Coverage tiers.
 * `premium` is the tier your existing code calls `KeyLossTypes.Super`; map it
 * when you wire the pricing API.
 */
export type PlanTierId = 'economic' | 'standard' | 'premium';

/** One row inside a card — a label, optionally with a value on the right. */
export interface CoverageItem {
  /** e.g. 'choosePlan.coverage.collisionAndTheft' */
  labelKey: string;
  /** e.g. 'choosePlan.value.included' — omit for highlight rows, which show no value */
  valueKey?: string;
}

/** One insurer's offer inside a tier. */
export interface ProviderOffer {
  /** Unique across the whole screen — used for selection, accordion state and trackBy. */
  id: string;
  /** e.g. 'choosePlan.provider.aksigorta' */
  providerNameKey: string;
  /** e.g. 'choosePlan.tier.economic' — the package name under the provider */
  packageNameKey: string;
  /** Raw number. Formatting/localisation happens in the component. */
  price: number;
  /** The 2 rows visible while the card is collapsed. */
  highlights: CoverageItem[];
  /** The full list revealed by the accordion. */
  coverages: CoverageItem[];
}

/** One tab. */
export interface PlanTier {
  id: PlanTierId;
  /** e.g. 'choosePlan.tier.economic' */
  tabLabelKey: string;
  offers: ProviderOffer[];
}
