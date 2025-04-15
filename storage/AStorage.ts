import AsyncStorage from '@react-native-async-storage/async-storage';
import { MarkerData } from '../types';

const STORAGE_KEY = 'MARKERS_DATA';

export const getMarkers = async (): Promise<MarkerData[]> => {
    const savedMarkers = await AsyncStorage.getItem(STORAGE_KEY);
    return savedMarkers ? JSON.parse(savedMarkers) : [];
};

export const saveMarkers = async (markers: MarkerData[]): Promise<void> => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(markers));
};

export const updateMarker = async (updatedMarker: MarkerData): Promise<void> => {
  const markers = await getMarkers();
  const updatedMarkers = markers.map(marker => 
    marker.id === updatedMarker.id ? updatedMarker : marker
  );
  await saveMarkers(updatedMarkers);
};

