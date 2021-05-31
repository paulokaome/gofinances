import React from "react";
import { RectButtonProperties } from "react-native-gesture-handler";

import { Container, Title } from "./styles";

interface Props extends RectButtonProperties {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress, ...rest }: Props) {
  return (
    <Container {...rest} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
}
