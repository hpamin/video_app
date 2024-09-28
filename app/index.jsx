import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import image from '../assets/image/welcome.png'
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
export default function App() {

  const {isLoading, isLoggedIn} = useGlobalContext()

  if (!isLoading && isLoggedIn) return <Redirect href="/Home" /> 

  return (
    <SafeAreaView className="h-full bg-primary-default">
      <ScrollView contentContainerStyle={{height: "100%"}}>
        <View className="w-full min-h-[85vh] justify-center items-center px-4"> 
          
          <View className="w-full h-fit justify-center items-center flex-row-reverse">
              <Text className="font-PoppinsBold text-4xl text-white">Hpamin</Text>
              <Ionicons name="logo-electron" size={40} color="white" />
          </View>

          <Image 
              source={image}
              className="max-w-[400px] w-full h-[300px] rounded-xl mt-3"
              resizeMode='contain'
          />
          
          <View className="mt-5">
            <Text className="font-Poppins
             text-3xl font-bold text-center text-white"> 
            Dicover Endless Possibilities with 
              <Text className="text-third"> HPamin </Text>
            </Text>
          </View>

          <Text className="text-xs font-light text-white text-center mt-5"> 
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium ut consequuntur, sequi vel labore sapiente.
          </Text>
          <CustomButton 
            title="continue with Email"
            handelPress={() => router.push('/SignIn')}
            containerStyles="w-full mt-5"
            />

        </View>
      </ScrollView>
      <StatusBar backgroundColor='#202124' style='light' />
    </SafeAreaView>
  );
}
