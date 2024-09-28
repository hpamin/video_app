import React, { useEffect, } from 'react'
import { View, TouchableOpacity, Image, FlatList, } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import { getUserPosts, signOut } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider';
import Entypo from '@expo/vector-icons/Entypo';
import InfoBox from '../../components/InfoBox';

const Profile = () => {

  const {user, setUser, setIsLoggedIn,} = useGlobalContext()
  
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

  useEffect(() => {
    refetch()      
  }, [])
  
  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)

    router.replace("/SignIn")
  }

  return (
     <SafeAreaView className="bg-primary-default h-full">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard 
            video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Entypo name="log-out" size={24} color="red" />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-third rounded-lg justify-center items-center">
              <Image 
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode='cover'
              />
            </View>

            <InfoBox 
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex-row">
                <InfoBox 
                  title={posts.length || 0}
                  subtitle="Posts"
                  containerStyles="mr-10"
                  titleStyles="text-xl"
                />
                <InfoBox 
                  title="900"
                  subtitle="Followers"
                  titleStyles="text-lg"
                />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos Found"
            subtitle="No Videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile