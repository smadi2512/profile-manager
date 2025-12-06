//The shape of SmartList state
export type SmartListState = {
  searchQuery: string;
  activeFilters: Partial<Record<string, string[]>>;
  pageIndex: number;
};

//The action of SmartList
export type SmartListAction =
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | {
      type: "SET_FILTER";
      payload: { key: string; value: string[] | undefined };
    }
  | { type: "RESET_FILTERS" }
  | { type: "SET_PAGE_INDEX"; payload: number }
  | { type: "RESET_ALL" };

// The default reducer logic
export function defaultSmartListReducer(
  state: SmartListState,
  action: SmartListAction
): SmartListState {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload, pageIndex: 0 };
    case "SET_FILTER":
      return {
        ...state,
        activeFilters: {
          ...state.activeFilters,
          [action.payload.key]: action.payload.value,
        },
        pageIndex: 0,
      };
    case "RESET_FILTERS":
      return { ...state, activeFilters: {}, pageIndex: 0 };
    case "SET_PAGE_INDEX":
      return { ...state, pageIndex: action.payload };
    case "RESET_ALL":
      return { searchQuery: "", activeFilters: {}, pageIndex: 0 };
    default:
      return state;
  }
}
