import { ThemeProvider } from 'react-native-rapi-ui';
import { AuthProvider } from './src/provider/AuthProvider';
import { useColorScheme } from 'react-native';
import Navigation from './src/navigation';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <ThemeProvider theme={useColorScheme()}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
      <Toast />
    </ThemeProvider>
  );
}
