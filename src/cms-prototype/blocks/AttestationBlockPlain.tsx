import React from 'react';
import { Checkbox } from '../../shared/Checkbox';
import { CMSBlock } from '../CMSBlock';

type Props = {
  checked: boolean;
  onChange: () => void;
};

export const AttestationBlockPlain: React.FC<Props> = props => {
  return (
    <CMSBlock>
      <Checkbox
        value={'attestation'}
        onChange={props.onChange}
        checked={props.checked}
        label={'I attest content is accurate and up-to-date.'}
      />
    </CMSBlock>
  );
};
