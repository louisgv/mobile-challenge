import React, { useState } from "react"
import { View, ViewStyle, Linking, ImageStyle, Image, TouchableOpacity } from "react-native"
import { CardProps } from "./expense-card.props"
import { spacing, color } from "../../theme"
import { TextField } from "../text-field"
import { Button } from "../button"
import { ExpenseDetail } from "./expense-detail"

import Carousel, { Pagination } from "react-native-snap-carousel"
import { Icon } from "../icon"

import { Popup } from "../../services/native/popup"

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
  alignItems: "center",
}

const IMAGE: ImageStyle = {
  width: "100%",
  height: 100,
  borderRadius: 15,
}

const PAGINATION_CONTAINER: ViewStyle = {
  borderTopRightRadius: 15,
  borderTopLeftRadius: 15,
  position: "absolute",
  backgroundColor: "rgba(0,0,0, 0.7)",
  zIndex: 2,
  bottom: spacing[4],
  minHeight: 10,
  height: 10,
  paddingVertical: 5,
  justifyContent: "space-around",
  width: "30%",
}

const PAGINATION_DOT_CONTAINER: ViewStyle = {
  padding: 0,
  margin: 0,
  height: 1,
  minHeight: 0,
  maxHeight: 0,
}

const PAGINATION_DOT: ViewStyle = {
  height: 8,
  width: 5,
  borderRadius: 5,
  marginHorizontal: spacing[4],
  backgroundColor: "rgba(255, 255, 255, 0.92)",
}

/**
 * To display an expense item.
 *
 */
export function ExpenseCard({ data, baseUrl, onPressCamera, onSubmitComment }: CardProps) {
  const { receipts } = data
  const { email } = data.user
  const [draftComment, setDraftComment] = useState(data.comment)

  const [activeSlide, setActiveSlide] = useState(0)

  const [cardWidth, setCardWidth] = useState(360)

  React.useEffect(() => {
    setDraftComment(data.comment)
  }, [data.comment])

  return (
    <View style={EXPENSE_CONTAINER} onLayout={e => setCardWidth(e.nativeEvent.layout.width)}>
      {receipts.length > 0 && (
        <View style={CAROUSEL_CONTAINER}>
          <Pagination
            dotContainerStyle={PAGINATION_DOT_CONTAINER}
            containerStyle={PAGINATION_CONTAINER}
            dotStyle={PAGINATION_DOT}
            dotsLength={receipts.length}
            activeDotIndex={activeSlide}
            inactiveDotStyle={{
              margin: 0,
              padding: 0,
              // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <Carousel
            data={[...receipts]}
            sliderWidth={cardWidth * 0.9}
            itemWidth={cardWidth * 0.9}
            onSnapToItem={setActiveSlide}
            renderItem={({ item }) => (
              <TouchableOpacity
                onLongPress={() => {
                  // Toast.show('Awesome', Toast.SHORT)
                  Popup.popImage(`${baseUrl}${item.url}`)
                }}
              >
                <Image
                  style={IMAGE}
                  source={{
                    uri: `${baseUrl}${item.url}`,
                  }}
                />
              </TouchableOpacity>
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
            <Icon preset="action" icon="camera" />
          </Button>
          <Button
            style={ACTION_BUTTON}
            onPressOut={() => {
              Linking.openURL(`mailto:${email}`)
            }}
          >
            <Icon preset="action" icon="mail" />
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
