import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { ref, set, get, getDatabase } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC-sTNLSRresl1l8dEdHUap3MDnMa8olWg",
  authDomain: "tcc-01-14792.firebaseapp.com",
  databaseURL: "https://tcc-01-14792-default-rtdb.firebaseio.com",
  projectId: "tcc-01-14792",
  storageBucket: "tcc-01-14792.appspot.com",
  messagingSenderId: "432967975257",
  appId: "1:432967975257:web:890f1cf2373a70fa5d8c48"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

const Profile = () => {
  const [inputID, setInputID] = useState(0);
  const [inputName, setInputName] = useState('');
  const [inputTel, setInputTel] = useState('');
  const [inputArea, setInputArea] = useState('');
  const [inputCidade, setInputCidade] = useState('');
  const [inputMais, setInputMais] = useState('');
  const [inputEmail, setInputEmail] = useState(''); // Adicione campo de Email
  const [inputSenha, setInputSenha] = useState(''); // Adicione campo de Senha

  const db = getDatabase();
  const auth = getAuth(); // Obtém a instância de autenticação

  useEffect(() => {
    const fetchNextUserId = async () => {
      const userRef = ref(db, 'Usuarios');
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const userIds = Object.keys(data);
        const maxId = Math.max(...userIds);
        setInputID(maxId + 1);
      } else {
        setInputID(1);
      }
    };

    fetchNextUserId();
  }, []);

  const handleSendData = async () => {
    try {
      // Primeiro, crie o usuário na autenticação com email e senha
      const userCredential = await createUserWithEmailAndPassword(auth, inputEmail, inputSenha);

      // Em seguida, obtenha o ID do usuário criado na autenticação
      const userId = userCredential.user.uid;

      // Em seguida, envie as informações restantes para o Realtime Database
      const userRef = ref(db, `Usuarios/${userId}`);

      await set(userRef, {
        Name: inputName,
        tel: inputTel,
        Area: inputArea,
        Cidade: inputCidade,
        Mais: inputMais,
      });

      console.log('Informação enviada com sucesso para a Realtime Database e o usuário foi criado na autenticação!');
      setInputID(0);
      setInputName('');
      setInputTel('');
      setInputArea('');
      setInputCidade('');
      setInputMais('');
      setInputEmail('');
      setInputSenha('');

      alert("Dados adicionados com sucesso");
    } catch (error) {
      console.error('Erro ao enviar informação:', error);
      alert("Erro ao adicionar dados ou criar usuário");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={inputName}
        onChangeText={(text) => setInputName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={inputTel}
        onChangeText={(text) => setInputTel(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Área"
        value={inputArea}
        onChangeText={(text) => setInputArea(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={inputCidade}
        onChangeText={(text) => setInputCidade(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mais"
        value={inputMais}
        onChangeText={(text) => setInputMais(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={inputEmail}
        onChangeText={(text) => setInputEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={inputSenha}
        onChangeText={(text) => setInputSenha(text)}
        secureTextEntry={true} // Para ocultar a senha
      />
      <TouchableOpacity onPress={handleSendData}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Continuar</Text>
        </View>
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Profile;
