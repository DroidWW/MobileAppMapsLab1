import { Text, FlatList, Image, View, Button} from 'react-native';
import { ImageListProps } from "@/types";

export default function ImageList({images, deleteImage}: ImageListProps){
    if (images.length === 0){
        return <Text>Нет изображений</Text>;
    }

    return (
        <FlatList
            data={images}
            keyExtractor={item => item.id}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
            renderItem={({item}) => (
                <View>
                    <Image 
                        style={{width:400,height:300}}
                        source={{uri: item.url}}
                    />
                    <Button title='delete image' onPress={() => deleteImage(item.id)}/>
                </View>
            )}
        />
    )
}