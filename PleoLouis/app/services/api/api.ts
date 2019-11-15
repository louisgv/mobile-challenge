import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets all availble expense.
   */
  async getExpenses(offset = 0, limit = 25): Promise<Types.GetExpensesResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      `/expenses?offset=${offset}&limit=${limit}`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawExpenses = response.data

      return { kind: "ok", ...rawExpenses } as Types.GetExpensesResult
    } catch {
      return { kind: "bad-data" }
    }
  }

  async setExpenseComment(id: string, comment: string) {
    await this.apisauce.post(`/expenses/${id}`, {
      comment,
    })
  }

  /**
   * Gets a single expense by ID
   */

  async getExpense(id: string): Promise<Types.GetExpenseResult> {
    // make the api call
    // const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // // the typical ways to die when calling an api
    // if (!response.ok) {
    //   const problem = getGeneralApiProblem(response)
    //   if (problem) return problem
    // }

    // // transform the data into the format we are expecting
    // try {
    //   const resultUser: Types.Expense = {
    //     id: response.data.id,
    //     name: response.data.name,
    //   }
    //   return { kind: "ok", expense: resultUser }
    // } catch {
    //   return { kind: "bad-data" }
    // }
    return {
      kind: "unknown",
      temporary: true,
    }
  }
}
