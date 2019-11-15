import * as React from "react"

import { View, TextStyle, ViewStyle } from "react-native"
import { Text } from "../text"
import { CardProps } from "./expense-card.props"

export const DATE_TEXT: TextStyle = {
  fontSize: 12,
  fontStyle: "italic",
}

export const PAYMENT_CONTAINER: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}

const AMOUNT_TEXT_BASE: TextStyle = {
  fontSize: 45,
}

const AMOUNT_VALUE_TEXT: TextStyle = {
  ...AMOUNT_TEXT_BASE,
  fontWeight: "bold",
}

const AMOUNT_CURRENCY_TEXT: TextStyle = {
  ...AMOUNT_TEXT_BASE,
}

const TX_TEXT_CONTAINER: ViewStyle = {
  ...PAYMENT_CONTAINER,
}

const TX_TEXT_BASE: TextStyle = {
  fontSize: 18,
}

const TX_USER_TEXT: TextStyle = {
  ...TX_TEXT_BASE,
  width: "30%",
}

const TX_PAID_TEXT: TextStyle = {
  ...TX_TEXT_BASE,
  fontWeight: "bold",
}

const TX_MERCHANT_TEXT_CONTAINER: ViewStyle = {
  width: "30%",
  justifyContent: "flex-end",
  alignItems: "flex-end",
}
const TX_MERCHANT_TEXT: TextStyle = {
  ...TX_TEXT_BASE,
}

const parseAmountValue = v => {
  const n = parseFloat(v) || 0
  if (n > 10e6) {
    return (n / 10e6).toFixed(5) + "M"
  }
  if (n > 10e5) {
    return (n / 10e6).toFixed(1)
  }
  return n.toFixed(2)
}

export const ExpenseDetail = ({ data }: CardProps) => {
  const { first, last } = data.user
  const date = new Date(data.date)
  return (
    <>
      <Text style={DATE_TEXT}>{date.toLocaleDateString()}</Text>

      <View style={TX_TEXT_CONTAINER}>
        <Text style={TX_USER_TEXT} numberOfLines={1}>
          {first}, {last[0]}.
        </Text>
        <Text style={TX_PAID_TEXT} tx="expenseScreen.pay" />
        <View style={TX_MERCHANT_TEXT_CONTAINER}>
          <Text style={TX_MERCHANT_TEXT} numberOfLines={1}>
            {data.merchant}
          </Text>
        </View>
      </View>

      <View style={PAYMENT_CONTAINER}>
        <Text style={AMOUNT_VALUE_TEXT}>{parseAmountValue(data.amount.value)}</Text>
        <Text style={AMOUNT_CURRENCY_TEXT}>{data.amount.currency}</Text>
      </View>
    </>
  )
}
