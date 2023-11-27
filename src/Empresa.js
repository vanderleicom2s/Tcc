import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getDatabase, ref, get, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import uuidv4 from 'uuid/v4'; 

import firebaseApp from './FirebaseDb';

const Empresa = () => {
  const [data, setData] = useState(null);
  const [currentId, setCurrentId] = useState(1);
  const [showDescription, setShowDescription] = useState(false);

  const fetchData = async (id) => {
    try {
      const db = getDatabase(firebaseApp);
      const empresaRef = ref(db, `Empresas/${id}`);
      const snapshot = await get(empresaRef);

      if (snapshot.exists()) {
        setData(snapshot.val());
        setShowDescription(false);
      } else {
        console.log(`Nenhuma empresa encontrada para o ID ${id}.`);
      }
    } catch (error) {
      console.error('Erro ao buscar informações da empresa:', error);
    }
  };

  const handleNext = () => {
    setCurrentId(currentId + 1);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleLike = async () => {
    if (!data || !data.Nome) {
      console.warn('Empresa não encontrada.');
      return;
    }

    const empresaName = data.Nome; // Nome da empresa exibido em tela
    const db = getDatabase(firebaseApp);

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.log('Nenhum usuário logado');
      return;
    }

    const userEmail = user.email;


    // Buscar informações do usuario no nó Usuarios
    const usuariosRef = ref(db, `Usuarios`);
    const usuariosSnapshot = await get(usuariosRef);

    if (!usuariosSnapshot.exists()) {
      console.log('Nenhum dado encontrado na referência Usuarios.');
      return;
    }

    let usuarioData = null;

    usuariosSnapshot.forEach((usuarioSnapshot) => {
      const data = usuarioSnapshot.val();
      console.log('Email encontrado no banco:', data.Email);

      //Comparar Email do auth com o realtime
      if (data.Email && data.Email.toLowerCase() === userEmail.toLowerCase()) {
        usuarioData = data;
        return;  // Interrompe o loop quando o e-mail é encontrado
      }
    });

    if (!usuarioData) {
      console.log(`Nenhuma informação encontrada para o usuário com o e-mail ${userEmail}`);
      return;
    }

    // Criar uma URL aleatória usando o pacote uuid
    const randomUrl = uuidv4();

    // Troca caracter invalido no nó Meet
    const sanitizedEmail = userEmail.replace(/[.@]/g, '_');

    // Adiciona as informações do usuário ao nó "Meet"
    const meetRef = ref(db, `Meet/${empresaName}/${sanitizedEmail}`);
    await set(meetRef, {
      email: usuarioData.Email,
      telefone: usuarioData.Telefone,
      area: usuarioData.Area || '',
      cidade: usuarioData.Cidade || '',
      descricao: usuarioData.Descricao || '',
      mais: usuarioData.Mais || '',
      name: usuarioData.Name || '',
      imagem: usuarioData.Imagem || '',
      // Adicione outros campos conforme necessário
    });

  };

  useEffect(() => {
    fetchData(currentId);
  }, [currentId]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {data && (
          <Image source={{ uri: data.ImageUrl }} style={styles.image} />
        )}
        <Text style={styles.name}>{data?.Nome}</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {showDescription && data && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Descrição: {data.Descricao}</Text>
            <Text style={styles.descriptionText}>Email: {data.Email}</Text>
            <Text style={styles.descriptionText}>Telefone: {data.Telefone}</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleDescription}>
          <Text style={styles.buttonText}>Descrição</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLike}>
          <Text style={styles.buttonText}>{data?.Funfo || 'Like'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  descriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Empresa;
