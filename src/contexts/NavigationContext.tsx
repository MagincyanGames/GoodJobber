import React, { createContext, useContext, ReactNode } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
};

interface NavigationContextType {
  navigationRef: React.RefObject<NavigationContainerRef<RootStackParamList> | null>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const navigationRef =
    React.useRef<NavigationContainerRef<RootStackParamList>>(null);

  return (
    <NavigationContext.Provider value={{ navigationRef }}>
      <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

export const navigationStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
