import { useLocalSearchParams, useRouter } from "expo-router";
import { MarkerData } from "@/types";
import { View, Text, Button, Alert } from "react-native";
import ImageList from "@/components/ImageList";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4} from "uuid";
import React, { useState, useEffect } from 'react';
import { getMarkers, updateMarker } from "@/storage/AStorage";


export default function MarkerInfo() {
    const { id, marker: markerString } = useLocalSearchParams<{
        id: string;
        marker: string;
    }>();

    const [marker, setMarker] = useState<MarkerData>(JSON.parse(markerString || '{}'));
    const router = useRouter();
    
    useEffect(() => {
        const loadMarker = async () => {
          const markers = await getMarkers();
          const foundMarker = markers.find(m => m.id === id);
          if (foundMarker) {
            setMarker(foundMarker);
          } else {
            router.back();
          }
        };
        loadMarker();
      }, [id]);

    const addImage = async () => {
        try {
            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if(!pickerResult.canceled){
                const updatedMarker = {
                    ...marker,
                    images: [...marker.images, {
                        id: uuidv4(),
                        url: pickerResult.assets[0].uri
                    }]
                };
                setMarker(updatedMarker);     
                await updateMarker(updatedMarker);       
            }
        }catch(error){
            console.error("Ошибка выбора изображения: ", error);
            Alert.alert("Ошибка", "Провал выбора изображения!")
        }
    };
    
    const deleteImage = async (imageId: string) => {
        const updatedMarker = {
            ...marker,
            images: marker.images.filter(img => img.id !== imageId)
        };
        setMarker(updatedMarker);
        await updateMarker(updatedMarker);
    }

    return(
        <View style={{flex: 1, alignContent: 'center', padding: 10}}>
            <View style={{ padding: 10, backgroundColor: '#fff' }}>
                <Text>id: {marker.id}</Text>
                <Text>latitude: {marker.latitude}</Text>
                <Text>longitude: {marker.longitude}</Text>
            </View>
            <View style={{flex:1}}>
                <ImageList images={marker.images} deleteImage={deleteImage}/>
            </View>
            <View style={{ padding: 10, margin: 10, backgroundColor: '#fff', flexDirection:'row', gap: '63%' }}>
                <Button 
                    title='add image'
                    color="#FF3B30"
                    onPress={addImage}
                />
                <Button 
                    title='back' 
                    onPress={() => router.back()}
                />
            </View>
        </View>
    );
}