import styled from "styled-components";
import React from "react";
interface PokeBallInterface {
  size: number;
  background: string;
  lineColor: string;
}
interface PokeBallContainerInterface extends PokeBallInterface {
  lineWidth: number;
}
const CenterSquare = styled.div``;

const Line = styled.div``;
const CenterLine = styled(Line)``;
const Pixel = styled.div``;
const CornerPixel = styled(Pixel)``;
const VerticalLine = styled(Line)``;
const CenterVerticalLine = styled(Line)``;
const HorizontalLine = styled(Line)``;
const LeftLine = styled(VerticalLine)`
  left: 0;
`;
const RightLine = styled(VerticalLine)`
  right: 0;
`;
const TopLine = styled(HorizontalLine)`
  top: 0;
`;
const BottomLine = styled(HorizontalLine)`
  bottom: 0;
`;
const LineBorder1 = styled.div``;
const LineBorder2 = styled.div``;
const PixelBorder = styled(Pixel)``;
const PokeballContainer = styled.div<PokeBallContainerInterface>`
  background: ${(props) => props.background};
  height: ${(props) => props.size}px;

  width: ${(props) => props.size}px;
  position: relative;
  * {
    position: absolute;
    background: ${(props) => props.lineColor};
  }
  ${VerticalLine} {
    width: ${(props) => props.lineWidth}px;
    height: ${(props) => props.size / 3}px;
    top: ${(props) => props.size / 3}px;
  }
  ${HorizontalLine} {
    height: ${(props) => props.lineWidth}px;
    width: ${(props) => props.size / 3}px;
    left: ${(props) => props.size / 3}px;
  }
  ${CornerPixel} {
    background: ${(props) => props.background};
    top: ${(props) => props.size / 3}px;
    left: ${(props) => props.size / 3}px;
  }
  ${CenterLine} {
    height: ${(props) => props.lineWidth}px;
    width: ${(props) => props.size}px;
    top: ${(props) => props.size / 2 - props.lineWidth / 2}px;
  }
  ${CenterVerticalLine} {
    width: ${(props) => props.lineWidth}px;
    height: ${(props) => props.size}px;
    left: ${(props) => props.size / 2 - props.lineWidth / 2}px;
  }
  ${Pixel} {
    height: ${(props) => props.lineWidth}px;
    width: ${(props) => props.lineWidth}px;
  }

  ${CenterSquare} {
    width: ${(props) => props.size / 3 - props.lineWidth * 2}px;
    height: ${(props) => props.size / 3 - props.lineWidth * 2}px;
    top: ${(props) => props.size / 3}px;
    left: ${(props) => props.size / 3}px;
    border: ${(props) => props.lineColor} solid ${(props) => props.lineWidth}px;
    background: ${(props) => props.background};
    z-index: 1;
  }
  ${LineBorder1} {
    width: ${(props) => props.size / 6 - props.lineWidth / 2}px;
    height: ${(props) => props.lineWidth}px;
    left: ${(props) => props.size / 6 + props.lineWidth / 2}px;
    top: ${(props) => props.lineWidth}px;
  }
  ${LineBorder2} {
    width: ${(props) => props.lineWidth}px;
    height: ${(props) => props.size / 6 - props.lineWidth / 2}px;
    top: ${(props) => props.size / 6 + props.lineWidth / 2}px;
    left: ${(props) => props.lineWidth}px;
  }
  ${PixelBorder} {
    left: ${(props) => props.size / 6 - props.lineWidth / 2}px;
    top: ${(props) => props.size / 6 - props.lineWidth / 2}px;
  }
`;
interface Rotation {
  rotate: number;
}
const OverLayContainer = styled.div`
  height: 100%;
  width: 100%;
  background: transparent;
`;
const RotatingOverLayContainer = styled(OverLayContainer)<Rotation>`
  transform: ${(props) => `rotate(${props.rotate}deg)`};
  z-index: 2;
`;
const Border = ({ rotate }: Rotation) => {
  return (
    <RotatingOverLayContainer rotate={rotate}>
      <PixelBorder />
      <LineBorder1 />
      <LineBorder2 />
    </RotatingOverLayContainer>
  );
};
const Corner = ({ rotate }: Rotation) => {
  return (
    <RotatingOverLayContainer rotate={rotate}>
      <CornerPixel />
    </RotatingOverLayContainer>
  );
};
const Center = () => {
  return (
    <>
      <Corner rotate={0} />
      <Corner rotate={90} />
      <Corner rotate={180} />
      <Corner rotate={270} />
      <CenterLine />
      <CenterSquare />
      <CenterVerticalLine />
    </>
  );
};
export const OldSchoolPokeball = ({
  size,
  background,
  lineColor,
}: PokeBallInterface) => {
  const lineWidth = size / 15;
  return (
    <PokeballContainer
      size={size}
      lineWidth={lineWidth}
      lineColor={lineColor}
      background={background}
    >
      <LeftLine />
      <RightLine />
      <TopLine />
      <BottomLine />
      <Center />
      <Border rotate={0} />
      <Border rotate={90} />
      <Border rotate={180} />
      <Border rotate={270} />
    </PokeballContainer>
  );
};
