import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.hpamin',
    projectId: '66d381a00016ad2fc9bf',
    databaseId: '66d383d300227559b462',
    userCollectionId: '66d38404003c1ca513d0',
    videosCollectionId: '66d38482001446c1d840',
    storageId: '66d38a25000da53c80a5'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videosCollectionId,
    storageId,
} = config

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setPlatform(platform)
;


const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
   try{
    const newAccount = await account.create(
        ID.unique(),
        email, 
        password,
        username,
    )
    if (!newAccount) throw Error
     
    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)


    const newUser = await databases.createDocument(
        databaseId,
        userCollectionId,
        ID.unique(),
        {
            acountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
    )

    return newUser
   }catch (error){
    console.log(error);
    throw new Error(error);
   }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('acountId', currentAccount.$id)]
            // دستور بالا برای فیلتر کردن و جست و جوی داده های استفاده میشود
            //  این دستور داده‌هایی را از دیتابیس جستجو می‌کند
            //  که مقدار فیلد اکانت‌آیدیaccountId آن‌ها برابر با (currentAccount.$id) باشد.
        )
        if (!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error);
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
        )

        return posts.documents
    } catch (error) {
        throw new Error(error);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')
        return session        
    } catch (error) {
        throw new Error(error);
    }
}


/** saved video */
export const updateSavedStatus = async (videoId, userId) => {

    try {
        const posts = await databases.updateDocument(
            databaseId,
            videosCollectionId,
            videoId,
            {saved : userId}
        )
        return posts.documents
    } catch (error) {
        console.log("updateSavedStatus: ",error);
        
        throw new Error(error);
    }
}

export const getSavedVideos = async () => {

    try {
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
        )
        const filteredData = posts.documents.filter(post => post.saved !== null); 
        return filteredData
    } catch (error) {
        console.log(error);
        
        throw new Error(error);
    }
}

// upload video & storage
export const getFilePreview = async (fileId, type) => {
    let fielUrl;
    try {
        if (type === "video") {
            fielUrl = storage.getFileView(storageId, fileId)
        }else if (type === "image") {
            fielUrl = storage.getFilePreview(
                storageId, 
                fileId,
                2000, 2000, 'top', 100)
        }else {
            throw new Error("Invalid file type.");
        }

        if (!fielUrl) throw Error;

        return fielUrl
    } catch (error) {
        throw new Error(error);
    }
}

export const uploadFile = async (file, type) => {
    if (!file) throw new Error("File URL is undefined.");;

    const {mimeType, ...rest} = file;

    const asset = { 
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
     };

    try {
        // uploaded file in storage
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset,
        ) ;
        
        // get preview of file URL
        const fielUrl = await getFilePreview(uploadedFile.$id, type)

        return fielUrl
    } catch (error) {
        throw new Error(error);
    }
}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])
        const newPost = await databases.createDocument(
            databaseId,
            videosCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            },
        )

        return newPost
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}