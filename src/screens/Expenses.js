/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from "react";
import {Dimensions, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Button, DataTable, Dialog, Portal, Text, TextInput} from "react-native-paper";
import {PieChart} from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";


const screenWidth = Dimensions.get("window").width;


const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};


const colors = ["#800000", "#FF00FF", "#008000", "#808000", "#808080", "#000080", "#00FF00", "#C0C0C0", "#FF0000", "#800080", "#FFFF00", "#0000FF", "#008080", "#00FFFF", "#8a2be2", "#a52a2a", "#deb887", "#5f9ea0", "#ff7f50", "	#006400", "#ff8c00", "#ffd700", "#daa520", "#adff2f", "#ffb6c1", "#ffa07a", "#20b2aa", "#ff4500"];


const Expenses = () => {

    const [chartData, setChartData] = useState();
    const [expenseList, setExpenseList] = useState([]);
    const [filteredExpenseList, setFilteredExpenseList] = useState([{}]);
    const [visible, setVisible] = React.useState(false);
    /// modal data
    const [Title, setTitle] = useState("");
    const [modalDate, setModalDate] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");

    const [filterInput, setFilterInput] = useState("");
    const displayModal = (e) => {
        setTitle(e.title);
        setModalDate(e.date);
        setCategory(e.category);
        setAmount(e.amount);
        setNote(e.note);
        showModal();
    };

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [categoryList, setCategoryList] = useState([]);
    const getExpenseData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@expenses");
            console.log(jsonValue)
            let x = JSON.parse(jsonValue);
            setExpenseList(x);
            setFilteredExpenseList(x);
            // generateChartData()
            generateChartData();
        } catch (e) {
            console.error(e);
        }
    };

    const getCategoryData = async () => {
        try {
            const jsonValue = AsyncStorage.getItem("@categoryList").then((value) => {
                setCategoryList(JSON.parse(value));
                console.log("Category: ", value);
            });


        } catch (e) {
            console.error(e);
        }
    };

    const getData = () => {
        try {
            getCategoryData()
                .then(r => getExpenseData());
                // setTimeout(() =>,1000);

        } catch (e) {
            console.error(e.message);
        }
    }


    const getExpenseByCategory = (input) => {
        let filtered = [];
        for (let i = 0; i < expenseList.length; i++) {

            let check = expenseList[i].category.includes(input);
            if (check) {
                filtered.push(expenseList[i]);
            }
        }
        let exp = 0;
        for (let i = 0; i < filtered.length; i++) {
            exp += parseInt(filtered[i].amount);
        }
        // console.log("expense", exp);
        return exp;

    };

    const generateChartData = () => {

      if (expenseList.length>0 && categoryList.length>0){
          let x = [];

          for (let i = 0; i < categoryList.length; i++) {
              let item = {
                  legendFontSize: 15,
              };
              item.name = categoryList[i].label;
              item.legendFontColor = colors[i];
              item.color = colors[i];
              item.amount = getExpenseByCategory(categoryList[i].label);


              x.push(item);
          }

          setChartData(x);
      }
        console.log("chart Data: ", chartData)
    };
    useEffect(() => {

        getData();

    }, []);

    useEffect(() => {

       generateChartData();

    }, [categoryList, expenseList]);


    const filterList = (input) => {
        input = input.toLowerCase();
        let filtered = [];
        for (let i = 0; i < expenseList.length; i++) {
            let amount = expenseList[i].amount.toLowerCase().includes(input);
            let date = new Date(expenseList[i].date).toString().substr(0, 24).includes(input);
            let title = expenseList[i].title.toLowerCase().includes(input);
            let category = expenseList[i].category.includes(input);

            if (amount || date || title || category) {
                filtered.push(expenseList[i]);
            }
        }
        setFilteredExpenseList(filtered);

    };
    let expensekey = 0;


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <ScrollView>
                <Portal>

                    <Dialog visible={visible} onDismiss={hideModal}>
                        <Dialog.Title>Title: {Title}</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">Date:{new Date(modalDate).toString().substr(0, 24)}</Text>
                            <Text variant="bodyMedium">Category: {category}</Text>
                            <Text variant="bodyMedium">Amount: {amount}</Text>
                            <Text variant="bodyMedium">Note: {note}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideModal}>Close</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

                <View style={{margin: 5, padding: 10}}>

                    <View style={{marginTop: 15}}>
                        <Text
                            style={{
                                // fontSize: 28,
                                fontWeight: "bold",
                                alignSelf: "center",
                            }}
                            variant="titleLarge">
                            Expenses
                        </Text>
                    </View>
                    <View style={{alignItems: "center"}}>
                        {/* <Circle></Circle> */}
                        {chartData ? <TouchableWithoutFeedback onPress={generateChartData}>
                                <PieChart
                                    data={chartData}
                                    width={screenWidth}
                                    height={175}
                                    chartConfig={chartConfig}
                                    accessor={"amount"}
                                    backgroundColor={"transparent"}
                                    paddingLeft={"15"}
                                    center={[10, 10]}
                                    absolute
                                />
                            </TouchableWithoutFeedback>
                            : null


                        }

                    </View>
                    <Text variant="titleMedium" style={{marginTop: 5}}>
                        Apply Filters
                    </Text>


                    <TextInput
                        label="Filters"
                        placeholder="Category, title, description"
                        style={{marginTop: 5}}
                        value={filterInput}
                        onChangeText={(e) => {
                            setFilterInput(e)
                            filterList(e);

                        }}
                        right={<TextInput.Icon icon="close" onPress={() => {
                            setFilterInput("")
                            filterList("");

                        }}/>}

                    />
                    <Text variant="titleMedium" style={{marginTop: 25}}>
                        Expense History
                    </Text>

                    <View>

                        <DataTable style={{marginTop: 5, height: filteredExpenseList ? 250 : 50}}>
                            <DataTable.Header>
                                <DataTable.Title>Date</DataTable.Title>

                                <DataTable.Title>Category</DataTable.Title>
                                <DataTable.Title>Title</DataTable.Title>
                                <DataTable.Title numeric>Amount</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>

                                {filteredExpenseList ?
                                    filteredExpenseList.map((e) => (
                                        <TouchableOpacity onPress={() => {
                                            displayModal(e);
                                        }} key={expensekey++} on>
                                            <DataTable.Row>
                                                <DataTable.Cell>{new Date(e.date).toString().substr(4, 6)}</DataTable.Cell>

                                                <DataTable.Cell>{e.category}</DataTable.Cell>
                                                <DataTable.Cell> {e.title}</DataTable.Cell>

                                                <DataTable.Cell numeric>{e.amount}</DataTable.Cell>
                                            </DataTable.Row>

                                        </TouchableOpacity>
                                    )) : null}


                            </ScrollView>
                        </DataTable>
                        {filteredExpenseList ? null : <Text>No record found</Text>
                        }
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>

    );
};


export default Expenses;
