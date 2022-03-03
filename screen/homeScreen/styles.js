import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    autocompleteContainer:{
        position:'absolute',
        width:'95%',
        top:'7%',
        left:'2%',
        zIndex:4,
    },
    closeButtonContainer:{
      backgroundColor:'rgba(132, 132, 132, 0.43)',
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
      width:40,
      height:40,
      borderRadius:20,
      marginLeft:'5%'
    },
    searchButtonContainer:{
      position:'absolute',
      bottom:'5%',
      right:'5%',
      backgroundColor:'rgba(132, 132, 132, 0.43)',
      justifyContent:'center',
      alignItems:'center',
      width:40,
      height:40,
      borderRadius:20
    }
  });

  export default styles