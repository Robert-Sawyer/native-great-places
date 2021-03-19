import {Platform} from "react-native";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import Colors from '../constants/colors'

const PlacesNavigator = createStackNavigator({
    Places: PlacesListScreen,
    Details: PlaceDetailsScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.mainColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.mainColor
    }
})

export default createAppContainer(PlacesNavigator)
