import { PlanTier } from './choose-plan.model';

/**
 * Static plan catalogue.
 *
 * The *structure* (which providers, which coverage rows) is static by design —
 * it comes from the translation files. Only `price` is a placeholder: replace
 * these numbers with the values returned by the pricing API when it is ready.
 * The component never hard-codes a "cheapest" provider, so changing a price
 * here is enough to move the "Lowest price" badge.
 */
export const CHOOSE_PLAN_TIERS: PlanTier[] = [
  {
    id: 'economic',
    tabLabelKey: 'choosePlan.tier.economic',
    offers: [
      {
        id: 'economic-aksigorta',
        providerNameKey: 'choosePlan.provider.aksigorta',
        packageNameKey: 'choosePlan.tier.economic',
        price: 18900,
        highlights: [
          { labelKey: 'choosePlan.coverage.collisionAndTheft' },
          { labelKey: 'choosePlan.coverage.essentialRoadsideAssistance' }
        ],
        coverages: [
          { labelKey: 'choosePlan.coverage.imm', valueKey: 'choosePlan.value.limit5000000' },
          { labelKey: 'choosePlan.coverage.keyLoss', valueKey: 'choosePlan.value.limit20000' },
          { labelKey: 'choosePlan.coverage.passengerDeathDisability', valueKey: 'choosePlan.value.limit10000' },
          { labelKey: 'choosePlan.coverage.driverDeathDisability', valueKey: 'choosePlan.value.limit10000' },
          { labelKey: 'choosePlan.coverage.glassExemption', valueKey: 'choosePlan.value.noDeductible' },
          { labelKey: 'choosePlan.coverage.earthquakeExemption', valueKey: 'choosePlan.value.deductible5' },
          { labelKey: 'choosePlan.coverage.evCoverages', valueKey: 'choosePlan.value.included' },
          { labelKey: 'choosePlan.coverage.replacementCar', valueKey: 'choosePlan.value.none' }
        ]
      },
      {
        id: 'economic-allianz',
        providerNameKey: 'choosePlan.provider.allianz',
        packageNameKey: 'choosePlan.tier.economic',
        price: 19600,
        highlights: [
          { labelKey: 'choosePlan.coverage.collisionAndTheft' },
          { labelKey: 'choosePlan.coverage.allianzRepairNetwork' }
        ],
        coverages: [
          { labelKey: 'choosePlan.coverage.imm', valueKey: 'choosePlan.value.limit5000000' },
          { labelKey: 'choosePlan.coverage.keyLoss', valueKey: 'choosePlan.value.limit20000' },
          { labelKey: 'choosePlan.coverage.passengerDeathDisability', valueKey: 'choosePlan.value.limit10000' },
          { labelKey: 'choosePlan.coverage.driverDeathDisability', valueKey: 'choosePlan.value.limit10000' },
          { labelKey: 'choosePlan.coverage.glassExemption', valueKey: 'choosePlan.value.noDeductible' },
          { labelKey: 'choosePlan.coverage.earthquakeExemption', valueKey: 'choosePlan.value.deductible5' },
          { labelKey: 'choosePlan.coverage.evCoverages', valueKey: 'choosePlan.value.included' },
          { labelKey: 'choosePlan.coverage.replacementCar', valueKey: 'choosePlan.value.none' }
        ]
      }
    ]
  },
  {
    id: 'standard',
    tabLabelKey: 'choosePlan.tier.standard',
    offers: [
      {
        id: 'standard-aksigorta',
        providerNameKey: 'choosePlan.provider.aksigorta',
        packageNameKey: 'choosePlan.tier.standard',
        price: 24300,
        highlights: [
          { labelKey: 'choosePlan.coverage.collisionAndTheft' },
          { labelKey: 'choosePlan.coverage.replacementCar7Days' }
        ],
        coverages: [
          { labelKey: 'choosePlan.coverage.imm', valueKey: 'choosePlan.value.limit10000000' },
          { labelKey: 'choosePlan.coverage.keyLoss', valueKey: 'choosePlan.value.limit20000' },
          { labelKey: 'choosePlan.coverage.passengerDeathDisability', valueKey: 'choosePlan.value.limit10000' },
          { labelKey: 'choosePlan.coverage.driverDeathDisability', valueKey: 'choosePlan.value.limit10000' },
          { labelKey: 'choosePlan.coverage.glassExemption', valueKey: 'choosePlan.value.noDeductible' },
          { labelKey: 'choosePlan.coverage.earthquakeExemption', valueKey: 'choosePlan.value.noDeductible' },
          { labelKey: 'choosePlan.coverage.evCoverages', valueKey: 'choosePlan.value.included' },
          { labelKey: 'choosePlan.coverage.replacementCar', valueKey: 'choosePlan.value.days7' },
          { labelKey: 'choosePlan.coverage.segment', valueKey: 'choosePlan.value.middle' },
          { labelKey: 'choosePlan.coverage.passengerTreatment', valueKey: 'choosePlan.value.included' },
          { labelKey: 'choosePlan.coverage.driverTreatment', valueKey: 'choosePlan.value.included' }
        ]
      },
      {
        id: 'standard-allianz',
        providerNameKey: 'choosePlan.provider.allianz',
        packageNameKey: 'choosePlan.tier.standard',
        price: 23750,
        highlights: [
          { labelKey: 'choosePlan.coverage.collisionAndTheft' },
          { labelKey: 'choosePlan.coverage.allianzRepairNetwork' }
        ],
        coverages: [
          { labelKey: 'choosePlan.coverage.imm', valueKey: 'choosePlan.value.limit10000000' },
          { labelKey: 'choosePlan.coverage.keyLoss', valueKey: 'choosePlan.value.limit20000' },
          { labelKey: 'choosePlan.coverage.passengerDeathDisability', valueKey: 'choosePlan.value.limit10000' },
          { labelKey: 'choosePlan.coverage.driverDeathDisability', valueKey: 'choosePlan.value.limit10000' },
          { labelKey: 'choosePlan.coverage.glassExemption', valueKey: 'choosePlan.value.noDeductible' },
          { labelKey: 'choosePlan.coverage.earthquakeExemption', valueKey: 'choosePlan.value.noDeductible' },
          { labelKey: 'choosePlan.coverage.evCoverages', valueKey: 'choosePlan.value.included' },
          { labelKey: 'choosePlan.coverage.replacementCar', valueKey: 'choosePlan.value.days7' },
          { labelKey: 'choosePlan.coverage.segment', valueKey: 'choosePlan.value.middle' },
          { labelKey: 'choosePlan.coverage.passengerTreatment', valueKey: 'choosePlan.value.included' },
          { labelKey: 'choosePlan.coverage.driverTreatment', valueKey: 'choosePlan.value.included' }
        ]
      }
    ]
  },
  {
    id: 'premium',
    tabLabelKey: 'choosePlan.tier.premium',
    offers: [
      {
        id: 'premium-aksigorta',
        providerNameKey: 'choosePlan.provider.aksigorta',
        packageNameKey: 'choosePlan.tier.premium',
        price: 31400,
        highlights: [
          { labelKey: 'choosePlan.coverage.collisionAndTheft' },
          { labelKey: 'choosePlan.coverage.replacementCar15Days' }
        ],
        coverages: [
          { labelKey: 'choosePlan.coverage.imm', valueKey: 'choosePlan.value.limit25000000' },
          { labelKey: 'choosePlan.coverage.keyLoss', valueKey: 'choosePlan.value.limit30000' },
          { labelKey: 'choosePlan.coverage.passengerDeathDisability', valueKey: 'choosePlan.value.limit10000' },
          { labelKey: 'choosePlan.coverage.driverDeathDisability', valueKey: 'choosePlan.value.limit10000' },
          { labelKey: 'choosePlan.coverage.glassExemption', valueKey: 'choosePlan.value.noDeductible' },
          { labelKey: 'choosePlan.coverage.earthquakeExemption', valueKey: 'choosePlan.value.noDeductible' },
          { labelKey: 'choosePlan.coverage.evCoverages', valueKey: 'choosePlan.value.included' },
          { labelKey: 'choosePlan.coverage.replacementCar', valueKey: 'choosePlan.value.days15' },
          { labelKey: 'choosePlan.coverage.segment', valueKey: 'choosePlan.value.upper' },
          { labelKey: 'choosePlan.coverage.passengerTreatment', valueKey: 'choosePlan.value.included' },
          { labelKey: 'choosePlan.coverage.driverTreatment', valueKey: 'choosePlan.value.included' },
          { labelKey: 'choosePlan.coverage.nonPecuniaryCompensation', valueKey: 'choosePlan.value.included' }
        ]
      },
      {
        id: 'premium-allianz',
        providerNameKey: 'choosePlan.provider.allianz',
        packageNameKey: 'choosePlan.tier.premium',
        price: 32900,
        highlights: [
          { labelKey: 'choosePlan.coverage.collisionAndTheft' },
          { labelKey: 'choosePlan.coverage.allianzRepairNetwork' }
        ],
        coverages: [
          { labelKey: 'choosePlan.coverage.imm', valueKey: 'choosePlan.value.limit25000000' },
          { labelKey: 'choosePlan.coverage.keyLoss', valueKey: 'choosePlan.value.limit30000' },
          { labelKey: 'choosePlan.coverage.passengerDeathDisability', valueKey: 'choosePlan.value.limit10000' },
          { labelKey: 'choosePlan.coverage.driverDeathDisability', valueKey: 'choosePlan.value.limit10000' },
          { labelKey: 'choosePlan.coverage.glassExemption', valueKey: 'choosePlan.value.noDeductible' },
          { labelKey: 'choosePlan.coverage.earthquakeExemption', valueKey: 'choosePlan.value.noDeductible' },
          { labelKey: 'choosePlan.coverage.evCoverages', valueKey: 'choosePlan.value.included' },
          { labelKey: 'choosePlan.coverage.replacementCar', valueKey: 'choosePlan.value.days15' },
          { labelKey: 'choosePlan.coverage.segment', valueKey: 'choosePlan.value.upper' },
          { labelKey: 'choosePlan.coverage.passengerTreatment', valueKey: 'choosePlan.value.included' },
          { labelKey: 'choosePlan.coverage.driverTreatment', valueKey: 'choosePlan.value.included' },
          { labelKey: 'choosePlan.coverage.nonPecuniaryCompensation', valueKey: 'choosePlan.value.included' }
        ]
      }
    ]
  }
];
