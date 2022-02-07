import React from "react";
import styled from "styled-components";

const NotAvailable = styled.div`
  grid-row: 3;
  grid-column: 1/4;
`;
export const OpponentsTeamUnavailable = () => {
  return (
    <NotAvailable>Your Opponents team has not been revealed yet</NotAvailable>
  );
};
