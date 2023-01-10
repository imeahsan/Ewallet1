import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Button,
  View,
} from "react-native";
import { Text, TextInput, DataTable } from "react-native-paper";
import {

  ProgressChart,

} from "react-native-chart-kit";
// const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];
import { Dimensions } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

let income = [{
  date: Date.now(),
  amount: 0,
}, {
  date: Date.now(),
  amount: 50,
},

];


// const screenWidth = Dimensions.get("window").width;
const Income = () => {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@incomeList");
      let x = JSON.parse(jsonValue);
      // console.log(x);
      setIncomeList(x);

      const limit = await AsyncStorage.getItem("@expenseLimit");
      // console.log(limit);
      limit ? setExpenseLimit(limit) : setExpenseLimit("Not Set");
    } catch (e) {
      // error reading value
    }
  };

  const [expenseLimit, setExpenseLimit] = useState("");

  const [limit, setLimit] = useState("");
  let [newIncome, setNewIncome] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [incomeList, setIncomeList] = useState([]);
  useEffect(() => {
    getData();


  }, []);
  useEffect(() => {
    calculateIncome();


  });
  const addIncome = async () => {
    if (newIncome) {
      let li;
      if (incomeList){
        li = [...incomeList, { date: Date.now(), amount: newIncome }];

      }else {
         li = [ { date: Date.now(), amount: newIncome }];

      }

      try {
        const jsonValue = JSON.stringify(li);
        await AsyncStorage.setItem("@incomeList", jsonValue);
        alert("Income Added");
        getData();
      } catch (e) {
        // saving error
      }
    } else {
      alert("Enter Income!!");
    }
  };

  const handleLimitChange = async () => {
    await AsyncStorage.setItem("@expenseLimit", limit);
    setExpenseLimit(limit);


  };

  const calculateIncome = () => {
    let totalIncome = 0;
    // console.log(incomeList);
    if (incomeList){
      incomeList.forEach((x) => {
        // console.log(x);
        totalIncome += parseInt(x.amount);
      });
      setTotalIncome(totalIncome);
      // console.log(totalIncome);
      return totalIncome;
    }

  };

  let incomeID = 0;


  return (
    <ScrollView style={{ margin: 5 }}>
      <Text
        variant="titleLarge"
        style={{ marginTop: 5, marginBottom: 5, marginLeft: 5 }}>
        Income
      </Text>
      <View style={{ alignItems: "center" }}>
        {/* <ProgressChart
          data={data}
          width={screenWidth}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
        /> */}
      </View>
      <View>
        <TextInput
          label={"Amount"}
          placeholder="Income Amount"
          style={{ marginTop: 5, marginBottom: 5 }}
          right={<TextInput.Affix text="required" />}
          value={newIncome}
          onChangeText={(e) => {
            setNewIncome(e.trim());
          }}
        />
        <Button title="Add Amount" onPress={addIncome} />
        <TextInput
          label={"Expense Limit"}
          placeholder="Expense Limit"
          right={<TextInput.Affix text="required" />}
          style={{ marginTop: 5, marginBottom: 5 }}
          onChangeText={(e) => {
            setLimit(e.trim());
          }}
        />
        <Button title="Set Limit" onPress={handleLimitChange}></Button>
      </View>
      <View>
        <Text variant="titleLarge" style={{ marginTop: 50 }}>
          Total Income : {totalIncome}
        </Text>

        <Text variant="titleLarge" style={{ marginTop: 50 }}>
          Expense limit: {expenseLimit}
        </Text>
      </View>
      <View>
        <Text variant="titleLarge" style={{ marginTop: 50 }}>
          Income History
        </Text>
        <DataTable style={{ marginTop: 5 }}>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>

            <DataTable.Title numeric>Amount</DataTable.Title>
          </DataTable.Header>

          {incomeList ? incomeList.map(inc => (
            <DataTable.Row key={incomeID++}>
              <DataTable.Cell>{Date(inc.date).substring(4, 15)}</DataTable.Cell>

              <DataTable.Cell numeric>{inc.amount}</DataTable.Cell>
            </DataTable.Row>
          )) : null
          }


        </DataTable>
      </View>
      <Text variant="titleLarge" style={{ marginTop: 50 }}>
        Total Income
      </Text>
    </ScrollView>
  );
};
const Circle = () => {
  return <View style={styles.circle} />;
};

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "red",
  },
});
export default Income;
