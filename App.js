import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View,FlatList}  from 'react-native';
import api from './src/Services/Api';
import Quadro from "./src/Pages/Quadro";
import {NativeText} from "react-native/Libraries/Text/TextNativeComponent";

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      quadros: []
    }
  }

  //toda vez que o app for montado vai ser executado abaixo
  async componentDidMount() {
    const response = await api.get('/quadros');
    this.setState({
      quadros: response.data
    });
  }

  render(){
    return(

        <SafeAreaView style={styles.container}>
          <FlatList
              //recebe a lista de quadros
          data={this.state.quadros}
          // o key extractor vai pegar o id, que é string e precisa ser string
          keyExtractor={ item => item.id}

          renderItem={({item}) => <Quadro data={item}/>}
          ></FlatList>
        </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',


    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
