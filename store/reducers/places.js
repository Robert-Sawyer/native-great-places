import {ADD_PLACE} from "../actions/places";
import {exp} from "react-native-reanimated";
import Place from "../../models/Place";

const initialState = {
    places: [],
}

const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.image
            )
            return {
                places: state.places.concat(newPlace)
            }
        default:
            return state
    }
}

export default placesReducer
