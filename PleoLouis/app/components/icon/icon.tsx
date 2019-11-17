import * as React from "react"
import { View, ViewStyle } from "react-native"
import { icons, IconTypes } from "./icons"
import { IconPresetNames, iconPresets } from "./icon.presets"

import { mergeAll, flatten } from "ramda"

export interface IconProps {
  style?: IconStyle
  containerStyle?: ViewStyle
  icon?: IconTypes
  preset?: IconPresetNames
  inverted?: boolean
}

export const Icon: React.FC<IconProps> = ({
  style: styleOverride,
  icon,
  containerStyle,
  inverted,
  preset,
}) => {
  const iconStyle = mergeAll(
    flatten([
      iconPresets[preset] || iconPresets.primary,
      inverted || icon === "signout"
        ? {
            transform: [
              {
                rotateY: "180deg",
              },
            ],
          }
        : {},
      styleOverride,
    ]),
  )

  const Icon = icons[icon]

  return (
    <View style={containerStyle}>
      <Icon style={iconStyle} />
    </View>
  )
}
