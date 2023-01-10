import { React, useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Button,
} from "react-native";
import DatePicker from "react-native-date-picker";
import DropDownPicker from "react-native-dropdown-picker";

import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddExpense = () => {
  const [date, setDate] = useState(new Date()); // date
  const [open, setOpen] = useState(false);
  const [ddopen, setddOpen] = useState(false);
  const [value, setValue] = useState(null);// category


  const [categoryList, setCategoryList] = useState([{ label: "Utility", value: "Utility" }, {
    label: "Grocery",
    value: "Grocery",
  }]);
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [note, setNote] = useState();
  const [expenseList, setExpenseList] = useState([]);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [limit, setLimit] = useState("");
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@categoryList");
      let x = JSON.parse(jsonValue);
      // console.log("category List: ", jsonValue);
      if (x){
        setCategoryList(x);

      }
      let prevExpenses = JSON.parse(await AsyncStorage.getItem("@expenses"));
      setExpenseList(prevExpenses);

    } catch (e) {
      console.log(e);
    }
  };

  const calculateMonthlyExpense = () => {
    // console.log(input);
    if (!expenseList){
      return 0
    }
    let filtered = [];
    // console.log("expenses:!!!", expenseList);
    for (let i = 0; i < expenseList.length; i++) {
      let monthCheck = new Date(expenseList[i].date).getMonth() === currentMonth;
      let yearCheck = new Date(expenseList[i].date).getFullYear() === currentYear;
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


  const handleAddExpense = async () => {
    // console.log(calculateMonthlyExpense());
    const limit = await AsyncStorage.getItem("@expenseLimit");

    if (title && amount && value) {
      // console.clear()
      // console.log("Limit: ",limit);
      // console.log("");
      // console.log(amount + calculateMonthlyExpense());
      if (parseInt(amount) + calculateMonthlyExpense() < parseInt(limit)) {
        let prevExpenses = JSON.parse(await AsyncStorage.getItem("@expenses"));
       let expense
        if (prevExpenses){
           expense = [...prevExpenses,  {
            "title": title.trim(),
            "category": value,
            "note": note,
            "amount": amount,
            "date": date,
          }];
        }else {
          expense = [ {
            "title": title.trim(),
            "category": value,
            "note": note,
            "amount": amount,
            "date": date,
          }];
        }


        setExpenseList(expense);
        try {
          const jsonValue = JSON.stringify(expense);
          await AsyncStorage.setItem("@expenses", jsonValue);
          alert("Expense Added!!");
        } catch (e) {
          console.log(e);
        }
        // console.log(await AsyncStorage.getItem("@expenses"),


        //clear form
        setAmount("");
        setTitle("");
        setNote("");
      } else {
        alert("Can't Add expense\n Expense Limit Exceeded");
      }


    } else {
      alert("Enter title, amount and category!!");
    }


    // alert(title, amount, date, value, note)

  };
  return (
    <ScrollView>
      <View style={{ marginTop: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            alignSelf: "center",
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
          value={title}

          onChangeText={(e) => {
            setTitle(e.trim());
          }}
        />
        <TextInput
          mode="outlined"
          label="Amount"
          placeholder="Enter amount"
          keyboardType="numeric"
          right={<TextInput.Affix text="required" />}
          style={{ margin: 10 }}
          value={amount}
          onChangeText={(e) => {
            setAmount(e.trim());
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
            setNote(e);
          }}
          value={note}
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
