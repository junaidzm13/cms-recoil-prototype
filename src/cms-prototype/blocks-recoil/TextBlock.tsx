import React from 'react';
import { useRecoilState } from 'recoil';
import { TextInput } from '../../shared/TextInput';
import { CMSBlock } from '../CMSBlock';
import { blocksExpandedState, textState } from '../recoil-state/recoil-state';

export const TextBlock: React.FC = () => {
  const [text, setText] = useRecoilState(textState);
  const [expanded, setExpanded] = useRecoilState(
    blocksExpandedState('textBlock')
  );

  return (
    <CMSBlock
      title={'Text'}
      expanded={expanded}
      setExpanded={() => setExpanded(!expanded)}
    >
      <TextInput value={text} onChange={setText} />
    </CMSBlock>
  );
};
