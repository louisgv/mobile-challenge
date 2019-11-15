import { GeneralApiProblem } from "./api-problem"

export interface Expense {
  id: string
  amount: {
    value: string
    currency: string
  }
  date: string
  merchant: string
  receipts: []
  comment: string
  category: string
  user: {
    first: string
    last: string
    email: string
  }
  index: number
}

export type GetExpensesResult = { kind: "ok"; total: number; expenses: Expense[] } | GeneralApiProblem

export type GetExpenseResult = { kind: "ok"; expense: Expense } | GeneralApiProblem
