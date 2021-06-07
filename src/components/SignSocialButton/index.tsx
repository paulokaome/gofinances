import React from "react";
import { RectButtonProperties } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { Button, ImageContainer, Text } from "./styles";

interface Props extends RectButtonProperties {
  title: string;
  svg: React.FC<SvgProps>;
  onPress: () => void;
}

export function SignSocialButton({ title, svg: Svg, onPress, ...rest }: Props) {
  return (
    <Button {...rest} onPress={onPress}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Text>{title}</Text>
    </Button>
  );
}
