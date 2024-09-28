import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { Ionicons } from '@expo/vector-icons'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
  
  const {setUser, setIsLoggedIn} = useGlobalContext()



  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.password || !form.email) {
      Alert.alert("Error", "Please fill in all the fields")
    }
    setIsSubmitting(true)

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result)
      setIsLoggedIn(true)

      Alert.alert("Success", "User signed in successfuly");
      router.replace('/Home')

    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary-default h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center items-center px-5 my-5">

          <View className="w-full h-fit justify-center items-center flex-row-reverse">
              <Text className="font-PoppinsBold text-4xl text-white">Hpamin</Text>
              <Ionicons name="logo-electron" size={40} color="white" />
          </View>
          <Text className="text-white mt-5 text-2xl font-Poppins"> Log in to Hpamin </Text>


          <FormField
            title="Email"
            value={form.email}
            handelChangeText = {(e) => setForm({...form, email: e})}
            otherStyles="mt-5"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handelChangeText = {(e) => setForm({...form, password: e})}
            otherStyles="mt-5"
          />
          <CustomButton 
            title='Sign In'
            handelPress={submit}
            containerStyles='w-full mt-5'
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2"> 
            <Text className="text-lg text-gray-100 font-Poppins"> Don't have account? </Text>
            <Link href="/SignUp" className='text-lg font-Poppins text-third'>Sign Up </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn