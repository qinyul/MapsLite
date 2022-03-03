export const SHOW_MAPMARKER = 'SHOW_MAPMARKER'

export const fetchMapMaker = (marker) => {
    return async (dispatch) => {
        dispatch({
            type:SHOW_MAPMARKER,
            data:marker
        })
    }
}