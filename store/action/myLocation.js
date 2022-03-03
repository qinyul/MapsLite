export const SHOW_MY_LOCATION = 'SHOW_MY_LOCATION'

export const fetchMyLocation = (location) => {
    return async (dispatch) => {
        dispatch({
            type:SHOW_MY_LOCATION,
            data:location
        })
    }
}