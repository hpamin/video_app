import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';


const TabIcon = ({color, focused, name}) => {
  return(
    <View className="items-center justify-center">
       <Ionicons 
          name={name === "profile" ? "person" : name} 
          size={24} 
          color={color}
        />
      <Text className={`${focused ? "font-kanitBold" : "font-kanit"} text-xs capitalize`} style={{color: color}}> 
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#0FF1CE',
        tabBarInactiveBackgroundColor: "#202124",
        tabBarStyle: {
          backgroundColor: "#202124",
          borderTopWidth: 1,
          borderTopColor: '#202124',
        }
      }}>
        <Tabs.Screen
          name='Home'
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon 
                name="home"
                color={color} 
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='Bookmark'
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon 
                name="bookmark"
                color={color} 
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='Create'
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon 
                name="create"
                color={color} 
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='Profile'
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon 
                name="profile"
                color={color} 
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout