import React, { useState } from "react"
import { View, ViewStyle, Linking, TextStyle, ImageStyle, Image } from "react-native"
import { CardProps } from "./expense-card.props"
import { spacing, color } from "../../theme"
import { TextField } from "../text-field"
import { Button } from "../button"
import { ExpenseDetail } from "./expense-detail"

import MailIcon from "./mail-icon.svg"
import CameraIcon from "./camera-icon.svg"

import Carousel from "react-native-snap-carousel"

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

const CAROUSEL_CONTAINER: ViewStyle = {
  paddingBottom: spacing[4],
  alignItems: "center"
}

const ICON: ImageStyle & TextStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "90%",
  // color: color.palette.hotpink,
  color: color.palette.white,
}

const IMAGE: ImageStyle = {
  width: "100%",
  height: 100,
  borderRadius: 15,
}

/**
 * To display an expense item.
 *
 */
export function ExpenseCard({ data, baseUrl, onPressCamera, onSubmitComment }: CardProps) {
  const { receipts } = data
  const { email } = data.user
  const [draftComment, setDraftComment] = useState(data.comment)

  const [cardWidth, setCardWidth] = useState(360)

  React.useEffect(() => {
    setDraftComment(data.comment)
  }, [data.comment])

  return (
    <View style={EXPENSE_CONTAINER} onLayout={e => setCardWidth(e.nativeEvent.layout.width)}>
      {receipts.length > 0 && (
        <View style={CAROUSEL_CONTAINER}>
          <Carousel
            data={[...receipts]}
            sliderWidth={cardWidth * 0.9}
            itemWidth={cardWidth* 0.9}
            renderItem={({ item, index }) => (
              <Image
                style={IMAGE}
                source={{
                  uri: `${baseUrl}${item.url}`,
                }}
              />
            )}
          />
        </View>
      )}

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
