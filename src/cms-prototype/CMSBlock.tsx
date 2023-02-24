import exp from 'constants';
import styled from 'styled-components';

type CMSBlockProps = {
  title?: string;
  expanded?: boolean;
  setExpanded?: () => void;
  children: React.ReactNode;
};

export const CMSBlock = styled(
  ({ title, expanded, setExpanded, children, ...rest }: CMSBlockProps) => {
    return (
      <div {...rest}>
        {title && (
          <button
            onClick={setExpanded}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h3 style={{ margin: 0 }}>{title}</h3>
            <ChevronIcon expanded={expanded ?? false} />
          </button>
        )}
        {/* {title && <h3>{title}</h3>} */}
        {(!title || expanded) && children}
      </div>
    );
  }
)`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 0.5em;
  background-color: #ecedf1;
`;

const ChildWrapper = styled.div`
  padding: 0.25em;
  background-color: lightgray;
`;

const ChevronIcon = styled.span<{ expanded: boolean }>`
  border-style: solid;
  border-width: 0.25em 0.25em 0 0;
  content: '';
  display: inline-block;
  height: 0.45em;
  left: 0.15em;
  position: relative;
  top: 0.15em;
  transform: rotate(-45deg);
  vertical-align: top;
  width: 0.45em;
  ${({ expanded }) =>
    !expanded &&
    `top: 0;
	transform: rotate(135deg);`}
`;
