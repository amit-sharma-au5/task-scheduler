//import { createStore } from "redux"


let initialState = {
    data: undefined
}



// function setCities(data) {
//     //let changeState = JSON.parse(JSON.stringify(state));
//         initialState.cities.push(data)
// }






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