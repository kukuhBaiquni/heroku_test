let initialState = []

export default function status(state = initialState, action){
  switch (action.type) {

    case 'PROCESS_SUCCESS':
    return [...state, action.newData.data]

    case 'GET_OK':
    console.log('res get' ,action.data.data);
    return action.data.data

    default:
    return state
  }
}
