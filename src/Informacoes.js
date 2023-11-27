import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, push, set } from 'firebase/database';
import firebaseApp from './FirebaseDb';
import { useNavigation } from '@react-navigation/native';

const Informacoes = () => {
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('');
  const [telefone, setTelefone] = useState('');
  const [area, setArea] = useState('');
  const [cidade, setCidade] = useState('');
  const [mais, setMais] = useState('');
  const [descricao, setDescricao] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

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

    const base64Image = await convertToBase64(imageUri);

    const db = getDatabase(firebaseApp);
    const usersRef = ref(db, 'Usuarios');

    try {
      const newUserRef = push(usersRef);

      await set(newUserRef, {
        Imagem: base64Image,
        Name: name,
        Telefone: telefone,
        Area: area,
        Cidade: cidade,
        Mais: mais,
        Descricao: descricao,
        Email: email, // Novo campo de e-mail
      });

      console.log('Informações enviadas com sucesso para o Realtime Database como novo usuário.');
      setName('');
      setTelefone('');
      setArea('');
      setCidade('');
      setMais('');
      setDescricao('');
      setEmail('');
      setImageUri(null);

      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao enviar informações:', error);
    }
  };

  const convertToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={(text) => setTelefone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Area"
        value={area}
        onChangeText={(text) => setArea(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={(text) => setCidade(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mais"
        value={mais}
        onChangeText={(text) => setMais(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={(text) => setDescricao(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <TouchableOpacity onPress={chooseImage} style={styles.button}>
        <Text style={styles.buttonText}>Escolher Imagem</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={uploadImage} style={styles.button}>
        <Text style={styles.buttonText}>Continuar</Text>
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Informacoes;
