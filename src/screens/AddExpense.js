import { React, useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddExpense = () => {
  const [date, setDate] = useState(new Date()); // date
  const [open, setOpen] = useState(false);
  const [ddopen, setddOpen] = useState(false);
  const [value, setValue] = useState(null);// category


  const [categoryList, setCategoryList] = useState([]);
  const [title, setTitle] = useState()
  const [amount, setAmount] = useState()
  const [note, setNote] = useState()
  const [expenseList, setExpenseList] = useState([])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@categoryList')
      let x = JSON.parse(jsonValue)
      console.log('category List: ', jsonValue);
      setCategoryList(x)

    } catch (e) {
      console.log(e);
    }
  }


  useEffect(() => {
    getData()


  }, [])



  const handleAddExpense = () => {

    let expense = [...expenseList, { 'title': title, 'category': value, 'note': note, 'amount': amount, 'date': date }]

    setExpenseList(expense)

    console.log(expenseList);


    // alert(title, amount, date, value, note)

  }
  return (
    <ScrollView>
      <View style={{ marginTop: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          Add Expense
        </Text>
      </View>
      <View style={{ marginTop: 50, padding: 10 }}>
        <TextInput
          mode="outlined"
          label="Title"
          placeholder="Enter title"
          right={<TextInput.Affix text="required" />}
          style={{ margin: 10 }}
          onChangeText={(e) => {
            setTitle(e.trim())
          }}
        />
        <TextInput
          mode="outlined"
          label="Amount"
          placeholder="Enter amount"
          keyboardType="numeric"
          right={<TextInput.Affix text="required" />}
          style={{ margin: 10 }}
          onChangeText={(e) => {
            setAmount(e.trim())
          }}
        />
        <SafeAreaView>
          <DropDownPicker
            open={ddopen}
            value={value}
            items={categoryList}
            setOpen={setddOpen}
            setValue={setValue}
            setItems={setCategoryList}
            style={{
              backgroundColor: "white",

            }}

            placeholder="Select Category"
          />
        </SafeAreaView>
        <Button
          title="Select Date From"
          onPress={() => setOpen(true)}
          style={{ marginTop: 5, marginBottom: 5 }}
        />
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
        <TextInput
          multiline
          numberOfLines={4}
          mode="outlined"
          label="Note"
          placeholder="Enter note"
          style={{ margin: 10 }}
          onChangeText={(e) => {
            setNote(e.trim())
          }}
        />

        <Button
          icon="content-save"
          title="Save"
          mode="contained"
          onPress={handleAddExpense}
          style={{ marginHorizontal: 50, margin: 50, padding: 5 }}>

        </Button>
      </View>
    </ScrollView>
  );
};

export default AddExpense;
