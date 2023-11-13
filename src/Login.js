import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyC-sTNLSRresl1l8dEdHUap3MDnMa8olWg",
      authDomain: "tcc-01-14792.firebaseapp.com",
      databaseURL: "https://tcc-01-14792-default-rtdb.firebaseio.com",
      projectId: "tcc-01-14792",
      storageBucket: "tcc-01-14792.appspot.com",
      messagingSenderId: "432967975257",
      appId: "1:432967975257:web:890f1cf2373a70fa5d8c48"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Aqui, você realizará a autenticação no Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Login bem-sucedido!');
        // Redirecionar para a próxima tela após o login bem-sucedido
        navigation.navigate('Home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Código de erro: ${errorCode}, Mensagem de erro: ${errorMessage}`);
        
        // Se o erro for de autenticação, você pode lidar de forma específica aqui
        // Exemplo: exibir uma mensagem ao usuário informando que as credenciais estão incorretas
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Endereço de E-mail"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.registerText}>Não tem conta? Crie aqui</Text>
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
    fontSize: 16,
  },
  registerText: {
    marginTop: 10,
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Login;
