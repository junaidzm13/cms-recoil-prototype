import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { CMSPrototypeData } from '../CMSPrototype';
import { DEFAULT_HEADING, DEFAULT_TEXT } from '../constants';
import { TargetingType } from '../TargetingType';

export const textState = atom<string>({
  key: 'textState',
  default: DEFAULT_TEXT,
});

export const headingState = atom<string>({
  key: 'headingState',
  default: DEFAULT_HEADING,
});

export const targetingTypeState = atom<TargetingType>({
  key: 'targetingTypeState',
  default: TargetingType.HighNetWorth,
});

export const hasAttestationState = atom<boolean>({
  key: 'hasAttestationState',
  default: false,
});

export const contentPreviewState = selector<CMSPrototypeData>({
  key: 'contentPreviewState',
  get: ({ get }) => {
    return {
      heading: get(headingState),
      text: get(textState),
      targetingType: get(targetingTypeState),
      attestation: get(hasAttestationState),
    };
  },
});

export const blocksExpandedState = atomFamily<boolean, BlockId>({
  key: 'blocksExpandedState',
  default: false,
});

export const allBlocksAreExpandedState = selector<boolean>({
  key: 'allBlocksAreExpandedState',
  get: ({ get }) => {
    return allBlockIds.every(blockId => get(blocksExpandedState(blockId)));
  },
});

export const allBlockIds = [
  'textBlock',
  'headingBlock',
  'targetingTypeBlock',
] as const;

export type BlockId = typeof allBlockIds[number];
