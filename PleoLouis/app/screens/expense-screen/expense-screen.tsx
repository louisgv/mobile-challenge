import React, { useState, useMemo } from "react"
import { ViewStyle, TextInput, View, TextStyle, ImageStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../components/screen"
import { Header } from "../../components/header"

import { PageIndexSwitcher } from "./page-index-switcher"
import { ExpenseList } from "./expense-list"

import SearchIcon from "./search.svg"
import { color, spacing } from "../../theme"

const FULL: ViewStyle = { flex: 1 }

const FILTER_INPUT_CONTAINER: ViewStyle = {
  width: "20%",
  flexDirection:"row"
}

const FILTER_INPUT: ViewStyle = {}

const ICON: TextStyle & ImageStyle = {
  alignSelf: "center",
  maxWidth: 20,
  color: color.palette.black,
}

const FilterSearch = () => {
  const [inputWidth, setInputWidth] = useState("20%")

  return (
    <View style={FILTER_INPUT_CONTAINER}>
      <SearchIcon style={ICON} />
      <TextInput style={FILTER_INPUT} placeholder="Filter" />
    </View>
  )
}

export interface ExpenseScreenProps extends NavigationScreenProps<{}> {}

export const ExpenseScreen: React.FC<ExpenseScreenProps> = props => {
  const goBack = useMemo(() => () => props.navigation.goBack(null), [props.navigation])

  return (
    <Screen style={FULL}>
      <Header
        leftIcon="signout"
        onLeftPress={goBack}
        headerTx="expenseScreen.title"
        rightChildren={<FilterSearch />}
      />

      <PageIndexSwitcher />

      <ExpenseList {...props} />
    </Screen>
  )
}
