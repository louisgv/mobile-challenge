import LogOut from "./logout.svg"
import LeftArrow from "./arrow-left-circle.svg"
import RightArrow from "./arrow-right-circle.svg"
import Maximize from "./maximize.svg"
import Check from "./check.svg"
import Repeat from "./repeat-snap.svg"
import Snap from "./snap-max.svg"
import Search from "./search.svg"

import CrossCircle from "./x-circle.svg"
import MinusCircle from "./minus-circle.svg"

import Mail from "./mail-icon.svg"
import Camera from "./camera-icon.svg"

export const icons = {
  back: LeftArrow,
  next: RightArrow,
  signout: LogOut,
  maximize: Maximize,
  check: Check,
  repeat: Repeat,
  snap: Snap,
  search: Search,
  crossCircle: CrossCircle,
  minusCircle: MinusCircle,
  mail: Mail,
  camera: Camera
}

export type IconTypes = keyof typeof icons
