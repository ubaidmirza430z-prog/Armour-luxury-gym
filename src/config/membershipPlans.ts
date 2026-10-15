/**
 * ============================================================================
 * ARMOUR LUXURY GYM - CENTRAL MEMBERSHIP PRICING CONFIGURATION
 * ============================================================================
 * 
 * NOTE: These pricing figures and tier inclusions are demo/placeholder entries.
 * All values are maintained in this single central config object so they can be
 * easily adjusted, localized, or fetched from a CMS/backend in the future.
 * ============================================================================
 */

export interface MembershipPlan {
  id: string;
  planNumber: string;
  name: string;
  priceAmount: number;
  currency: string;
  billingPeriod: string;
  displayPrice: string;
  isPopular?: boolean;
  badge?: string;
  features: string[];
  buttonText: string;
  tierSummary: string;
}

export const MEMBERSHIP_PLANS_CONFIG: MembershipPlan[] = [
  {
    id: 'essential',
    planNumber: '01',
    name: 'ESSENTIAL',
    priceAmount: 1499,
    currency: '₹',
    billingPeriod: 'MONTH',
    displayPrice: '₹1,499 / MONTH',
    isPopular: false,
    tierSummary: 'Foundational facility access for focused, independent training.',
    features: [
      'Full Gym Access',
      'Strength & Cardio Equipment',
      'Locker Access',
      'Basic Fitness Assessment',
    ],
    buttonText: 'SELECT ESSENTIAL →',
  },
  {
    id: 'performance',
    planNumber: '02',
    name: 'PERFORMANCE',
    priceAmount: 2499,
    currency: '₹',
    billingPeriod: 'MONTH',
    displayPrice: '₹2,499 / MONTH',
    isPopular: true,
    badge: 'MOST POPULAR',
    tierSummary: 'Enhanced training support with progressive programming and coaching guidance.',
    features: [
      'Full Gym Access',
      'Strength & Cardio Equipment',
      'Personal Training Guidance',
      'Fitness Assessment',
      'Customized Training Plan',
      'Priority Support',
    ],
    buttonText: 'SELECT PERFORMANCE →',
  },
  {
    id: 'elite',
    planNumber: '03',
    name: 'ELITE',
    priceAmount: 3999,
    currency: '₹',
    billingPeriod: 'MONTH',
    displayPrice: '₹3,999 / MONTH',
    isPopular: false,
    tierSummary: 'The definitive private fitness protocol with comprehensive one-on-one mastery.',
    features: [
      'Full Gym Access',
      'Dedicated Personal Training',
      'Customized Training & Nutrition Guidance',
      'Performance Assessment',
      'Recovery Guidance',
      'Priority Membership Support',
    ],
    buttonText: 'SELECT ELITE →',
  },
];
