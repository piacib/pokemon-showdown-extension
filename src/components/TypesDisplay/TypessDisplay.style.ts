import styled from 'styled-components';
import { TypeColorInterface } from '../../types';

const TypeColoredComponent = styled.div<TypeColorInterface>`
  background-color: ${(props) => props.theme.color.typeColors[props.background]};
`;
export const TypeContainer = styled.div`
  grid-row: 3;
  grid-column: 1;
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-self: end;
  height: 100%;
`;

export const Type = styled(TypeColoredComponent)`
  margin: 0 5px;
  padding: 1px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
`;
