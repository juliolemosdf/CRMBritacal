import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from "firebase";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = result => {
    return new Promise((resolve, reject) => {
      
      const metadata = { contentType: "image/jpg" };
      const sessionId = new Date().getTime();
      const storage = firebase.storage();
      const imageRef = storage.ref("images").child(`julio.jpg`);
      imageRef
        .put(image, metadata)
        .then(snapshot => {
          console.log("uploaded image!");
        })
        .then(() => {
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      <Button title="uPload" onPress={uploadImage} />
    </View>
  );
}