import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createStore,combineReducers,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import AutocompleteReducer from './store/reducer/autocomplete';
import mapMarkerReducer from './store/reducer/mapMarker';
import MyLocationReducer from './store/reducer/myLocation';
import HomeScreen from './screen/homeScreen';

const rootReducer = combineReducers({
  autocomplete:AutocompleteReducer,
  mapMarker:mapMarkerReducer,
  myLocation:MyLocationReducer
})

const store = createStore(rootReducer,applyMiddleware(ReduxThunk))

export default function App() {
  return ( 
    <Provider store={store}>
      <StatusBar style='dark' backgroundColor='transparent'/>
      <HomeScreen />
    </Provider>
  );
}


