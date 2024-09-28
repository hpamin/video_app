import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { ResizeMode, Video } from 'expo-av'
import Entypo from '@expo/vector-icons/Entypo';
import CustomButton from '../../components/CustomButton'

import * as ImagePicker from "expo-image-picker"
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
const Create = () => {

  const { user } = useGlobalContext()
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

     if (!result.canceled) {
      if (selectType === 'image') {
        setForm({...form, thumbnail: result.assets[0]})
      }
      if (selectType === 'video') {
        setForm({...form, video: result.assets[0]})
      }
     }
  }

  const submit = async () => {
    if (!form.prompt || !form.thumbnail || !form.title || !form.video) {
      return Alert.alert("Please fill in all the fields")
    }
    setUploading(true)

    try {
      await createVideo({
        ...form, userId: user.$id
      })

      Alert.alert("Success", "post uploaded successfully.")
      router.push("/Home")

    } catch (error) {
      Alert.alert("Error", error.message)

    }finally{
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })
      setUploading(false)
    }
  }


  return (
    <SafeAreaView className="bg-primary-default h-full">
      <ScrollView className="px-4 my-6">
          <Text className="text-2xl text-white font-Poppins"> Upload Videos </Text>


          <FormField 
            title="video Title"
            value={form.title}
            placeholder="Give Your video a title..."
            handelChangeText={(e) => setForm({...form, title: e})}
            otherStyles="mt-10"
          />

          {/* Upload Video */}
          <View className="mt-7 space-y-2">
              <Text className="text-base text-gray-100 font-Poppins"> Upload Video (50 mg) </Text>

              <TouchableOpacity onPress={() => openPicker("video")}>
                {form.video ? 
                  (
                    <Video 
                      source={{uri: form.video.uri}}
                      className="w-full h-64 rounded-2xl"
                      resizeMode={ResizeMode.COVER}
                    />
                  ) : (
                    <View className="w-full h-40 bg-primary-100 rounded-2xl justify-center items-center">
                        <View className="w-14 h-14 border border-dashed border-third justify-center items-center">
                          <Entypo name="upload" size={35} className="bg-third" />
                        </View>
                    </View>
                  )
                }
              </TouchableOpacity>
          </View>


          {/* Thumbnail Image */}
          <View className="mt-7 space-y-2">
              <Text className="text-2xl text-white font-Poppins"> Thumbnail Image </Text>

              <TouchableOpacity onPress={() => openPicker("image")}>
                {form.thumbnail ? 
                  (
                    <Image 
                      source={{uri: form.thumbnail.uri}}
                      resizeMode="cover"
                      className="w-full h-64 rounded-2xl"
                    />
                  ) : (
                    <View className="w-full h-16 bg-primary-100 rounded-2xl justify-center items-center border-2 border-primary-200 flex-row space-x-2">
                          <Entypo name="upload" size={20} className="bg-third" />
                          <Text className="text-sm text-gray-100 font-Poppins">
                            Choose a file
                          </Text>
                    </View>
                  )
                }
              </TouchableOpacity>
          </View>

          <FormField 
            title="AI prompt"
            value={form.prompt}
            placeholder="The prompt you used to create this video"
            handelChangeText={(e) => setForm({...form, prompt: e})}
            otherStyles="mt-7"
          />

          <CustomButton 
            title="submit & publish"
            handelPress={submit}
            containerStyles='mt-7'
            isLoading={uploading}
          />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create