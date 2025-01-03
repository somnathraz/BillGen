import {Platform} from 'react-native';

const fontFamily = fontName => {
  return Platform.select({
    ios: fontName.replace(/_/g, '-'),
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
    primary: '#304051', // Retaining your primary dark navy/gray for main elements
    secondary: '#E9EAEF', // Retaining light gray for secondary elements
    inactive: '#d1d1d1', // Neutral for inactive states or placeholders
    accent1: '#F8EED4', // Soft peach (already great for subtle highlights)
    accent2: '#D4ECCD', // Mint green (calming and fresh)
    accent3: '#CDE3F3', // Powder blue (modern and refreshing)

    // New suggested pastel colors based on your images:
    pastelGreen: '#A8D5BA', // Gentle green for backgrounds or success messages
    pastelYellow: '#FFF5BA', // Soft yellow for highlights or cards
    pastelPink: '#F7BEC0', // Blush pink for accentuating small elements
    pastelBlue: '#B2DFFC', // Powdery blue for calming backgrounds
    pastelLavender: '#D6CDEA', // Light lavender for elegant secondary backgrounds

    // Existing essentials:
    black: '#000000', // For deep contrast
    white: '#ffffff', // Clean, minimal backgrounds
    grey: '#8D8D8D', // For secondary text or placeholder text
  },
};

export default Theme;
