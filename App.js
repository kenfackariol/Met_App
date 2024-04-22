import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WeatherScreen from './Screen/WeatherScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <WeatherScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    
  },
});
