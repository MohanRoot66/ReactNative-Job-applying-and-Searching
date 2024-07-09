import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from './tabs.style'

                        
const Tabs = ({tabs,activeTab,setActiveTab})=>{
  return(
    <View style={styles.container}>
        {
          tabs.map((tab)=>(
            <TouchableOpacity key={tab} style={styles.btn(tab,activeTab)} onPress={()=>setActiveTab(tab)}>
                <Text style={styles.btnText(tab,activeTab)}>{tab}</Text>
            </TouchableOpacity>
          ))
        }
    </View>
  )

}

export default Tabs