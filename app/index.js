import { Stack, useRouter } from "expo-router";
import { View,Text, SafeAreaView, ScrollView } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn"
import { icons, images } from "../constants";
import Welcome from "../components/home/welcome/Welcome";
import Popularjobs from "../components/home/popular/Popularjobs";
import Nearbyjobs from "../components/home/nearby/Nearbyjobs";
import { useState } from "react";

const Home = () => {

    const router = useRouter();

    const [searchTerm,setSearchTerm] = useState("");

    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>
           <Stack.Screen 
                options={
                    {
                        headerStyle:{
                            backgroundColor:COLORS.lightWhite
                        },
                        headerShadowVisible:false,
                        headerLeft:()=>(
                            <ScreenHeaderBtn iconUrl={icons.menu} dimensions={"60%"}/>
                         ),
                        headerRight:()=>(
                            <ScreenHeaderBtn iconUrl={images.profile} dimensions={"100%"}/>
                        ),
                        title:""
                    }
                }
           />
           <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    flex:1,
                    padding:SIZES.medium
                }}>
                    <Welcome 
                        searchTerm={searchTerm} 
                        setSearchTerm={setSearchTerm}
                        handleClick={()=>{
                            if(searchTerm){
                                router.push(`/search/${searchTerm}`)
                            }
                        }} />
                    <Popularjobs />
                    <Nearbyjobs/>
                </View>
           </ScrollView>
           
        </SafeAreaView>
    )
}

export default Home;