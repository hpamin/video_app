import { View, Text, Image } from 'react-native'
import React from 'react'
import img from '../assets/image/bike.png'
import CustomButton from './CustomButton'
import { router } from 'expo-router'
const EmptyState = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image 
        source={img}
        className="w-[270px] h-[215px]"
        resizeMode='contain'
      />
      <Text className="text-xl text-center font-Poppins text-white"> {title} </Text>
      <Text className="font-Poppins text-sm text-gray-100"> {subtitle} </Text>

      <CustomButton 
        title="Create Viedo"
        handelPress={() => router.push("/Create")}
        containerStyles="w-full my-5"
      />
    </View>
  )
}

export default EmptyState