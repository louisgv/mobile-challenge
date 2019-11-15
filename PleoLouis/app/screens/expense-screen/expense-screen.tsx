import React, { useMemo } from "react"
import { ViewStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../components/screen"
import { Header } from "../../components/header"

import { PageIndexSwitcher } from "./page-index-switcher"
import { ExpenseList } from "./expense-list"

import { FilterSearch } from "./filter-search"

const FULL: ViewStyle = { flex: 1 }

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
