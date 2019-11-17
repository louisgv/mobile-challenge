import { ViewStyle } from "react-native"
import { IconTypes } from "./icons"
import { IconPresetNames } from "./icon.presets"

export interface IconProps {
  /**
   * Style overrides for the icon image
   */
  style?: IconStyle

  /**
   * Style overrides for the icon container
   */

  containerStyle?: ViewStyle

  /**
   * The name of the icon
   */

  icon?: IconTypes

  preset?: IconPresetNames
}
