import * as React from "react"
import { View, ImageStyle, TextStyle } from "react-native"
import { IconProps } from "./icon.props"
import { icons } from "./icons"
import { color } from "../../theme"

const ROOT: ImageStyle & TextStyle = {
  resizeMode: "contain",
  maxWidth: 20,
  color: color.palette.black,
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props
  const style: ImageStyle = {
    ...ROOT,
    ...styleOverride,
    ...(icon === "signout"
      ? {
          transform: [
            {
              rotateY: "180deg",
            },
          ],
        }
      : {}),
  }

  const Icon = icons[icon]

  return (
    <View style={containerStyle}>
      <Icon style={style} />
    </View>
  )
}
