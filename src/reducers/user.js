let initialState = {
  user: {}
}

export default function status(state = initialState, action){
  switch (action.type) {

    case 'USER_LOGGED_IN':
    initialState.user = action.user.data
    return initialState

    case 'TOKEN_EXPIRED':
    initialState.user = {}
    return initialState

    case 'REMOVE_USER':
    initialState.user = {}
    return initialState

    default:
    return state
  }
}
