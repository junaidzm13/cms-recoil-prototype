import React from 'react';
import { TextInput } from '../../shared/TextInput';
import { CMSBlock } from '../CMSBlock';

type Props = {
  heading: string;
  onChange: (heading: string) => void;
  expanded: boolean;
  setExpanded: () => void;
};

export const HeadingBlockPlain: React.FC<Props> = ({
  heading,
  onChange,
  ...expandedProps
}) => {
  return (
    <CMSBlock title={'Heading'} {...expandedProps}>
      <TextInput value={heading} onChange={onChange} />
    </CMSBlock>
  );
};
