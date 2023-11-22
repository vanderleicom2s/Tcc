//ta dando erro da hr de enviar as images =)

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadString, getDownloadURL } from '@react-native-firebase/storage';

const ImageScreen = () => {
  const [imageUri, setImageUri] = useState(null);

  const chooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.error('Permissão de acesso à biblioteca de mídia negada.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      console.warn('Selecione uma imagem primeiro.');
      return;
    }

    const storage = getStorage();
    const imageRef = ref(storage, 'imagens/' + new Date().getTime());

    try {
      const imageSnapshot = await uploadString(imageRef, imageUri, 'data_url');
      const downloadURL = await getDownloadURL(imageSnapshot.ref);

      console.log('Imagem enviada com sucesso. URL:', downloadURL);

      // Aqui você pode realizar outras ações, como salvar a URL no banco de dados.
    } catch (error) {
      console.error('Erro ao enviar a imagem:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload de Imagem</Text>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <TouchableOpacity onPress={chooseImage} style={styles.button}>
        <Text style={styles.buttonText}>Escolher Imagem</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={uploadImage} style={styles.button}>
        <Text style={styles.buttonText}>Enviar Imagem</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ImageScreen;
