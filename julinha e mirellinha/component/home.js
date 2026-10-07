import React, { useState } from "react";
import {Text, View, TextInput, StyleSheet} from"react-native";

    function home() {
        const [nome, setnome] = useState('');

        return(
         <View>

         <Text>Nome</Text>
         <TextInput
            style={x.input}
               placeholder=" Digite Nome"
               value={nome}
               onChangeText={text=> setNome(text)}              
         />

         <Button
            title="Ver"
            color="#6A5ACD"
            onPress={()=>Alert.alert('ASDAS')}
         />

         {  
            nome.trim() != "" &&( 
               <Text>Nome : {nome}</Text>
            )
         }  
    </View>
   )
const x = StyleSheet.create({
   input:{
      borderColor :"Gray",
      borderWidth:1,
      borderRadius: 5,
      padding:2,
      margin:5
   }})
}
export default home;