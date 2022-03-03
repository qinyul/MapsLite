import { SHOW_MY_LOCATION } from "../action/myLocation"

const initialState = {
    myLocation:[]
}

const MyLocationReducer = (state = initialState,action) => {
    switch(action.type){
        case SHOW_MY_LOCATION:
            return {
                ...state,myLocation:action.data
            }
        default:
            return state
    }
}

export default MyLocationReducer