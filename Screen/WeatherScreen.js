import { View,Text, Image,StyleSheet, ScrollView,
ActivityIndicator, FlatList, TouchableOpacity} 
from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';


export default function WeatherScreen(){
    const [location, setLocation] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const InitLocations = [{
        city : 'Yaoundé',
        latitude : 3.8480325,
        longitude : 2.115020752,
    },
    {
        city : 'Douala',
        latitude : 4.0483628,
        longitude : 9.7003822,
    },
    {
        city : 'Garoua',
        latitude : 9.3017886,
        longitude : 13.3857145,
    },
    {
        city : 'Maroua',
        latitude : 10.5950033,
        longitude : 14.3170575,
    },
    {
        city : 'Bafoussam',
        latitude : 5.4766667,
        longitude : 10.4166667,
    }
    ]

    const LoadWeather = async(lat, long) =>{
        let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data)
        setLocation(prev_data => [...prev_data, data])
    }
    useEffect(() => {
        //requete a une api
        setIsloading(true);
        for (let cord of InitLocations) {
            LoadWeather(cord.latitude, cord.longitude)
                
        }
        setIsloading(false)

    },[])

    const renderItems = ({item}) =>{
        return (
            <TouchableOpacity style={Mystyle.itemContener}>
                <View style={Mystyle.itemRow}>
                    <Text style={Mystyle.itemText}>
                        {item.latitude}, {item.longitude}
                    </Text>
                    <Ionicons name="cloud" size={20} color={"#478EF7"}/>
                    <Text style={Mystyle.itemText}>
                        {item.current_weather.temperature} {item.current_weather_units.temperature}
                    </Text>
                    
                </View>
            </TouchableOpacity>
        )
    }

    

    

    return(
        <View style={Mystyle.contener}>
            <Text style={Mystyle.title}>Welcome to weather</Text>
            {
                isLoading? (
                    // <ActivityIndicator size={20} color="#444" />
                    <Text>Loading Weather data ... </Text>
                ):(
                    <FlatList
                        data = {location}
                        renderItem = {renderItems}
                        keyExtractor = {item => item.latitude+ " , "+item.longitude}
                        contentContainerStyle = {Mystyle.listContent}
                    />
                ) 
            }
            
            

        </View>
    )
}
const Mystyle = StyleSheet.create({
    contener:{
       flex:1,
        alignItems: "center",
        justifyContent: 'justify',
        paddingVertical : 50
    },
    title:{
        fontSize: 20,
        fontStyle: 'italic'
    },
    listContent:{
        paddingVertical: 8,
    },
    itemContener:{
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginVertical: 4,
    },
    itemText:{
        fontSize: 18,
        marginRight: 8,

    },
    itemRow:{
        flexDirection:"row",
        alignItems: "center",
    }
})
