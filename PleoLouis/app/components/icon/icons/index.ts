import LogOut from "./logout.svg"
import LeftArrow from "./arrow-left-circle.svg"

export const icons = {
  back: LeftArrow,
  signout: LogOut,
}

export type IconTypes = keyof typeof icons
