import { LongPressEvent } from "react-native-maps";

export interface MarkerData{
    id: string;
    latitude: number;
    longitude: number;
    images: ImageData[];
}

export interface ImageData{
    id: string;
    url: string;
}

export interface MapProps{
    markers: MarkerData[];
    pressingMap: (event: LongPressEvent) => void;
    tappingMarker: (marker: MarkerData) => void;
}

export interface ImageListProps{
    images: ImageData[];
    deleteImage: (imageId: string) => void;
}
