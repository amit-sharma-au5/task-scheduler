
let initialState = {
    data: []
}



function appReducer(state = initialState, action) {

    let stateCopy = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        default:
            return stateCopy;
        case "get_data":
            stateCopy.data = undefined
            stateCopy.data = action.payload
            return stateCopy
    }

}

export default appReducer;  