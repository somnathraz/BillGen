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
    secondary: '#CDE7E2',
    lightSecondary: '#E1F5F1',
    lightSecondaryBorder: '#A2DDD1',
    lightAccent4: '#F9F4DA',
    inactive: '#d1d1d1',
    accent1: '#7197BF',
    accent2: '#F0F0F0',
    accent3: '#F9F4DA',
    accent3Border: '#FFF2AE',
    accent4: '#DAFFF8',
    accent5: '#E4EEFF',
    accent5Border: '#CBDAF9',
    greyBackground: '#f7f7f7',
    whiteFont: '#ffff',
    white: '#ffffff',
    black: '#000000',
    lightBackground: '#F5F8FF',
    headingText: '#334155',
    descText: '#484848',
    error: '#ed4337',
    lightError: '#ff4a54',
    errorbg: '#ffe1de',
    successBackground: '#CFF5E1',
    success: '#497D51',
    lightAccent: '#F5F8FF',
    borderColor: '#7D4975',
    lightBorderColor: '#CBD5E1',
  },
};

export default Theme;
