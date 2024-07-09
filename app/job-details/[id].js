import { View, Text, Image, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import useFetch from '../../hook/useFetch';
import { COLORS, icons, SIZES } from '../../constants';
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn';
import { isLoading } from 'expo-font';
import Company from '../../components/jobdetails/company/Company';
import Tabs from '../../components/jobdetails/tabs/Tabs';
import Specifics from '../../components/jobdetails/specifics/Specifics';
import JobAbout from '../../components/jobdetails/about/About';
import JobFooter from '../../components/jobdetails/footer/Footer';


const tabs = ["About","Qualifications","Responsibilites"]

const JobDetails = () => {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const [refreshing,setRefreshing] = useState(false);

  const [activeTab,setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(()=>{
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  })

  const {data,isLoading,error,refetch} = useFetch("job-details",{
    job_id:id
  });

  const displayTabContent = () =>{
    switch(activeTab){
        case "Qualifications":
          return <Specifics 
            title = "Qualifications"
            points = {data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        
        case "About":
          return <JobAbout 
            info={data[0].job_description ?? "No data provided"}
          />

        case "Responsibilites":
          return <Specifics 
          title = "Responsibilites"
          points = {data[0].job_highlights?.Responsibilities ?? ["N/A"]}
        />

    }
  }


  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>
        <Stack.Screen 
          options={{
            headerStyle:{
              backgroundColor:COLORS.lightWhite,
            },
            headerShadowVisible:false,
            headerBackVisible:false,
            headerLeft:()=>(
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimensions="60%"
                handlePress={()=>{router.back()}}
                />
            ),
            headerRight:()=>(
              <ScreenHeaderBtn
                iconUrl={icons.share}
                dimensions="60%"
                />
            ),
            headerTitle:""
          }}
        />
        <>
          <ScrollView showsVerticalScrollIndicator={false} 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
              {
                isLoading ? (
                  <ActivityIndicator  size={"large"} color={COLORS.primary}/>
                ) : error ? (<Text>Something went wrong</Text>) : data.length==0 ? (
                  <Text>No data</Text> 
                ) : (
                  <View style={{padding:SIZES.medium,paddingBottom:100}}>
                      <Company  
                        companyLogo = {data[0]?.employer_logo}
                        jobTitle = {data[0]?.job_title}
                        companyName = {data[0]?.employer_name}
                        location = {data[0]?.job_country}
                      />
                      <Tabs 
                          tabs={tabs}
                          activeTab={activeTab}
                          setActiveTab={setActiveTab}
                      />

                      {displayTabContent()}

                  </View>
                )
              }
          </ScrollView>
          <JobFooter url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/results" }/>
        </>
    </SafeAreaView>
  );
};

export default JobDetails;
