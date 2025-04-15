import React from 'react';
import {MapProps} from "@/types";
import {View} from 'react-native';
import MapView, {Marker} from "react-native-maps";

export default function Map({markers, pressingMap, tappingMarker}: MapProps) {
    return(
        <View style={{flex: 1}}>
            <MapView
                style={{width: '100%', height: '100%'}}
                onLongPress={pressingMap}
                initialRegion={{ 
                latitude: 58.47051,
                longitude: 56.42049,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
                }}
            >
                {markers.map(marker => (
                    <Marker 
                        key={marker.id} 
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        }}
                        onPress={() => tappingMarker(marker)}
                    />         
                ))}
            </MapView>
        </View>
    );
}
