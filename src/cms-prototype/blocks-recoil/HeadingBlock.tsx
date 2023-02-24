import React from 'react';
import { useRecoilState } from 'recoil';
import { TextInput } from '../../shared/TextInput';
import { CMSBlock } from '../CMSBlock';
import {
  blocksExpandedState,
  headingState,
} from '../recoil-state/recoil-state';

export const HeadingBlock: React.FC = () => {
  const [heading, setHeading] = useRecoilState(headingState);
  const [expanded, setExpanded] = useRecoilState(
    blocksExpandedState('headingBlock')
  );

  return (
    <CMSBlock
      title={'Heading'}
      expanded={expanded}
      setExpanded={() => setExpanded(!expanded)}
    >
      <TextInput value={heading} onChange={setHeading} />
    </CMSBlock>
  );
};
