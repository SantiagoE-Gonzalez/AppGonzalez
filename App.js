import TabNavigator from './Navigator/index';

export default function App() {
  /**Devuelvo el Main Navigator.
   * En el MainNavigator aclaro como va a ser la navegación de la aplicacion.
   * Es decir, aparece primero tal pantalla, si aprieto un boton aparece otra, y de ahí otra.
   * Es un "stack" o pila donde se apilan las pantallas.
   */
  return (
    <TabNavigator/>
  );
}
