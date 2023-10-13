import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Animated , Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

export default function Stories({ route }) {
    const { stories, currentIndex } = route.params;
    const [ storyData, setStoryData ] = useState(stories)
    const [currentPersonIndex, setCurrentPersonIndex] = useState(currentIndex);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const navigation = useNavigation();

    const handleGoBack = () => {
      navigation.goBack();
    };
  
    const handleImagePress = () => {
        const currentStory = stories[currentPersonIndex].storyDetail[currentStoryIndex];
        if (currentStoryIndex < stories[currentPersonIndex].storyDetail.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
        } else if (currentPersonIndex < stories.length - 1) {
            setCurrentPersonIndex(currentPersonIndex + 1);
            setCurrentStoryIndex(0);
        } else {
    
        }
    };
    const progress = useRef(new Animated.Value(0)).current
    const start = () => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: false 
        }).start(({finished}) => {
            if(finished){
                next()
            }
        })
    }
    const next = () => {
        if(currentStoryIndex != storyData.storyDetail.length - 1){
            let tempData = storyData.storyDetail
            tempData[currentStoryIndex].finish = 1
            setStoryData(tempData)
            setCurrentStoryIndex(currentStoryIndex + 1)
            progress.setValue(0)
        }else{
            close()
        }
    }
    const previous = () => {
        if(currentStoryIndex > 0){
            let tempData = storyData.storyDetail
            tempData[currentStoryIndex - 1].finish = 1
            setStoryData(tempData)
            progress.setValue(0)
            setCurrentStoryIndex(currentStoryIndex - 1)
        }else{
            close()
        }
    }
    const close = () => {
        progress.setValue(0)
    }
    return (
        <View>
            <TouchableOpacity onPress={handleImagePress}>
                <Image
                    source={storyData[currentPersonIndex].storyDetail[currentStoryIndex].content}
                    onLoadend={() => {
                        progress.setValue(0);
                        start()
                    }}
                    style={tw`w-full h-full`}
                />
                <View style={tw `w-full absolute top-3 flex flex-row justify-evenly items-center`}>
                {
                    storyData[currentPersonIndex].storyDetail.map((item, index) => {
                        return(
                            <View style={{ 
                                flex: 1,
                                height: 3,
                                backgroundColor: 'rgba(255, 255, 255, .5)',
                                marginLeft: 5
                             }}>
                                <Animated.View style={{ 
                                    flex: currentStoryIndex === index ? progress : storyData[currentPersonIndex].storyDetail[index].finish,
                                    height: 3,
                                    backgroundColor: 'rgba(255, 255, 255, .5)',
                                    marginLeft: 5
                                 }}>

                                </Animated.View>
                            </View>
                        )
                    })
                }
                </View>
                <View style={tw `w-full absolute top-6 flex flex-row items-center justify-between px-3`}>
                    <View style={tw `flex flex-row items-center`}>
                        <Image source={storyData[currentPersonIndex].image} style={tw `w-8 h-8 rounded-full`}></Image>
                        <Text style={ tw `text-sm text-white font-medium ml-3`}>{storyData[currentPersonIndex].name}</Text>
                        <Text style={tw `text-sm text-gray-500 ml-2`}>{storyData[currentPersonIndex].storyDetail[currentStoryIndex].time}h</Text>
                    </View>
                    <TouchableOpacity onPress={handleGoBack}> 
                        <Image source={require("../assets/images/icon-close.png")} style={tw `w-5 h-5`}></Image>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
}
