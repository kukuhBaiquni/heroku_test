let initialState = []

export default function status(state = initialState, action){
  switch (action.type) {

    case 'PROCESS_SUCCESS':
    return [action.newData.data, ...state]

    case 'GET_OK':
    return action.data.data.reverse()

    default:
    return state
  }
}
