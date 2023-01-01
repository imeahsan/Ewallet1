import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import AddExpense from './screens/AddExpense';
import Categories from './screens/Categories';
import Expenses from './screens/Expenses';
import Income from './screens/Income';
import profile from './screens/UpdateProfile';
import Login from './screens/Login';
import SignUp from './screens/Signup';
// routes
const ExpensesRoute = Expenses;
const IncomeRoute = Income;
const AddRoute = AddExpense;
const CategoriesRoute = Categories;
const ProfileRoute = profile;

const Main = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'expenses',
      title: 'Expenses',
      focusedIcon: 'cash-multiple',
    },
    { key: 'income', title: 'Income', focusedIcon: 'wallet' },
    { key: 'add', title: 'Add', focusedIcon: 'plus-box' },

    { key: 'categories', title: 'Categories', focusedIcon: 'shape' },
    {
      key: 'profile',
      title: 'profile',
      focusedIcon: 'account',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    expenses: ExpensesRoute,
    income: IncomeRoute,
    add: AddRoute,

    categories: CategoriesRoute,
    profile: ProfileRoute,
  });
  const Stack = createNativeStackNavigator();
  const Nav = () => {
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    )
  }
  return (


    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="nav" component={Nav} />



        <Stack.Screen name="signup" component={SignUp} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
