import React from 'react';
import { useRecoilState } from 'recoil';
import { Checkbox } from '../../shared/Checkbox';
import { CMSBlock } from '../CMSBlock';
import { hasAttestationState } from '../recoil-state/recoil-state';

export const AttestationBlock: React.FC = () => {
  const [hasAttestation, setHasAttestation] =
    useRecoilState(hasAttestationState);

  return (
    <CMSBlock>
      <Checkbox
        value={'attestation'}
        onChange={() => setHasAttestation(!hasAttestation)}
        checked={hasAttestation}
        label={'I attest content is accurate and up-to-date.'}
      />
    </CMSBlock>
  );
};
