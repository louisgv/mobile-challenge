import * as React from "react"
import {
  SafeAreaView,
  TextStyle,
  View,
  ViewStyle,
  FlatList,
  ImageStyle,
  StyleSheet,
} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../components/screen"
import { Button } from "../../components/button"
import { Header } from "../../components/header"
import { color, spacing } from "../../theme"
import { useStore } from "../../models/root-store"
import { Text } from "../../components/text"
import { ExpenseCard } from "../../components/expense-card"
import { Expense } from "../../models/expense"
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view"

import ArrowLeft from "./arrow-left-circle.svg"
import ArrowRight from "./arrow-right-circle.svg"
import CrossCircle from "./x-circle.svg"
import MinusCircle from "./minus-circle.svg"

import { useObservable, useObserver, observer, useComputed } from "mobx-react-lite"

const FULL: ViewStyle = { flex: 1 }

const EXPENSE_LIST: ViewStyle = {
  flex: 1,
  flexGrow: 1,
}

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

const PageIndexSwitcher = observer(() => {
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
          {isFirstPage && <CrossCircle style={ICON} />}
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
          {isLastPage && <CrossCircle style={ICON} />}
          {fetching && <MinusCircle style={ICON} />}
          {!(isLastPage || fetching) && <ArrowRight style={ICON} />}
        </Button>
      </View>
    </View>
  )
})

const ExpenseList: React.FC<ExpenseScreenProps> = observer(props => {
  const goToCameraScreen = React.useMemo(
    () => expenseData => props.navigation.navigate("camera", { expenseData }),
    [props.navigation],
  )
  const { expenses, setComment } = useStore()

  return (
    <SafeAreaView style={EXPENSE_LIST}>
      {expenses.length > 0 && (
        <KeyboardAwareFlatList
          data={expenses}
          contentContainerStyle={{
            paddingBottom: 36,
          }}
          keyExtractor={p => p.id}
          renderItem={({ item }) => (
            <ExpenseCard
              data={item as Expense}
              onSubmitComment={comment => {
                setComment(item, comment)
              }}
              onPressCamera={goToCameraScreen}
            />
          )}
        />
      )}
    </SafeAreaView>
  )
})

export interface ExpenseScreenProps extends NavigationScreenProps<{}> {}

export const ExpenseScreen: React.FC<ExpenseScreenProps> = props => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])

  // const [pageIndex, setPageIndex] = React.useState(Math.floor(expenses[0].index / pageTotal))

  return (
    <Screen style={FULL}>
      <Header leftIcon="signout" onLeftPress={goBack} headerText="Expenses" />

      <PageIndexSwitcher />

      <ExpenseList {...props} />
    </Screen>
  )
}
