import {Platform} from 'react-native';

const fontFamily = fontName => {
  return Platform.select({
    ios: fontName.replace(/_/g, ' '),
    android: fontName, // Use the original name for Android
  });
};

const Theme = {
  fonts: {
    regular: {
      fontFamily: fontFamily('DMSans_Regular'),
    },
    medium: {
      fontFamily: fontFamily('DMSans_Medium'),
    },
    light: {
      fontFamily: fontFamily('DMSans_Light'),
    },
    black: {
      fontFamily: fontFamily('DMSans_Black'),
    },
    extraBold: {
      fontFamily: fontFamily('DMSans_ExtraBold'),
    },
    bold: {
      fontFamily: fontFamily('DMSans_Bold'),
    },
    semiBold: {
      fontFamily: fontFamily('DMSans_SemiBold'),
    },
  },
  colors: {
    primary: '#304051',
    secondary: '#E9EAEF',
    inactive: '#d1d1d1',
    accent1: '#F8EED4',
    accent2: '#D4ECCD',
    accent3: '#CDE3F3',
    black: '#000000',
    white: '#ffffff',

    lightBorderColor: '#CBD5E1',
  },
};

export default Theme;
