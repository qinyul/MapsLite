import { SHOW_MAPMARKER } from "../action/mapMarker"

const initialState = {
    mapMarker:[]
}

const mapMarkerReducer = (state = initialState,action) => {
    switch(action.type){
        case SHOW_MAPMARKER:
        return {
            ...state,mapMarker:action.data
        }
        default:
            return state
    }
}

export default mapMarkerReducer