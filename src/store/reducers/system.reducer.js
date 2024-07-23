export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SHOW_SEARCH_BAR = 'SHOW_SEARCH_BAR'
export const SHOW_CATEGORIES_BAR = 'SHOW_CATEGORIES_BAR'


const initialState = {
  isLoading: false,
  showSearchBar: false,
  showCategoriesBar: false,
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    // loader
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }

    // search bar state
    case SHOW_SEARCH_BAR:
      return { ...state, showSearchBar: action.showSearchBar }

    // categories bar
    case SHOW_CATEGORIES_BAR:
      return { ...state, showCategoriesBar: action.showCategoriesBar }
    default: return state
  }
}
