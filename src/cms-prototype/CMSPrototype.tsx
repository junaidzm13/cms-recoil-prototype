import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { RecoilRoot, useRecoilCallback, useRecoilValue } from 'recoil';
import { HeadingBlock } from './blocks-recoil/HeadingBlock';
import { TextBlock } from './blocks-recoil/TextBlock';
import { TargetingTypeBlock } from './blocks-recoil/TargetingTypeBlock';
import { AttestationBlock } from './blocks-recoil/AttestationBlock';
import { labelByTargetingType, TargetingType } from './TargetingType';
import {
  allBlockIds,
  allBlocksAreExpandedState,
  BlockId,
  blocksExpandedState,
  contentPreviewState,
} from './recoil-state/recoil-state';
import { HeadingBlockPlain } from './blocks/HeadingBlockPlain';
import { TextBlockPlain } from './blocks/TextBlockPlain';
import { TargetingTypeBlockPlain } from './blocks/TargetingTypeBlockPlain';
import { AttestationBlockPlain } from './blocks/AttestationBlockPlain';
import { DEFAULT_HEADING, DEFAULT_TEXT } from './constants';

export type CMSPrototypeData = {
  heading: string;
  text: string;
  targetingType: TargetingType;
  attestation: boolean;
};

export const CMSPrototype: React.FC = () => {
  const [state, setState] = useState<CMSPrototypeData>(() =>
    getDefaultPrototypeData()
  );

  const [recoilIsActive, setRecoilIsActive] = useState<boolean>(false);

  return (
    <RecoilRoot>
      <HeaderWrapper>
        <h1>CMS Prototype</h1>
        <ActivateRecoilButton
          onClick={() => setRecoilIsActive(!recoilIsActive)}
          isActive={recoilIsActive}
        />
      </HeaderWrapper>
      <BodyWrapper>
        {recoilIsActive ? (
          <>
            <CMSEditorRecoil />
            <CMSPreviewRecoil />
          </>
        ) : (
          <>
            <CMSEditor content={state} onChange={setState} />
            <CMSPreview {...state} />
          </>
        )}
      </BodyWrapper>
    </RecoilRoot>
  );
};

const ActivateRecoilButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
}> = ({ isActive, onClick }) => (
  <button
    style={{ backgroundColor: 'teal', color: 'white', fontSize: '16px' }}
    onClick={onClick}
  >
    {`${isActive ? 'Dea' : 'A'}ctivate recoil`}
  </button>
);

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: fit-content;
  padding: 1em;
`;

function getDefaultPrototypeData(): CMSPrototypeData {
  return {
    heading: DEFAULT_HEADING,
    text: DEFAULT_TEXT,
    targetingType: TargetingType.HighNetWorth,
    attestation: false,
  };
}

const BodyWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 2em;
`;

const CMSEditor: React.FC<{
  content: CMSPrototypeData;
  onChange: (data: CMSPrototypeData) => void;
}> = props => {
  const { content, onChange } = props;

  const [expandedState, setExpandedState] = useState<Record<BlockId, boolean>>(
    () => getExpandedState(false)
  );

  const allExpanded = useMemo(
    () => allBlockIds.every(id => expandedState[id]),
    [expandedState]
  );

  const onAllExapndedOrCollapsed = () => {
    setExpandedState(getExpandedState(!allExpanded));
  };

  const getOnChangeHandler =
    <T extends keyof CMSPrototypeData>(key: T) =>
    (value: CMSPrototypeData[T]) => {
      onChange({ ...content, [key]: value });
    };

  const getOnChangeExpanded = (key: BlockId) => () => {
    setExpandedState({
      ...expandedState,
      [key]: !expandedState[key],
    });
  };

  return (
    <Wrapper>
      <ExpandOrCollapseAllButton
        allExpanded={allExpanded}
        onClick={onAllExapndedOrCollapsed}
      />
      <HeadingBlockPlain
        expanded={expandedState.headingBlock}
        setExpanded={getOnChangeExpanded('headingBlock')}
        heading={content.heading}
        onChange={getOnChangeHandler('heading')}
      />
      <TextBlockPlain
        expanded={expandedState.textBlock}
        setExpanded={getOnChangeExpanded('textBlock')}
        text={content.text}
        onChange={getOnChangeHandler('text')}
      />
      <TargetingTypeBlockPlain
        expanded={expandedState.targetingTypeBlock}
        setExpanded={getOnChangeExpanded('targetingTypeBlock')}
        targetingType={content.targetingType}
        onChange={getOnChangeHandler('targetingType')}
      />
      <AttestationBlockPlain
        onChange={() => getOnChangeHandler('attestation')(!content.attestation)}
        checked={content.attestation}
      />
    </Wrapper>
  );
};

function getExpandedState(defaultState: boolean) {
  return allBlockIds.reduce((prev, id) => {
    return { ...prev, [id]: defaultState };
  }, {} as Record<BlockId, boolean>);
}

const CMSEditorRecoil: React.FC = () => {
  return (
    <Wrapper>
      <ExpandOrCollapseAllButtonRecoil />
      <HeadingBlock />
      <TextBlock />
      <TargetingTypeBlock />
      <AttestationBlock />
    </Wrapper>
  );
};

const ExpandOrCollapseAllButtonRecoil: React.FC = () => {
  const allExpanded = useRecoilValue(allBlocksAreExpandedState);

  const handleExpandOrCollapseAll = useRecoilCallback(
    ({ set }) =>
      () => {
        allBlockIds.forEach(id => set(blocksExpandedState(id), !allExpanded));
      },
    [allExpanded]
  );

  return (
    <ExpandOrCollapseAllButton
      onClick={() => handleExpandOrCollapseAll()}
      allExpanded={allExpanded}
    />
  );
};

const ExpandOrCollapseAllButton: React.FC<{
  allExpanded: boolean;
  onClick: () => void;
}> = ({ allExpanded, onClick }) => {
  return (
    <button onClick={onClick} style={{ width: 'fit-content' }}>
      {allExpanded ? 'Collapse all' : 'Expand all'}
    </button>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1em;
  padding-left: 1em;
`;

const CMSPreview: React.FC<CMSPrototypeData> = props => {
  return <PreviewContent {...props} />;
};

const CMSPreviewRecoil: React.FC = () => {
  const contentState = useRecoilValue(contentPreviewState);

  return <PreviewContent {...contentState} />;
};

const PreviewContent: React.FC<CMSPrototypeData> = props => {
  const { heading, text, targetingType, attestation } = props;

  return (
    <PreviewWrapper>
      <h3>{heading}</h3>
      <span>{text}</span>
      <span>
        <strong>Targeted audience:</strong>{' '}
        {labelByTargetingType[targetingType]}
      </span>
      <div style={{ backgroundColor: 'lightgray', padding: '0.5em' }}>
        <h4 style={{ margin: 0, marginBottom: '0.25em' }}>IMPORTANT:</h4>
        <span>
          {attestation
            ? 'Content is accurate and up-to-date'
            : '***WARNING*** attestation missing!'}
        </span>
      </div>
    </PreviewWrapper>
  );
};

const PreviewWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2em;
  padding-left: 3em;
`;
