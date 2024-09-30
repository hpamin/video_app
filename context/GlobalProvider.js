import { createContext, useContext, useEffect, useState } from "react";
import { getAllPosts, getCurrentUser, updateSavedStatus } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";


const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        getCurrentUser()
          .then((res) => {
              if (res) {
                  setIsLoggedIn(true);
                  setUser(res);
              } else {
                  setIsLoggedIn(false);
                  setUser(null)
              }
          })
          .catch((error)=>{
              console.log(error);
          })
          .finally(() => {
              setIsLoading(false)
          })
    }, [])  


    // const [savedVideos, setSavedVideos] = useState([]);
    // const handelSave = async (videoId, userId, saved) => {
    //     try {
    //         if (saved === null || !saved) {
    //             await updateSavedStatus(videoId, userId);
    //             setSavedVideos(prev => [...prev, videoId])
    //         }else{
    //             await updateSavedStatus(videoId, userId = null);
    //             setSavedVideos(prev => prev.filter(id => id !== videoId))
    //         };
    //     } catch (error) {
    //         console.log("handelSave: ",error);
    //         throw new Error(error);
    //     }
    // }

  const { refetch } = useAppwrite(getAllPosts)
    // const [first, setfirst] = useState(false)
    const handelSave = async (videoId, userId, savedInfo, setIsaved) => {
        try {
            setfirst(!first)
            if (savedInfo === null || !savedInfo) {
                await updateSavedStatus(videoId, userId)
                console.log("saved video succesfull");
                setIsaved(true)
            } else {
                await updateSavedStatus(videoId, null)
                await refetch()
                console.log("Deleted video!");
                setIsaved(null);
            }
        } catch (error) {
            console.log("handelSave: ", error);
            throw new Error(error);
        }
    }
  return(
    <GlobalContext.Provider
        value={{
            isLoading,
            user,
            setUser,
            setIsLoggedIn,
            isLoggedIn,
            handelSave,
        }}
    >
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider