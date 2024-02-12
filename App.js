import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/components/navigator';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/components/firebase'; // Certifique-se de que este caminho está correto


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsAuthenticated(!!user);
    });

    return unsubscribe; // Desinscreva-se ao desmontar
  }, []);

  // Enquanto o estado de autenticação está sendo verificado, pode retornar null ou um componente de carregamento
  if (isAuthenticated === null) {
    return null; // Ou um componente de carregamento
  }

  return (
    <NavigationContainer>
      <AppNavigator isAuthenticated={isAuthenticated} />
    </NavigationContainer>
  );
}
