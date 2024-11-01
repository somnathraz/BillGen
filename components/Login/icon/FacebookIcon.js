import React from 'react';

import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const FacebookIcon = () => {
  return (
    <Svg
      width={(height * 2) / 100}
      height={(height * 2) / 100}
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0_1120_3432)">
        <Path
          d="M12 23C18.3513 23 23.5 17.8513 23.5 11.5C23.5 5.14873 18.3513 0 12 0C5.64873 0 0.5 5.14873 0.5 11.5C0.5 17.8513 5.64873 23 12 23Z"
          fill="#3B5998"
        />
        <Path
          d="M14.8907 11.9502H12.8386V19.4679H9.72963V11.9502H8.25098V9.3082H9.72963V7.59852C9.72963 6.37591 10.3104 4.46143 12.8663 4.46143L15.1693 4.47106V7.03559H13.4983C13.2242 7.03559 12.8388 7.17253 12.8388 7.75575V9.31066H15.1623L14.8907 11.9502Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1120_3432">
          <Rect
            width={23}
            height={23}
            fill="white"
            transform="translate(0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default FacebookIcon;
