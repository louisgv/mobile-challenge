import * as React from "react"
import { TouchableOpacity, View, ViewStyle, Linking, TextStyle, ImageStyle } from "react-native"
import { viewPresets, textPresets } from "./expense-card.presets"
import { CardProps } from "./expense-card.props"
import { mergeAll, flatten } from "ramda"
import { spacing, color } from "../../theme"
import { TextField } from "../text-field"
import { Button } from "../button"
import { ExpenseDetail } from "./expense-detail"

import MailIcon from "./mail-icon.svg"
import CameraIcon from "./camera-icon.svg"

const EXPENSE_CONTAINER: ViewStyle = {
  margin: spacing[4],
  marginBottom: 54,
  padding: spacing[4],
  paddingBottom: spacing[0],
  borderColor: color.palette.hotpink,
  borderWidth: 1,
  borderRadius: 20,
}

const EXPENSE_TOP_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const DETAIL_CONTAINER: ViewStyle = {
  width: "80%",
}

const ACTION_CONTAINER: ViewStyle = {
  width: "15%",
  alignItems: "flex-end",
  justifyContent: "space-between",
}

const ACTION_BUTTON: ViewStyle = {
  width: 44,
  height: 44,
  // backgroundColor: color.transparent,
  // borderColor: color.palette.hotpink,
  // borderWidth: 1,
}

const ICON: ImageStyle & TextStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "90%",
  // color: color.palette.hotpink,
  color: color.palette.white,
}

/**
 * To display an expense item.
 *
 */
export function ExpenseCard({ data, onPressCamera, onSubmitComment }: CardProps) {
  const { email } = data.user
  const [draftComment, setDraftComment] = React.useState(data.comment)

  React.useEffect(() => {
    setDraftComment(data.comment)
  }, [data.comment])

  return (
    <View style={EXPENSE_CONTAINER}>
      <View style={EXPENSE_TOP_CONTAINER}>
        <View style={DETAIL_CONTAINER}>
          <ExpenseDetail data={data} />
        </View>
        <View style={ACTION_CONTAINER}>
          <Button style={ACTION_BUTTON} onPressOut={() => onPressCamera(data)}>
            <CameraIcon style={ICON} />
          </Button>
          <Button
            style={ACTION_BUTTON}
            onPressOut={() => {
              Linking.openURL(`mailto:${email}`)
            }}
          >
            <MailIcon style={ICON} />
          </Button>
        </View>
      </View>
      {/* 
      <Button
        onPressOut={() => {
          Linking.openURL(`mailto:${email}`)
        }}
        text="Mail"
      /> 
      */}

      <TextField
        multiline
        onBlur={() => onSubmitComment(draftComment)}
        onChangeText={value => setDraftComment(value)}
        value={draftComment}
        label="Comment"
        placeholder="Touch to add comment..."
      />
    </View>
  )
}
