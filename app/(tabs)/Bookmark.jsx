import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getSavedVideos } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useFocusEffect } from 'expo-router'

const Bookmark = () => {

  const { data: posts, refetch} = useAppwrite(getSavedVideos)
  const [refreshing, setRefreshing] = useState(false)
  
  const [SavedData, setSavedData] = useState(posts)
  const [filtredData, setfiltredData] = useState(null)

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
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard 
            video={item}
            saved={item.saved}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4"> 
              <Text className="font-Poppins text-2xl text-gray-100"> Saved Video </Text>
              <View className="mt-6 mb-8">
                  <SearchInput />
              </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos Found"
            subtitle="No Videos found for this search query"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Bookmark