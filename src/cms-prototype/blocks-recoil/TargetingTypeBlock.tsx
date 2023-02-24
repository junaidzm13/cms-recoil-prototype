import React from 'react';
import { useRecoilState } from 'recoil';
import { objectKeys } from '../../shared/objectKeys';
import { SelectDropdown } from '../../shared/SelectDropdown';
import { CMSBlock } from '../CMSBlock';
import { labelByTargetingType } from '../TargetingType';
import {
  blocksExpandedState,
  targetingTypeState,
} from '../recoil-state/recoil-state';

export const TargetingTypeBlock: React.FC = () => {
  const [targetingType, setTargetingType] = useRecoilState(targetingTypeState);
  const [expanded, setExpanded] = useRecoilState(
    blocksExpandedState('targetingTypeBlock')
  );

  return (
    <CMSBlock
      title={'Targeting type'}
      expanded={expanded}
      setExpanded={() => setExpanded(!expanded)}
    >
      <SelectDropdown
        value={targetingType}
        options={objectKeys(labelByTargetingType).map(value => ({
          value,
          label: labelByTargetingType[value],
        }))}
        onChange={setTargetingType}
      />
    </CMSBlock>
  );
};
