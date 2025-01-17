import React, { useMemo } from "react"

import { SafeAreaView, ViewStyle } from "react-native"
import { useStore } from "../../models/root-store"
import { ExpenseCard } from "../../components/expense-card"
import { Expense } from "../../models/expense"
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view"
import { observer } from "mobx-react-lite"
import { ExpenseScreenProps } from "./expense-screen"

const EXPENSE_LIST: ViewStyle = {
  flex: 1,
  flexGrow: 1,
}

export const ExpenseList: React.FC<ExpenseScreenProps> = observer(props => {
  const goToCameraScreen = useMemo(
    () => expenseData => props.navigation.navigate("camera", { expenseData }),
    [props.navigation],
  )
  const { expenses, setComment, environment, filterQuery } = useStore()

  return (
    <SafeAreaView style={EXPENSE_LIST}>
      {expenses.length > 0 && (
        <KeyboardAwareFlatList
          data={expenses.filter(
            e =>
              filterQuery.length === 0 ||
              [
                e.comment,
                e.user.email,
                e.user.first,
                e.user.last,
                e.merchant,
                e.amount.value.toString(),
                e.amount.currency.toString(),
              ].filter(s => s.toLowerCase().includes(filterQuery.toLowerCase())).length > 0,
          )}
          contentContainerStyle={{
            paddingBottom: 36,
          }}
          keyExtractor={p => p.id}
          renderItem={({ item }) => (
            <ExpenseCard
              baseUrl={environment.api.config.url}
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
