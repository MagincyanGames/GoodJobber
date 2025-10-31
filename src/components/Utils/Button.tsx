import { useState } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { EmptyAction } from '../../Utiles';

interface ButtonProps {
  OnTouchEnd?: () => void;
  OnTouchStart?: () => void;
  style?: StyleProp<TextStyle>;
  text?: string;
}

export default function Button({
  text,
  style,
  OnTouchStart = EmptyAction,
  OnTouchEnd = EmptyAction,
}: ButtonProps) {
  const [buttonIsHover, setButtonIsHover] = useState(false);

  function getButtonNormalStyle() {
    return styles.button;
  }

  function getButtonHoverStyle() {
    return styles.button_hover;
  }

  function getButtonStyle() {
    return buttonIsHover ? getButtonHoverStyle() : getButtonNormalStyle();
  }

  return (
    <View
      style={{ ...getButtonStyle(), ...style }}
      onTouchStart={() => {
        OnTouchStart();
        setButtonIsHover(true);
      }}
      onTouchEnd={() => {
        setButtonIsHover(false);
        OnTouchEnd();
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          textAlignVertical: 'center',
        }}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 70,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  button_hover: {
    width: 150,
    height: 70,
    borderRadius: 15,
    backgroundColor: '#dddddd',
  },
});
