import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopScreen from './screens/ShopScreen';
import ThreatScreen from './screens/ThreatScreen';
import { store } from './store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Список угроз' component={ShopScreen} />
                    <Stack.Screen name='Угроза' component={ThreatScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}