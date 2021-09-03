import React from "react";
import styled from "styled-components";
const OuterBox = styled.div`
  width: 100%;
  grid-column: 1/4;
  grid-row: 3/4;
  border: 5px solid black;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const InnerBox = styled.div`
  width: 550px;
  height: 240px;
  display: grid;
  font-size: 1.3rem;
  border: 5px solid black;
  align-items: center;
  justify-content: center;
`;
const NotAvailable = styled.div``;
export const OpponentsTeamUnavailable = () => {
  return (
    <OuterBox>
      <InnerBox>
        <NotAvailable>
          Your Opponents team has not been revealed yet
        </NotAvailable>
      </InnerBox>
    </OuterBox>
  );
};
