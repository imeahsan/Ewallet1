import * as React from 'react';
import {View} from 'react-native';
import {BottomNavigation, Text} from 'react-native-paper';
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
    {key: 'income', title: 'Income', focusedIcon: 'wallet'},
    {key: 'add', title: 'Add', focusedIcon: 'plus-box'},

    {key: 'categories', title: 'Categories', focusedIcon: 'shape'},
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

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
    // <Login />
    // <SignUp />
  );
};

export default Main;
