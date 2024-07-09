import { useFonts } from "expo-font";
import { Stack } from "expo-router"

const AppLayout = () =>{

    const [fontLoaded] = useFonts({
        DMBold : require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium : require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf")
    })

 
    if(!fontLoaded){
        return null
    }

    return <Stack />

}
export default AppLayout;