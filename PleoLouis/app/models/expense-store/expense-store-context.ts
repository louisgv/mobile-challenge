import { createContext, useContext } from "react"
import { ExpenseStore } from "./expense-store"

/**
 * Create a context we can use to
 * - Provide access to our stores from our root component
 * - Consume stores in our screens (or other components, though it's
 *   preferable to just connect screens)
 */
const ExpenseStoreContext = createContext<ExpenseStore>({} as ExpenseStore)

/**
 * The provider our root component will use to expose the root store
 */
export const RootStoreProvider = ExpenseStoreContext.Provider

/**
 * A hook that screens can use to gain access to our stores, with
 * `const { someStore, someOtherStore } = useStores()`,
 * or less likely: `const rootStore = useStores()`
 */
export const useStores = () => useContext(ExpenseStoreContext)
