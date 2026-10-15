/**
 * @file types/index.ts
 * @description Central TypeScript type definitions for Armour Luxury Gym.
 * Beginner-friendly documentation explaining data structures for future sections.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SectionMeta {
  id: string;
  stepNumber: string;
  title: string;
  eyebrow: string;
  summary: string;
  status: 'foundation-ready' | 'pending-content';
}
