import ShopProvider from './Context/ShopProvider';
import TabNavigator from './Navigators';

export default function App() {
  return (
    <ShopProvider>
      <TabNavigator></TabNavigator>
    </ShopProvider>
      
  );
}