import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Button,
  FlatList,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Text, TextInput, Card, Badge } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import {

  PieChart,

} from "react-native-chart-kit";
import { Dimensions } from "react-native";




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
    population: 21500000,
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
    name: "Beijing",
    population: 527612,
    color: "red",
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

const Expenses = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={{ margin: 5 }}>
      <Text
        variant="titleLarge"
        style={{ marginTop: 5, marginBottom: 5, marginLeft: 5 }}>
        Expenses
      </Text>
      <View style={{ alignItems: 'center' }}>
        {/* <Circle></Circle> */}
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[10, 10]}
          absolute
        />
      </View>
      <Text variant="titleLarge" style={{ marginTop: 5 }}>
        Apply Filters
      </Text>
      <Button
        title="Select Start Date"
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

      <View style={{ marginTop: 2 }}>
        <Button
          title="Select End Date "
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
      </View>
      <TextInput
        label="Filters"
        placeholder="Category, title, description"
        style={{ marginTop: 5 }}
      />
      <Text variant="titleLarge" style={{ marginTop: 25 }}>
        Expense History
      </Text>
      <DataTable style={{ marginTop: 5 }}>
        <DataTable.Header>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title>Title</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>Grocery</DataTable.Cell>
          <DataTable.Cell>Frozen yogurt</DataTable.Cell>

          <DataTable.Cell numeric>60</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Grocery</DataTable.Cell>
          <DataTable.Cell>Eggs</DataTable.Cell>
          <DataTable.Cell numeric>80</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Grocery</DataTable.Cell>
          <DataTable.Cell>Eggs</DataTable.Cell>
          <DataTable.Cell numeric>80</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Grocery</DataTable.Cell>
          <DataTable.Cell>Eggs</DataTable.Cell>
          <DataTable.Cell numeric>80</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
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
