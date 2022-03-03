export const SHOW_AUTOCOMPLETE = 'SHOW_AUTOCOMPLETE'

export const fetchAutocomplete = (coordinate) => {
    return async (dispatch) => {
        dispatch({
            type:SHOW_AUTOCOMPLETE,
            data:coordinate
        })
    }
}