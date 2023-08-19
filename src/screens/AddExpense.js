/* eslint-disable prettier/prettier */

import {React, useEffect, useState} from 'react';
import {Button, RadioButton, Snackbar, Text, TextInput, useTheme} from 'react-native-paper';
import {Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleSave} from '../firebase/firebse_CRUD';

const AddExpense = () => {
    const theme = useTheme()
    const [date, setDate] = useState(new Date()); // date
    const [open, setOpen] = useState(false);
    const [ddopen, setddOpen] = useState(false);
    const [value, setValue] = useState(null); // category
    const [message, setMessage] = useState("");
    const [categoryList, setCategoryList] = useState([
        {label: 'Utility', value: 'Utility'},
        {
            label: 'Grocery',
            value: 'Grocery',
        },
    ]);
    const [title, setTitle] = useState();
    const [amount, setAmount] = useState();
    const [note, setNote] = useState();
    const [expenseList, setExpenseList] = useState([]);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const [limit, setLimit] = useState('');
    const [incomeList, setIncomeList] = useState([]);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@categoryList');
            let x = JSON.parse(jsonValue);
            // console.log("category List: ", jsonValue);
            if (x) {
                setCategoryList(x);
            }
            let prevExpenses = JSON.parse(await AsyncStorage.getItem('@expenses'));
            setExpenseList(prevExpenses);
        } catch (e) {
            console.log(e);
        }

        try {
            const jsonValue = await AsyncStorage.getItem('@incomeList');
            let x = JSON.parse(jsonValue);
            // console.log(x);
            setIncomeList(x);
        } catch (e) {
        }
    };

    const calculateMonthlyExpense = () => {
        // console.log(input);
        if (!expenseList) {
            return 0;
        }
        let filtered = [];
        // console.log("expenses:!!!", expenseList);
        for (let i = 0; i < expenseList.length; i++) {
            let monthCheck =
                new Date(expenseList[i].date).getMonth() === currentMonth;
            let yearCheck =
                new Date(expenseList[i].date).getFullYear() === currentYear;
            if (monthCheck && yearCheck) {
                filtered.push(expenseList[i]);
            }
        }
        let exp = 0;
        // console.log(456);
        for (let i = 0; i < filtered.length; i++) {
            // console.log(filtered[i].amount);
            exp += parseInt(filtered[i].amount);
        }
        // console.log("Monthly expense", exp);
        return exp;
    };

    useEffect(() => {
        getData();
    }, []);

    const calculateIncome = () => {
        let totalIncome = 0;
        // console.log(incomeList);
        if (incomeList) {
            incomeList.forEach(x => {
                // console.log(x);
                totalIncome += parseInt(x.amount);
            });
            // setTotalIncome(totalIncome);
            // console.log(totalIncome);
            return totalIncome;
        }
    };
    const handleAddExpense = async () => {
        // console.log(calculateMonthlyExpense());
        const limit = await AsyncStorage.getItem('@expenseLimit');

        if (title && amount && value) {
            // console.clear()
            // console.log("Limit: ",limit);
            // console.log("");
            // console.log(amount + calculateMonthlyExpense());
            if (parseInt(amount) <= calculateIncome() - calculateMonthlyExpense()) {
                if (parseInt(amount) + calculateMonthlyExpense() < parseInt(limit)) {
                    let prevExpenses = JSON.parse(
                        await AsyncStorage.getItem('@expenses'),
                    );
                    let expense;
                    if (prevExpenses) {
                        expense = [
                            ...prevExpenses,
                            {
                                title: title.trim(),
                                category: value,
                                note: note,
                                amount: amount,
                                date: date,
                            },
                        ];
                    } else {
                        expense = [
                            {
                                title: title.trim(),
                                category: value,
                                note: note,
                                amount: amount,
                                date: date,
                            },
                        ];
                    }

                    setExpenseList(expense);
                    try {
                        const jsonValue = JSON.stringify(expense);
                        await AsyncStorage.setItem('@expenses', jsonValue);

                        showSnackBar('Expense Added!!');
                    } catch (e) {
                        console.log(e);
                    }
                    // console.log(await AsyncStorage.getItem("@expenses"),

                    //clear form
                    setAmount('');
                    setTitle('');
                    setNote('');
                } else {
                    showSnackBar("Can't Add expense\n Expense Limit Exceeded");
                }
            } else {
                showSnackBar('Not enough income');
            }
        } else {
            showSnackBar('Enter title, amount and category!!');
        }
        handleSave(false);

        // alert(title, amount, date, value, note)
    };
    const [checked, setChecked] = useState('first');
    let i = 0

    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const showSnackBar = (msg) => {
        setMessage(msg)
        console.log(message)
        onToggleSnackBar()
        // setTimeout(onToggleSnackBar, 3000)
    }
    return (
        // <KeyboardAvoidingView
        //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        //     style={styles.container2}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
                <View style={{marginTop: 15}}>
                    <Text
                        style={{
                            // fontSize: 28,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                        }}
                        variant="titleLarge">
                        Add Expense
                    </Text>
                </View>
                <View style={{padding: 10}}>
                    <TextInput
                        mode="outlined"
                        label="Title"
                        placeholder="Enter title"
                        right={<TextInput.Affix text="required"/>}
                        style={{margin: 10}}
                        value={title}
                        onChangeText={e => {
                            setTitle(e.trim());
                        }}
                    />
                    <TextInput
                        mode="outlined"
                        label="Amount"
                        placeholder="Enter amount"
                        keyboardType="numeric"
                        right={<TextInput.Affix text="required"/>}
                        style={{margin: 10}}
                        value={amount}
                        onChangeText={e => {
                            setAmount(e.trim());
                        }}
                    />
                    <TextInput
                        multiline
                        numberOfLines={4}
                        mode="outlined"
                        label="Note"
                        placeholder="Enter note"
                        style={{margin: 10}}
                        onChangeText={e => {
                            setNote(e);
                        }}
                        value={note}
                    />
                    <Button
                        onPress={() => setOpen(true)}
                        mode="contained"
                        icon="calendar"
                        style={{margin: 10}}


                    >{date.toDateString()}</Button>
                    <DatePicker
                        mode="date"
                        modal={true}
                        open={open}
                        date={date}
                        onConfirm={date => {
                            setOpen(false);
                            setDate(date);
                        }}
                        onCancel={() => {
                            setOpen(false);
                        }}
                    />

                    <View style={{margin: 10, height: 200}}>
                        <Text  variant="titleMedium">Category</Text>

                        <ScrollView >
                            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}
                                               style={{padding: 2}}>


                                {categoryList ? categoryList.map(c =>

                                    (<View style={styles.container} key={i++}>
                                        <RadioButton value={c.value}></RadioButton>
                                        <Text>{c.label}</Text>

                                    </View>)
                                ) : null}
                            </RadioButton.Group>
                        </ScrollView>
                    </View>


                    <Button
                        icon="content-save"
                        mode="contained"
                        onPress={handleAddExpense}
                        style={{marginHorizontal: 50, margin: 50, marginTop: 25, padding: 5}}>ADD</Button>

                </View>
                <Snackbar
                    style={{marginBottom: -5,margin:25, alignContent: 'center'}}
                    duration={3000}
                    visible={visible}
                    icon="information-outline"
                    onDismiss={onDismissSnackBar}
                >
                    <View style={{backgroundColor: 'transparent', ...styles.centeredContent}}>
                        <Text style={{backgroundColor: 'transparent', ...styles.centeredContent}}>{message}</Text>
                    </View>

                </Snackbar>
            </View>

        </TouchableWithoutFeedback>
    )

};
const styles = StyleSheet.create({
    container: {

        flex: 1,
        padding: 0,
        flexDirection: "row",
        alignItems: "center"
    },
    container2: {
        flex: 1,
        flexDirection: "column",
    }, centeredContent: {
        alignItems: 'center',
        justifyContent: 'center',
        color: "black"
    },

});
export default AddExpense;
