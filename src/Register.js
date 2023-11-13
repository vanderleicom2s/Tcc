import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebase from './firesebase';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      setIsFormValid(email.trim() !== '' && password.trim() !== '');
    };

    validateForm();
  }, [email, password]);

  const handleRegister = async () => {
    if (!isFormValid) {
      Alert.alert('Campos Vazios', 'Por favor, preencha todos os campos.');
      return;
    }

    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      navigation.navigate('Curriculo');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Código de erro: ${errorCode}, Mensagem de erro: ${errorMessage}`);
      Alert.alert('Erro ao Registrar', 'Ocorreu um erro ao criar a conta. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleRegister} disabled={!isFormValid}>
        <View style={[styles.button, { backgroundColor: isFormValid ? 'blue' : 'gray' }]}>
          <Text style={styles.buttonText}>Registrar</Text>
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Register;
