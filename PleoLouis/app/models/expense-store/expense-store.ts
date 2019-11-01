import { Instance, SnapshotOut, types } from "mobx-state-tree"

const UserModel = types.model().props({
  first: types.string,
  last: types.string,
  email: types.string,
})

const AmountModel = types.model().props({
  value: types.string,
  currency: types.string
})

export const ExpenseModel = types.model().props({
  id: types.number,
  amount: AmountModel,
  date: types.string,
  merchant: types.string,
  receipts: types.array(types.string),
  comment: types.string,
  category: types.string,
  user: UserModel,
  index: types.number
})

/**
 * A ExpenseStore model.
 */
export const ExpenseStoreModel = types.model("ExpenseStore").props({


})

/**
 * The ExpenseStore instance.
 */
export interface ExpenseStore extends Instance<typeof ExpenseStoreModel> {}

/**
 * The data of a ExpenseStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof ExpenseStoreModel> {}
