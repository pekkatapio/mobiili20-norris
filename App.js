import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, Image } from 'react-native';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [joke, setJoke] = useState("");

  async function fetchData() {
    try {
      setIsLoading(value => true);
      let response = await fetch('https://api.chucknorris.io/jokes/random');
      let responseJson = await response.json();
      setJoke(responseJson.value);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./assets/norris.png')} resizeMode='contain' />
      { isLoading ? 
          <View style={styles.jokebox}>
            <ActivityIndicator size="large" color="#00ff00" /> 
          </View>
        :
          <View style={styles.jokebox}>
            <Text style={styles.joke}>{joke}</Text>
            <Button title="GET A NEW JOKE" onPress={fetchData} />
          </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  image: {
    width: '70%',
    height: '60%'
  },
  joke: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center', 
    marginBottom: 20
  },
  jokebox: {
    height: '40%'
  }
});
