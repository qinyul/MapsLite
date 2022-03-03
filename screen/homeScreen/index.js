import React,{useEffect,useCallback,useState,useRef} from 'react'
import {View,TouchableOpacity} from 'react-native'
import styles from './styles'
import MapView,{Marker} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch,useSelector } from 'react-redux';
import * as AutocompleteAction from '../../store/action/autocomplete'
import * as MapMarkerAction from '../../store/action/mapMarker'
import * as MyLocationAction from '../../store/action/myLocation'
import { Icon } from 'react-native-material-ui';
import * as Location from 'expo-location';

const HomeScreen = () => {
    const searchRef = useRef()
    const mapRef = useRef()

    const [search,setSearch] = useState('')
    const [mapReady,setMapReady] = useState(false)
    const dispatch = useDispatch()
    
    const coordinate = useSelector((state) => state.autocomplete.autocomplete)
    const mapMarker = useSelector((state) => state.mapMarker.mapMarker)
    const myLocation = useSelector((state) => state.myLocation.myLocation)

    const loadAutocomplete = useCallback(async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({})

        dispatch(AutocompleteAction.fetchAutocomplete({
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }))

        dispatch(MyLocationAction.fetchMyLocation({
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }))

    },[dispatch])

    useEffect(() => {
        loadAutocomplete()
    },[loadAutocomplete])

    const clearSearchHandler = () => {
        searchRef.current.clear()
        setSearch('')
    }

    const myCurrentLocationHandler = () => {
        mapRef.current.animateToRegion(myLocation)
    }

    return(
        <View style={styles.container}>
            <View style={{width:'100%',height:'100%'}}>
                {
                    mapReady &&  <View style={styles.autocompleteContainer}>
                                    <GooglePlacesAutocomplete
                                        ref={searchRef}
                                        placeholder='Search Place..'
                                        onFail={error => console.error(error)}
                                        onPress={(data, details = null) => {
                                            const result = {
                                                latitude:details.geometry.location.lat,
                                                longitude:details.geometry.location.lng,
                                                latitudeDelta: 0.05,
                                                longitudeDelta: 0.05,
                                            }
                                            dispatch(MapMarkerAction.fetchMapMaker(result))
                                            setSearch(details.geometry.location.lat)
                                            dispatch(AutocompleteAction.fetchAutocomplete(result))
                                        }}
                                        styles={{textInputContainer:{width:'100%'}}}
                                        fetchDetails
                                        query={{
                                            key: 'AIzaSyDgbAWfq5T1O12EPpZrGSiJv-vM592Nihs',
                                            language: 'en',
                                            types: 'geocode'
                                        }}
                                        renderRightButton={() => (
                                            search !== '' && <TouchableOpacity 
                                                                style={styles.closeButtonContainer} 
                                                                onPress={() => clearSearchHandler()}
                                                            >
                                                                <Icon name='close' size={23} />
                                                            </TouchableOpacity>
                                        )}
                                        textInputProps={{onChangeText:text => setSearch(text)}}
                                    />
                                </View>
                }
               
                {
                    coordinate.length !== 0 && <MapView
                                                    ref={mapRef}
                                                    style={{ alignSelf: 'stretch', height: '100%'}}
                                                    onMapReady={ () => setMapReady(true)}
                                                    region={coordinate}
                                                    showsUserLocation
                                                    showsMyLocationButton={false}
                                                    userInterfaceStyle={'dark'}
                                                    loadingEnabled
                                                >   
                                                {
                                                    mapMarker.length !== 0 && <Marker
                                                                                coordinate={{latitude:parseFloat(mapMarker.latitude),
                                                                                            longitude:parseFloat(mapMarker.longitude)
                                                                                            }}
                                                                              />
                                                }
                                                </MapView>
                }
                {
                    mapReady && <TouchableOpacity style={styles.searchButtonContainer}
                                                  onPress={() => myCurrentLocationHandler()}
                                >
                                    <Icon name='circle' size={23} color="#0D80D8" />
                                </TouchableOpacity>
                }
                
            </View>
      </View>
    )
}

export default HomeScreen