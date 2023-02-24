import { on } from 'events';
import React from 'react';
import styled from 'styled-components';

type Props<T extends string> = {
  label: string;
  value: T;
  onChange: () => void;
  checked: boolean;
  direction?: 'row' | 'column';
};

export const Checkbox = <T extends string>(props: Props<T>) => {
  const { value, onChange, label, checked, direction = 'row' } = props;

  return (
    <InputWrapper direction={direction}>
      <input
        value={value}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={value}
      />
      <label htmlFor={value} onClick={onChange}>
        {label}
      </label>
    </InputWrapper>
  );
};

const InputWrapper = styled.div<{ direction: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${props => props.direction};
  gap: 0.5em;
`;
