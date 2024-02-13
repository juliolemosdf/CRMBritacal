import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  useWindowDimensions,
  TouchableOpacity, 
  ActivityIndicator
  
} from "react-native";
import Constants from "expo-constants";
import firebase from '../firebase';
import { AntDesign, Feather } from "@expo/vector-icons";
import uplodImageFromDevice from "./uploadImageFromDevice";
import getBlobFromUri from "./getBlobFromUri";
import manageFileUpload from "./manageFileUpload";
import { AuthContext } from '../../contexts/auth';





export default function App() {
  const [imgURI, setImageURI] = React.useState(null);
  const { user } = React.useContext(AuthContext);
  const [julio, setJulio] = React.useState(user.uid);
  const [exemplo, SetExemplo] = React.useState("sss");
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [remoteURL, setRemoteURL] = React.useState("");

  const [enviarImg, setEnviarImg] = React.useState('');

  const [error, setError] = React.useState(null);
  const { width } = useWindowDimensions();

  React.useEffect(() => {
     firebase.database().ref('users')
    .child(user.uid)
    .orderByChild('uid').on('value', (snapshot)=>{
      snapshot.forEach((childItem) => {
        SetExemplo(snapshot.val().fotoPerfil);
      })
    })
  }, [])


 



  const handleLocalImageUpload = async () => {
   
    const fileURI = await uplodImageFromDevice();
 setEnviarImg('cheio');
    if (fileURI) {
      setImageURI(fileURI);
    }
  };

  const onStart = () => {
    setIsUploading(true);
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };
  const onComplete = (fileUrl) => {
    setRemoteURL(fileUrl);
    setIsUploading(false);
    setImageURI(null);
    
  };

  const onFail = (error) => {
    setError(error);
    setIsUploading(false);
  };


  const handleCloudImageUpload = async () => {
    if (!imgURI) return;

    let fileToUpload = null;

    const blob = await getBlobFromUri(imgURI);

    await manageFileUpload(blob, { onStart, onProgress, onComplete, onFail, julio });
    

    
    
  };

  const enviarfoto = async() => {
    firebase.database().ref('users').child(julio).update({
      fotoPerfil: remoteURL
    }).then(()=>console.log('Data set.'));

  }

  return (
    <View style={styles.container}>
      
      {Boolean(imgURI) == '' ? <View style={styles.row}>
      <TouchableOpacity
            onPress={handleLocalImageUpload}
            style={styles.row2}
            >
              {exemplo === '' ? <Image
            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/badiaagro.appspot.com/o/ERRO.fw.png?alt=media&token=39f11d53-322a-47ed-9b05-54e9343a6f62'}}
            resizeMode="contain"
            style={{ width:150, height:150, borderRadius:75, borderColor:"#13ae55", borderWidth:2 }}
            
          />:<Image
            source={{uri: exemplo}}
            resizeMode="contain"
            style={{ width:150, height:150, borderRadius:75, borderColor:"#13ae55", borderWidth:2 }}
            
          />}
            
          
          <View style={styles.icon2}><Text style={{fontWeight:'bold', color:"#00ff00", textAlign:'center'}}>Alterar a foto</Text></View>
          
          </TouchableOpacity>
          
          
          
          
          </View> : 
            <TouchableOpacity
            onPress={handleCloudImageUpload}
            style={styles.row2}
            >
            <Image
            source={{ uri: imgURI }}
            resizeMode="contain"
            style={{ width:150, height:150, borderRadius:75, borderColor:"#13ae55", borderWidth:2 }}
            
          />
          <Feather
            name="upload"
            size={36}
            color={imgURI ? "green" : "black"}
            style={styles.icon}
          />
          <View style={styles.icon2}><Text style={{fontWeight:'bold', color:"#00ff00", textAlign:'center'}}>Enviar</Text></View>
          
          </TouchableOpacity>
        
        }



        {isUploading && (
       <View style={styles.uploadProgressContainer}>
       <ActivityIndicator size="large" color="#00ff00" />

   <Text style={{fontWeight:'bold', color:"#00ff00"}}> Enviando {progress} de 100% </Text>
 </View>
       )}

     

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 152,
    height: 152,
    borderRadius:80,
  
    
  },

  row: {
    
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  row2: {
   
    alignItems: "flex-start",
    justifyContent: 'flex-start',
   
  },
  uploadProgressContainer: {
    position: 'absolute',
    
    top: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#100934",
    opacity: 0.5,
    borderRadius:10,
    width: 150,
  },
  heading: {
    margin: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 40,
    height: 40,  
},
titulo: {
    fontWeight: 'bold',
    fontSize: 26,
},fotoDePerfil: {
    width: 120,
    height: 120,
    marginTop: 50,
    marginBottom: 20,
    borderRadius: 5,
},
icon: {
  position: 'absolute',
  right: "40%",
  top: 80,
},
icon2: {
  position: 'absolute',
  left: 15,
  width: 120,
  top: 120,
  backgroundColor:'white',
  opacity: 0.9,
  borderRadius:15
},
});