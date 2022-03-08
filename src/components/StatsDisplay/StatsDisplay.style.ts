import styled from 'styled-components';
export const StatsContainer = styled.div`
  grid-row: 2/4;
  grid-column: 2/4;
  width: 250px;
  display: flex;
  /* justify-self: end; */
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* border: 3px solid black; */
  flex-wrap: wrap;
  font-size: 1.2em;
  height: 70px;
`;
export const StatBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60px;
`;
export const StatName = styled.div``;
export const StatValue = styled.div``;
