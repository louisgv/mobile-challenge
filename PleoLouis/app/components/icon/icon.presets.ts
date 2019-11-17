import { color, spacing } from "../../theme"

/**
 * All text will start off looking like this.
 */

const BASE_ICON: IconStyle = {
  resizeMode: "contain",
  maxWidth: 20,
  color: color.palette.black,
  alignSelf: "center",
}

export const iconPresets = {
  primary: { ...BASE_ICON } as IconStyle,

  button: { ...BASE_ICON, maxWidth: 44, color: color.palette.white } as IconStyle,

  action: { ...BASE_ICON, marginVertical: spacing[5], maxWidth: "90%", color: color.palette.white },
}

/**
 * A list of preset names.
 */
export type IconPresetNames = keyof typeof iconPresets
