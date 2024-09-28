import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const FormField = ({title, value, handelChangeText, otherStyles, keyboardType, placeholder, ...props}) => {

    const [shownPassword, setshownPassword] = useState(false)

  return (
    <View className={`space-y-2  ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-Poppins">
        {title}
      </Text>
      <View className="border-2 border-primary-300 bg-primary-100 w-full h-16 px-4 bg-primary rounded-2xl focus:border-third flex-row items-center">
        <TextInput 
            className="flex-1 text-white font-Poppins text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#fffff"
            onChangeText={handelChangeText}
            secureTextEntry={title === "Password" && !shownPassword}
        />
        {title === "Password" &&
            <TouchableOpacity onPress={() => {setshownPassword(!shownPassword)}}>
                    <Ionicons name={`${shownPassword === true ? "eye-off-outline" : "eye-outline"}`} size={27} color="white" />

            </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default FormField