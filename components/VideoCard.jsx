import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ResizeMode, Video } from 'expo-av';
import imgPlaying from '../assets/image/play.png'
import { FontAwesome } from '@expo/vector-icons';
import { useGlobalContext } from '../context/GlobalProvider';

const VideoCard = ({video: { $id: videoId ,title, thumbnail, video, creator: { username, avatar, $id: userId, }}, savedInfo}) => {

    const {handelSave} = useGlobalContext()
    const [play, setPlay] = useState(false)
    const [isaved, setIsaved] = useState(savedInfo)

    useEffect(() => {
        setIsaved(savedInfo)
    }, [savedInfo]) 
    
  return (
    <View className=" flex-col items-center px-4 mb-14  py-2">
        <View className="flex-row gap-3 items-start border-t border-primary-300 ">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border border-third justify-center items-center p-0.5">
                    <Image 
                        source={{ uri: avatar  }}
                        className="w-full h-full rounded-lg"
                        resizeMode='cover'
                    />
                </View>

                <View className="justify-center flex-1 mr-3 gap-y-1">
                    <Text className="text-white font-Poppins text-sm" numberOfLines={1}> {title} </Text> 
                    <Text className="text-xs text-gray-100 font-Poppins" numberOfLines={1}> {username} </Text>
                </View>
            </View>
  
            <TouchableOpacity className="pt-2" activeOpacity={0.7} onPress={() => {handelSave(videoId, userId, savedInfo, setIsaved) }} >
                {console.log("mmd gholi:",isaved)}
                {isaved ?
                    <FontAwesome name="bookmark" size={30} color="white" />
                    : 
                    <FontAwesome name="bookmark-o" size={30} color="white"/>
                }
            </TouchableOpacity>
        </View>

        {play ? (
             <Video 
                source={{ uri: video }}
                className="w-full h-60 rounded-xl mt-3"
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                  if (status.didJustFinish) {
                    setPlay(false)
                  }
                }}
          />
        )
        :
        (
            <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => setPlay(true)}
                className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
            >
                <Image 
                    source={{ uri: thumbnail }}
                    className="w-full h-full rounded-xl mt-3"
                    resizeMode='cover'
                />
                <Image source={imgPlaying} resizeMode='cover' className="absolute w-12 h-12" />
            </TouchableOpacity>
        )

        }
        
    </View>
  )
}

export default VideoCard