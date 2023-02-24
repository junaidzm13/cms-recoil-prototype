import React from 'react';
import { useRecoilState } from 'recoil';
import { objectKeys } from '../../shared/objectKeys';
import { SelectDropdown } from '../../shared/SelectDropdown';
import { CMSBlock } from '../CMSBlock';
import { labelByTargetingType, TargetingType } from '../TargetingType';

type Props = {
  targetingType: TargetingType;
  onChange: (value: TargetingType) => void;
  expanded: boolean;
  setExpanded: () => void;
};

export const TargetingTypeBlockPlain: React.FC<Props> = ({
  targetingType,
  onChange,
  ...expandedProps
}) => {
  return (
    <CMSBlock title={'Targeting type'} {...expandedProps}>
      <SelectDropdown
        value={targetingType}
        options={objectKeys(labelByTargetingType).map(value => ({
          value,
          label: labelByTargetingType[value],
        }))}
        onChange={onChange}
      />
    </CMSBlock>
  );
};
