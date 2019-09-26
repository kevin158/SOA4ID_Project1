import { createStackNavigator } from 'react-navigation';
import App1 from './App1';
import App2 from './App2';

const AppNavigator = createStackNavigator({
    App1: { screen: App1 },
    App2: { screen: App2},
});

export default AppNavigator;