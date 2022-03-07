import styled from 'styled-components';
export const PropertyDisplay = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  flex-wrap: wrap;
  align-items: center;
`;
export const HiddenPropertyText = styled.div`
  display: none;
`;
export const HoverDisplay = styled.div`
  padding: 5px;
  text-align: center;
  margin: 2px;
  border: 2px solid black;
  font-size: 0.8rem;
  position: relative;
  &:hover ${HiddenPropertyText} {
    display: block;
    position: absolute;
    text-align: start;
    background: white;
    z-index: 2;
    border: 1px solid black;
  }
`;
export const PropertyBtn = styled(HoverDisplay)`
  &:hover ${HiddenPropertyText} {
    top: 30px;
    right: 0;
    max-width: 250px;
    min-width: 150px;
    padding: 5px;
    font-size: inherit;
  }
`;
export const PokemonName = styled.a`
  justify-self: start;
  grid-row: 3;
  grid-column: 1/2;
  font-size: 36px;
  height: fit-content;
  text-align: start;
`;
export const PropertiesContainer = styled.div`
  grid-row: 4;
  grid-column: 2/4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
