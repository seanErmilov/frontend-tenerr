export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SHOW_SEARCH_BAR = 'SHOW_SEARCH_BAR'
export const SHOW_CATEGORIES_BAR = 'SHOW_CATEGORIES_BAR'
export const HEADER_STICKY = 'HEADER_STICKY'


const initialState = {
  isLoading: false,
  showSearchBar: false,
  showCategoriesBar: false,
  headerSticky: false
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

    // header
    case HEADER_STICKY:
      return { ...state, headerSticky: action.headerSticky }
    default: return state
  }
}
