import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import GlobalProvider from '../context/GlobalProvider'



/**جلوگیری از مخفی شدن خودکار صفحه اسپلش */
SplashScreen.preventAutoHideAsync()
/**
 * SplashScreen.preventAutoHideAsync(): 
 * با استفاده از این متد، شما به اکسپو می‌گویید که صفحه اسپلش را به صورت خودکار مخفی نکند و اجازه دهد شما خودتان زمانی که همه چیز آماده است،
 با استفاده از SplashScreen.hideAsync() آن را مخفی کنید.
 */

const _layout = () => {

    const [fontsLoaded, error] = useFonts({
        "Poppins" : require("../assets/font/Poppins/Poppins-Black.ttf"),
        "Poppins-Light" : require("../assets/font/Poppins/Poppins-Light.ttf"),
        "Poppins-Bold" : require("../assets/font/Poppins/Poppins-Bold.ttf"),
    })

    useEffect(() => {
        if (error) throw error
        /**این خط کد می‌گوید که اگر متغیر ارور دارای مقداری باشد (یعنی اگر خطایی رخ داده باشد)، آن خطا باید پرتاب شود. پرتاب خطا باعث می‌شود که برنامه متوقف شود و خطای مورد نظر به صورت صریح پردازش شود. این روش معمولاً برای مدیریت خطاها استفاده می‌شود تا از ادامه اجرای کدی که ممکن است به دلیل خطا نتایج غیرمنتظره‌ای تولید کند جلوگیری شود.
        به طور ساده، throw error یک خطا را به سیستم اعلام می‌کند و پردازش عادی برنامه را متوقف می‌کند. */


        /**در کد زیر پس از بارگذاری همه چیز، صفحه اسپلش مخفی میشود*/
        if (fontsLoaded) SplashScreen.hideAsync()
        /** SplashScreen:
         *   یک کامپوننت است که هنگام اجرای اپلیکیشن، صفحه اولیه یا همان صفحه "اسپلش" را نمایش می‌دهد. این صفحه معمولاً تا زمانی که منابع و داده‌های اولیه برنامه مانند فونت‌ها، تصاویر یا تنظیمات بارگذاری شوند، نمایش داده می‌شود.
         *  if (fontsLoaded = true):
         * معنایش این است که اگر فونت‌ها با موفقیت بارگذاری شده باشند، متد SplashScreen.hideAsync() فراخوانی می‌شود تا صفحه اسپلش از دید کاربر مخفی شود و رابط کاربری اصلی اپلیکیشن نمایش داده شود.
        این متد به صورت غیرهمزمان اجرا می‌شود، به این معنی که ممکن است کمی زمان ببرد تا صفحه اسپلش از بین برود، و از این طریق به شما اجازه می‌دهد تا به تدریج و به‌صورت کنترل  شده صفحه اسپلش را از بین ببرید.

         */
    }, [fontsLoaded, error])

    if (!fontsLoaded && !error) return null

  return (
    <GlobalProvider>
      <Stack>
          <Stack.Screen name="index" options={{headerShown: false}} />
          <Stack.Screen name="(auth)" options={{headerShown: false}} />
          <Stack.Screen name="(tabs)" options={{headerShown: false}} />
          <Stack.Screen name="search/[query]" options={{headerShown: false}} />
      </Stack>
    </GlobalProvider>
  )
}

export default _layout

const styles = StyleSheet.create({})