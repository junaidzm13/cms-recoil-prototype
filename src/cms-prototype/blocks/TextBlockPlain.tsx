import React from 'react';
import { TextInput } from '../../shared/TextInput';
import { CMSBlock } from '../CMSBlock';

type Props = {
  text: string;
  onChange: (text: string) => void;
  expanded: boolean;
  setExpanded: () => void;
};

export const TextBlockPlain: React.FC<Props> = ({
  text,
  onChange,
  ...expandedProps
}) => {
  return (
    <CMSBlock title={'Text'} {...expandedProps}>
      <TextInput value={text} onChange={onChange} />
    </CMSBlock>
  );
};
