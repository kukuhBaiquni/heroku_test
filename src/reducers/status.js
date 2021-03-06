let initialState = {
  loading: false,
  error: false,
  fetching: true,
  fetchError: false
}

export default function status(state = initialState, action){
  switch (action.type) {

    //============= POST ================

    case 'INITIAL_PROCESS':
    initialState.loading = true
    return initialState

    case 'PROCESS_END':
    initialState.loading = false
    return initialState

    case 'PROCESS_FAIL':
    initialState.error = true
    return initialState

    //============ GET ================

    case 'REQUEST_START':
    initialState.fetching = true
    return initialState

    case 'GET_END':
    initialState.fetching = false
    return initialState

    case 'GET_FAIL':
    initialState.fetchError = true
    return initialState

    default:
    return state
  }
}
