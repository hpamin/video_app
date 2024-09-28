import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title, handelPress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
        onPress={handelPress}
        activeOpacity={0.6}
        disabled={isLoading}
        className={`bg-third rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}>
            
      <Text className={`text-primary font-Poppins text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton