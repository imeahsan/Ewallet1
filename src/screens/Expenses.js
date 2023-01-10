import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Button,
  FlatList,
  View,
  Touchable,
  TouchableOpacity,SectionList
} from "react-native";
import DatePicker from "react-native-date-picker";
import { Text, TextInput, Card, Badge } from "react-native-paper";
import { Modal, Portal, Provider } from "react-native-paper";

import { DataTable } from "react-native-paper";
import {

  PieChart,

} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "@react-native-firebase/auth";




const screenWidth = Dimensions.get("window").width;


const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};
const data = [
  {
    name: "Seoul",
    population: 2150000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },

  {
    name: "New York",
    population: 8538000,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];

const colors = ["#800000", "#FF00FF", "#008000", "#808000", "#808080", "#000080", "#00FF00", "#C0C0C0", "#FF0000", "#800080", "#FFFF00", "#0000FF", "#008080", "#00FFFF", "#8a2be2", "#a52a2a", "#deb887", "#5f9ea0", "#ff7f50", "	#006400", "#ff8c00", "#ffd700", "#daa520", "#adff2f", "#ffb6c1", "#ffa07a", "#20b2aa", "#ff4500"];


const Expenses = () => {

  const [chartData, setChartData] = useState([]);

  const [expenseList, setExpenseList] = useState();
  const [filteredExpenseList, setFilteredExpenseList] = useState();

  const [visible, setVisible] = React.useState(false);


  /// modal data

  const [Title, setTitle] = useState("");
  const [modalDate, setModalDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  // const [filterInput, setFilterInput] = useState("");

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
  const containerStyle = { backgroundColor: "grey", padding: 20 };
  const [categoryList, setCategoryList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getExpenseData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@expenses");
      let x = JSON.parse(jsonValue);
      // console.log(x);
      setExpenseList(x);
      setFilteredExpenseList(x);

    } catch (e) {
      console.log(e);
    }
  };

  const getCategoryData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@categoryList");
      let x = JSON.parse(jsonValue);
      // console.log("category List: ", jsonValue);
      setCategoryList(x);
// generateChartData()
      console.log(await firebase.auth().currentUser);

    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    getCategoryData();
    getExpenseData();

    // console.log('await', expenseList);//
  }, []);


  const getExpenseByCategory = (input) => {
    // console.log(input);
    let filtered = [];
    for (let i = 0; i < expenseList.length; i++) {

      let check = expenseList[i].category.includes(input);
      if (check) {
        filtered.push(expenseList[i]);
      }
    }
    let exp = 0;
    // console.log(456);
    for (let i = 0; i < filtered.length; i++) {
      exp += parseInt(filtered[i].amount);
    }
    // console.log("expense", exp);
    return exp;

  };
  const generateChartData = () => {

    let x = [];

    for (let i = 0; i < categoryList.length; i++) {
      let item = {
        legendFontSize: 15,
      };
      item.name = categoryList[i].label;
      item.legendFontColor = colors[i];
      item.color = colors[i];
      // console.log("data");
      // console.log(getExpenseByCategory(categoryList[i].label));
      item.amount = getExpenseByCategory(categoryList[i].label);
      // console.log(1);
      // console.log("item", item);//
      // console.log(2);

      x.push(item);


    }
    // console.log(x);
    // console.log("45", x);
    setChartData(x);


  };


  const filterList = (input) => {
    let filtered = [];
    for (let i = 0; i < expenseList.length; i++) {
      let amount = expenseList[i].amount.includes(input);
      let date = new Date(expenseList[i].date).toString().substr(0, 24).includes(input);
      let title = expenseList[i].title.includes(input);
      let category = expenseList[i].category.includes(input);

      if (amount || date || title || category) {
        filtered.push(expenseList[i]);
      }
    }
    setFilteredExpenseList(filtered);

  };
  let expensekey = 0;

  const Item = (e) => (
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
  );
  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text variant="headlineMedium">Expense Details </Text>
          <Text variant="bodyLarge">Title: {Title}</Text>
          <Text variant="bodyLarge">Date:{new Date(modalDate).toString().substr(0, 24)}</Text>
          <Text variant="bodyLarge">Category: {category}</Text>
          <Text variant="bodyLarge">Amount: {amount}</Text>
          <Text variant="bodyLarge">Note: {note}</Text>


        </Modal>
      </Portal>

      <ScrollView style={{ margin: 5 }}>

        <Text
          variant="titleLarge"
          style={{ marginTop: 5, marginBottom: 5, marginLeft: 5 }}>
          Expenses
        </Text>
        <View style={{ alignItems: "center" }}>
          {/* <Circle></Circle> */}
          {expenseList&&categoryList ? <TouchableOpacity onPress={generateChartData}>
              <PieChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"amount"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 10]}
                absolute
              />
            </TouchableOpacity>
            : null


          }

        </View>
        <Text variant="titleLarge" style={{ marginTop: 5 }}>
          Apply Filters
        </Text>


        <TextInput
          label="Filters"
          placeholder="Category, title, description"
          style={{ marginTop: 5 }}
          onChangeText={(e) => {
            filterList(e);
          }}
        />
        <Text variant="titleLarge" style={{ marginTop: 25 }}>
          Expense History
        </Text>
        <DataTable style={{ marginTop: 5 }}>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>

            <DataTable.Title>Category</DataTable.Title>
            <DataTable.Title>Title</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
          </DataTable.Header>


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


          {/*{expenseList?<SectionList*/}
          {/*  sections={expenseList}*/}
          {/*  keyExtractor={(item, index) => item}*/}
          {/*  renderItem={({ item }) => <Item e={item} />}*/}
          {/*  // renderSectionHeader={({ section: { title } }) => (*/}
          {/*  //   <Text style={styles.header}>{title}</Text>*/}
          {/*  // )}*/}
          {/*/>:null}*/}
        </DataTable>
      </ScrollView>
    </Provider>


  );
};
const Circle = () => {
  return <View style={styles.circle} />;
};
const categoryData = [
  { Category: 'Category', Amount: 'Amount', Title: 'Title' },
  { Category: 'Abc', Amount: 1000, Title: 'Rent' },
];

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: 'red',
  },
});
export default Expenses;
