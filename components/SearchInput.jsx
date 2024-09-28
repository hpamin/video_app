import { View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, usePathname } from 'expo-router';

const SearchInput = ({ initialQuery }) => {

  const pathname = usePathname();

  const [query, setQuery] = useState(initialQuery || " ")

  return (
      <View className="border-2 border-primary-300 bg-primary-100 w-full h-16 px-4 bg-primary rounded-2xl focus:border-third flex-row items-center space-x-4 mt-3">
        <TextInput 
            className="text-base mt-0.5 text-white flex-1 font-Poppins"
            value={query}
            placeholder="Search a video"
            placeholderTextColor="#CDCDE0"
            onChangeText={(e) =>setQuery(e)}
        />
        <TouchableOpacity 
          onPress={() => {
            if (!query) {
              return Alert.alert("Missing query", "Please input something to search results across database.!")
            }

            // کد زیر بررسی شود
            if (pathname.startsWith("/Search")) {
              router.setParams({ query })
            }else{
              router.push(`search/${query}`)
            }
          }}
        >
            <Ionicons name="search-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput