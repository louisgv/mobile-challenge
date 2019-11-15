import React from "react"

import { TextStyle, View, ViewStyle, ImageStyle, StyleSheet } from "react-native"
import { Button } from "../../components/button"
import { color, spacing } from "../../theme"
import { useStore } from "../../models/root-store"
import { Text } from "../../components/text"
import ArrowLeft from "./arrow-left-circle.svg"
import ArrowRight from "./arrow-right-circle.svg"
import CrossCircle from "./x-circle.svg"
import MinusCircle from "./minus-circle.svg"
import { observer, useComputed } from "mobx-react-lite"

const PAGE_INDEX_WRAPPER_CONTAINER: ViewStyle = {
  flex: 1,
  position: "absolute",
  bottom: 20,
  width: "100%",
  alignItems: "center",
  zIndex: 10,
}
const PAGE_INDEX_CONTAINER: ViewStyle = {
  flex: 1,
  width: 200,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}
const PAGE_INDEX: ViewStyle = {
  // flex: 1,
  backgroundColor: color.palette.hotpink,
  alignItems: "center",
  justifyContent: "center",
  width: 100,
  height: 44,
  borderRadius: 20,
}
const ACTION_BUTTON: ViewStyle = {
  width: 44,
  height: 44,
}
const ICON: ImageStyle & TextStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "90%",
  // color: color.palette.hotpink,
  color: color.palette.white,
}
const BUTTON_STYLE = StyleSheet.create({
  active: {
    ...ACTION_BUTTON,
    opacity: 1.0,
  },
  disabled: {
    ...ACTION_BUTTON,
    opacity: 0.5,
  },
})

export const PageIndexSwitcher = observer(() => {
  const { isFirstPage, isLastPage, fetching, pageIndex, pageTotal, getExpense } = useStore()
  const previousButtonStyle = useComputed(
    () => (isFirstPage ? BUTTON_STYLE.disabled : BUTTON_STYLE.active),
    [isFirstPage],
  )
  const nextButtonStyle = useComputed(
    () => (isLastPage ? BUTTON_STYLE.disabled : BUTTON_STYLE.active),
    [isLastPage],
  )

  return (
    <View style={PAGE_INDEX_WRAPPER_CONTAINER}>
      <View style={PAGE_INDEX_CONTAINER}>
        <Button
          style={previousButtonStyle}
          onPressOut={e => {
            if (fetching) return
            if (pageIndex > 0) getExpense(-1)
          }}
        >
          {fetching && <MinusCircle style={ICON} />}
          {isFirstPage && !fetching && <CrossCircle style={ICON} />}
          {!(isFirstPage || fetching) && <ArrowLeft style={ICON} />}
        </Button>

        <View style={PAGE_INDEX}>
          <Text preset="light">
            {pageIndex + 1}/{pageTotal + 1}
          </Text>
        </View>

        <Button
          style={nextButtonStyle}
          onPressOut={() => {
            if (fetching) return
            if (pageIndex < pageTotal) getExpense(1)
          }}
        >
          {fetching && <MinusCircle style={ICON} />}
          {isLastPage && !fetching && <CrossCircle style={ICON} />}
          {!(isLastPage || fetching) && <ArrowRight style={ICON} />}
        </Button>
      </View>
    </View>
  )
})
