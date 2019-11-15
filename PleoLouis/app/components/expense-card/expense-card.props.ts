import { TouchableOpacityProps } from "react-native"
import { Expense } from "../../models/expense"

export interface CardProps extends TouchableOpacityProps  {
  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode

  data?: Expense

  onPressCamera?: Function

  onSubmitComment?: Function
}