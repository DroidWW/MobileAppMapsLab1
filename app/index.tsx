import React, { useState, useCallback } from 'react';
import { View, Button, Alert } from 'react-native';
import { MarkerData } from '../types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useRouter, useFocusEffect } from 'expo-router';
import Map from '../components/Map';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMarkers, saveMarkers} from '../storage/AStorage';

export default function Index() {

  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const router = useRouter();

  useFocusEffect(useCallback(() => {
    const loadData = async () => {
      const loadedMarkers = await getMarkers();
      setMarkers(loadedMarkers);
    };
    loadData();
  }, []));

  const pressingMap = (event: any) => {
    const {coordinate} = event.nativeEvent;
    addMarker(coordinate.latitude, coordinate.longitude);
  };

  const addMarker = async (latitude: number, longitude: number) => {
    const newMarker: MarkerData = {
      id: uuidv4(),
      latitude,
      longitude,
      images: [],
    };
    const updatedMarkers = [...markers, newMarker];
    setMarkers(updatedMarkers);
    await saveMarkers(updatedMarkers);
  };

  const tappingMarker = (marker: MarkerData) => {
    try {
      router.push({
        pathname: '/marker/[id]',
        params: {
          id: marker.id,
          marker: JSON.stringify(marker),
        }
      });
    }catch(error){
      console.error("Ошибка навигации: ", error);
      Alert.alert("Ошибка", "Провал навигации к маркеру");
    }
  };

  const clearMarkers = async () => {{
      await AsyncStorage.clear();
      setMarkers([]);
    }
  };

  return ( 
    <View style={{flex: 1}}>    
      <Map
        markers={markers}
        pressingMap={pressingMap}
        tappingMarker={tappingMarker}
      />
      <View style={{position: 'absolute', padding: 10, paddingTop: 60}}>
        <Button
          title='clear'
          onPress={clearMarkers}
          color = '#FF3B30'
        />
      </View>
    </View>
  );
}


