import styled from "styled-components";

export const DamageContainer = styled.div`
  grid-row: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 240px;
`;
export const DamageGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-around;
`;
export const TypeBox = styled.div`
  margin: 5px;
  padding: 2px 5px;
  border-radius: 10px;
`;
export const TypeBoxContainer = styled.div`
  height: 100%;
  width: 280px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
export const DamageMultiplier = styled.p`
  height: 100%;
  vertical-align: middle;
`;
