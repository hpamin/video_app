import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { Ionicons } from '@expo/vector-icons'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { useFocusEffect } from 'expo-router'

const Home = () => {

  const {user} = useGlobalContext()

  const { data: posts, refetch } = useAppwrite(getAllPosts)
  const { data: latestPosts } = useAppwrite(getLatestPosts)
  const [refreshing, setRefreshing] = useState(false)
  
  const {first} = useGlobalContext()
  
  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [])
  );
  
  return (
    <SafeAreaView className="bg-primary-default h-full">
      <FlatList 
        data={posts}
        extraData={posts}
        keyExtractor={(item) => item.$id}
         renderItem={({ item }) => (
            <VideoCard 
              video={item}
              savedInfo={item.saved}
            />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
              <View className="justify-center items-start">
                <Text className="font-Poppins text-sm text-gray-100"> Welcome Back, </Text>
                <Text className="text-2xl font-Poppins text-white"> {user?.username} </Text>
              </View>

              <View className="w-full h-fit justify-center items-center flex-row-reverse">
                <Text className="font-PoppinsBold text-4xl text-white">Hpamin</Text>
                <Ionicons name="logo-electron" size={40} color="white" />
              </View>

              <SearchInput />

              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 font-Poppins text-lg mb-3">
                  Latest Videos
                </Text> 

                <Trending posts={latestPosts ?? []} />
              </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos Found"
            subtitle="Be the first one to upload the video!"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home