import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
import { ExpenseModel, ExpenseSnapshot } from "../expense"
import { withEnvironment } from "../extensions"

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model("RootStore")
  .props({
    navigationStore: types.optional(NavigationStoreModel, {}),
    expenses: types.array(ExpenseModel),
    pageTotal: types.optional(types.number, 0),
    pageIndex: types.optional(types.number, 0),
    fetching: types.optional(types.boolean, false),
    filterQuery: types.optional(types.string, ""),
  })
  .extend(withEnvironment)
  .views(self => ({
    get isFirstPage() {
      return self.pageIndex === 0
    },
    get isLastPage() {
      return self.pageIndex === self.pageTotal
    },
  }))
  .actions(self => ({
    setExpenses: (expenses: ExpenseSnapshot[]) => {
      self.expenses.replace(expenses as any)
    },
    setComment: (expense, comment) => {
      const { api } = self.environment
      api.setExpenseComment(expense.id, comment)
    },
    addReceipt: (expense, imageData) => {
      const { api } = self.environment
      return api.addReceiptImage(expense.id, imageData)
    },
    setPageIndex: (pageIndex = 0) => {
      self.pageIndex = pageIndex
    },
    setPageTotal: (pageTotal = 0) => {
      self.pageTotal = pageTotal
    },
    setFetching: fetching => {
      self.fetching = fetching
    },
    setFilterQuery: (query = "") => {
      self.filterQuery = query.toLowerCase()
    },
  }))
  .actions(self => ({
    getExpense: async (offset = 0) => {
      const itemPerPage = 25
      const { api } = self.environment
      const newPageIndex = self.pageIndex + offset

      self.setFetching(true)
      const expensesResult = await api.getExpenses(newPageIndex * itemPerPage)
      self.setFetching(false)

      if (expensesResult.kind === "ok") {
        self.setPageIndex(newPageIndex)
        self.setPageTotal(Math.floor(expensesResult.total / itemPerPage))
        self.setExpenses(expensesResult.expenses)
      }
    },
  }))
  .actions(self => ({
    refresh: async () => {
      self.getExpense(0)
    },
    init: async () => {
      self.getExpense(0)
    },
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
