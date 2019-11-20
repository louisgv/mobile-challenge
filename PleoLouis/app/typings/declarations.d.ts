declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.StatelessComponent<SvgProps>;
  export default content;
}

declare type IconStyle = ImageStyle & TextStyle

declare type VisionResponse = {
  text: string
  bounding: {
    height: number
    width: number
    left: number
    top: number
  }
}