import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ref, get, getDatabase } from 'firebase/database';
import firebaseApp from './FirebaseDb';

const Empresas = () => {
  const [empresaData, setEmpresaData] = useState(null);

  useEffect(() => {
    const fetchEmpresaData = async () => {
      try {
        const db = getDatabase(firebaseApp);
        const empresaRef = ref(db, 'Empresas/1'); // ID da empresa que você quer visualizar

        const snapshot = await get(empresaRef);

        if (snapshot.exists()) {
          setEmpresaData(snapshot.val());
        } else {
          console.log('Nenhuma informação disponível para a empresa com o ID 1.');
        }
      } catch (error) {
        console.error('Erro ao buscar informações da empresa:', error);
      }
    };

    fetchEmpresaData();
  }, []);

  return (
    <View style={styles.container}>
      {empresaData ? (
        <View style={styles.informacoesEmpresa}>
          <Text>Nome: {empresaData.Name}</Text>
          <Text>Email: {empresaData.Email}</Text>
          <Text>Endereço: {empresaData.Endereco}</Text>
        </View>
      ) : (
        <Text>Nenhuma informação disponível para a empresa com o ID 1.</Text>
      )}
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
  informacoesEmpresa: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Empresas;
