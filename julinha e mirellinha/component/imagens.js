import React from 'react'
import { Image, View, Pressable, StyleSheet} from 'react-native'

function Img(){
   return(
     <View>
         <Image  
           source={require('./img/img_.png')}
          
          style={ [estilo.img,{ borderRadius:10, margin:10}]}
          />

          <Image 
             style={ [estilo.img,{ borderRadius:10, margin:10}]}
             source={{
               uri:"https://lartbr.com.br/wp-content/uploads/2022/07/IMG_5815.jpghttps://lartbr.com.br/wp-content/uploads/2022/07/IMG_5815.jpg"
             }}
          />
          
     </View>
   )
}

export default Img;
const estilo = StyleSheet.create({
   img :{width:300, height:300}
})
