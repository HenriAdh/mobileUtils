import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import { HomePage } from './pages/home';
import { ViaCep } from './pages/viaCep';
import { PricePage } from './pages/price';
import { WeatherPage } from './pages/weather';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const Routes = () => {
    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName='HOME'>
                <Tab.Screen
                    name='HOME'
                    component={HomePage}
                    options={{
                        headerShown: false,
                        //tabBarShowLabel: false,
                        tabBarIcon: ({focused, size, color}) => {
                            return <Ionicons size={size} color={color} name={focused ? 'home' : 'home-outline'} />
                        }
                    }}
                />
                <Tab.Screen
                    name='CEP'
                    component={ViaCep}
                    options={{
                        headerShown: false,
                        //tabBarShowLabel: false,
                        tabBarIcon: ({focused, size, color}) => {
                            return <Ionicons size={size} color={color} name={focused ? 'location' : 'location-outline'} />
                        }
                    }}
                />
                <Tab.Screen
                    name='PRICE'
                    component={PricePage} 
                    options={{
                        headerShown: false,
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? 'red' : color, fontSize: 10 }}>Price</Text>
                        ),
                        //tabBarShowLabel: false,
                        tabBarIcon: ({focused, size, color}) => {
                            return <Ionicons size={size} color={focused ? 'red' : color} name={focused ? 'cash' : 'cash-outline'} />
                        }
                    }}
                />
                <Tab.Screen
                    name='Weather'
                    component={WeatherPage} 
                    options={{
                        headerShown: false,
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? '#000' : color, fontSize: 10 }}>Weather</Text>
                        ),
                            //tabBarShowLabel: false,
                        tabBarIcon: ({focused, size, color}) => {
                            return <Ionicons size={size} color={focused ? '#333' : color} name={focused ? 'cloud' : 'cloud-outline'} />
                        }
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Routes;