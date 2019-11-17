import React, { useState, useRef } from "react"
import { ViewStyle, TextInput, View } from "react-native"

import { Button } from "../../components/button"
import { translate } from "../../i18n"
import { useStore } from "../../models/root-store"
import { Icon } from "../../components/icon"

const FILTER_INPUT_CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignContent: "flex-end",
  justifyContent: "flex-end",
}
const FILTER_INPUT: ViewStyle = {
  width: "100%",
}

export const FilterSearch = () => {
  const inputRef = useRef(null)
  const [inputWidth, setInputWidth] = useState("0%")
  const [draftFilterQuery, setDraftFilterQuery] = useState("")
  const [containerWidth, setContainerWidth] = useState<string | number>(20)
  const { setFilterQuery } = useStore()
  const openInput = () => {
    if (inputRef) {
      inputRef.current.focus()
    }
    setContainerWidth("30%")
    setInputWidth("100%")
  }
  return (
    <View
      style={[
        FILTER_INPUT_CONTAINER,
        {
          width: containerWidth,
        },
      ]}
    >
      <Button preset="link" onPressOut={openInput}>
        <Icon icon="search" />
      </Button>
      <TextInput
        ref={inputRef}
        value={draftFilterQuery}
        onChangeText={v => setDraftFilterQuery(v)}
        onFocus={openInput}
        onBlur={() => {
          setContainerWidth(20)
          setInputWidth("0%")
          setFilterQuery(draftFilterQuery)
        }}
        style={[
          FILTER_INPUT,
          {
            width: inputWidth,
          },
        ]}
        placeholder={translate("expenseScreen.filter")}
      />
    </View>
  )
}
