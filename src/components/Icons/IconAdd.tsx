import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IconAdd(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8a8 8 0 100 16 8 8 0 000-16z"
        fill="#3097E1"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 7a1 1 0 00-2 0v4H7a1 1 0 000 2h4v4a1 1 0 002 0v-4h4a1 1 0 000-2h-4V7z"
        fill="#3097E1"
      />
    </Svg>
  );
}

export default IconAdd;
