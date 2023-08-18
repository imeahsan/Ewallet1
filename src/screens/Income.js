/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from "react";
// const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];
import {Button, ScrollView, StyleSheet, View} from "react-native";
import {DataTable, Text, TextInput} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {handleSave} from "../firebase/firebse_CRUD";

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
            if (incomeList) {
                li = [...incomeList, {date: Date.now(), amount: newIncome}];

            } else {
                li = [{date: Date.now(), amount: newIncome}];

            }

            try {
                const jsonValue = JSON.stringify(li);
                await AsyncStorage.setItem("@incomeList", jsonValue);
                // alert("Income Added");
                handleSave(false);
                setNewIncome('');
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
        handleSave(false);
        setLimit('')

    };

    const calculateIncome = () => {
        let totalIncome = 0;
        // console.log(incomeList);
        if (incomeList) {
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

    try {

        return (
            <ScrollView style={{margin: 5}}>
                <View style={{marginTop: 15}}>
                    <Text
                        style={{
                            fontSize: 28,
                            fontWeight: "bold",
                            alignSelf: "center",
                        }}>
                        Income
                    </Text>
                </View>
                <View style={{alignItems: "center"}}>
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
                        keyboardType="number-pad"
                        placeholder="Income Amount"
                        style={{marginTop: 5, marginBottom: 5}}
                        right={<TextInput.Affix text="required"/>}
                        value={newIncome}
                        onChangeText={(e) => {
                            setNewIncome(e.trim());
                        }}
                    />
                    <Button title="Add Income Amount" onPress={addIncome}/>
                    <TextInput
                        label={"Expense Limit"}
                        keyboardType="numeric"
                        value={limit}
                        placeholder="Expense Limit"
                        right={<TextInput.Affix text="required"/>}
                        style={{marginTop: 5, marginBottom: 5}}
                        onChangeText={(e) => {
                            setLimit(e.trim());
                        }}
                    />
                    <Button title="Set Limit" onPress={handleLimitChange}></Button>
                </View>
                <View>
                    <Text variant="titleLarge" style={{marginTop: 25}}>
                        Total Income : {totalIncome}
                    </Text>

                    <Text variant="titleLarge" style={{marginTop: 25}}>
                        Expense limit: {expenseLimit}
                    </Text>
                </View>
                <View>
                    <Text variant="titleLarge" style={{marginTop: 25}}>
                        Income History
                    </Text>
                    <DataTable style={{marginTop: 5, height: 300}}>

                          <DataTable.Header>
                              <DataTable.Title>Date</DataTable.Title>

                              <DataTable.Title numeric>Amount</DataTable.Title>
                          </DataTable.Header>
                        <ScrollView>
                          {incomeList ? incomeList.map(inc => (
                              <DataTable.Row key={incomeID++}>
                                  <DataTable.Cell>{Date(inc.date).substring(4, 15)}</DataTable.Cell>

                                  <DataTable.Cell numeric>{inc.amount}</DataTable.Cell>
                              </DataTable.Row>
                          )) : null
                          }


                      </ScrollView>
                    </DataTable>
                </View>

            </ScrollView>
        );
    } catch (e) {

    }
};
const Circle = () => {
    return <View style={styles.circle}/>;
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
