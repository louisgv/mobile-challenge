import { types } from "mobx-state-tree"

const UserModel = types.model().props({
  first: types.string,
  last: types.string,
  email: types.string,
})

const AmountModel = types.model().props({
  value: types.string,
  currency: types.string,
})

export const ExpenseModel = types.model().props({
  id: types.string,
  amount: AmountModel,
  date: types.string,
  merchant: types.string,
  receipts: types.array(types.string),
  comment: types.string,
  category: types.string,
  user: UserModel,
  index: types.number,
})

export type Expense = typeof ExpenseModel.Type

export type ExpenseSnapshot = typeof ExpenseModel.SnapshotType
