export enum TargetingType {
  UltraHighNetWorth = 'UltraHighNetWorth',
  HighNetWorth = 'HighNetWorth',
  Corporate = 'Corporate',
}

export const labelByTargetingType: Record<TargetingType, string> = {
  [TargetingType.Corporate]: 'Corporate clients',
  [TargetingType.UltraHighNetWorth]: 'Ultra-high net worth clients',
  [TargetingType.HighNetWorth]: 'High net worth clients',
};
