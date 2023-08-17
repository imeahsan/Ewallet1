/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export const handleSave = logout => {
    let user = auth().currentUser;

    saveData(user).then(r => console.log('data saved'));
    if (logout) {
        clearData().then(() => console.log('data cleared'));
    }
};
export const saveData = async user => {
    let expenses = JSON.parse(await AsyncStorage.getItem('@expenses'));
    const limit = await AsyncStorage.getItem('@expenseLimit');
    const categories = JSON.parse(await AsyncStorage.getItem('@categoryList'));
    // const userName = auth().currentUser.displayName;
    const income = JSON.parse(await AsyncStorage.getItem('@incomeList'));
    // console.log("saving User Name ",userName);
    let currentUser = auth().currentUser;
    console.log(currentUser);
    let data = {
        userId: user.uid,
        expenseList: expenses,
        expenseLimit: limit,
        categoriesList: categories,
        incomeList: income,
    };

    await firestore()
        .collection('Users')
        .doc(user.uid)
        .set(data)
        .then(() => {
            console.log('data added!');
        });
};

export const clearData = async () => {
    await AsyncStorage.removeItem('@expenses');
    await AsyncStorage.removeItem('@expenseLimit');
    await AsyncStorage.removeItem('@categoryList');
    await AsyncStorage.removeItem('@incomeList');
};

export const getDataFromFirebase = async uid => {
    try {
        let user = await firestore().collection('Users').doc(uid).get();
        console.log(user._data.expenseLimit);
        // user = user._data;
        let expenseList = user._data.expenseList;
        expenseList = JSON.stringify(expenseList);

        let categoriesList = user._data.categoriesList;
        categoriesList = JSON.stringify(categoriesList);

        let incomeList = user._data.incomeList;
        incomeList = JSON.stringify(incomeList);
        console.log('incccc', incomeList);
        await AsyncStorage.setItem('@expenses', expenseList);
        await AsyncStorage.setItem('@expenseLimit', user._data.expenseLimit);
        await AsyncStorage.setItem('@categoryList', categoriesList);
        await AsyncStorage.setItem('@incomeList', incomeList);
    } catch (e) {
        console.log(e);
    }
};
