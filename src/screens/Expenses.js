import React, {useState} from 'react';
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
import {Text, TextInput, Card, Badge} from 'react-native-paper';
import {DataTable} from 'react-native-paper';

const Expenses = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={{margin: 5}}>
      <Text
        variant="titleLarge"
        style={{marginTop: 5, marginBottom: 5, marginLeft: 5}}>
        Expenses
      </Text>
      <View style={{alignItems: 'center'}}>
        <Circle></Circle>
      </View>
      <Text variant="titleLarge" style={{marginTop: 5}}>
        Apply Filters
      </Text>
      <Button
        title="Select Date From"
        onPress={() => setOpen(true)}
        style={{marginTop: 5, marginBottom: 5}}
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

      <View style={{marginTop: 2}}>
        <Button
          title="Select Date From"
          onPress={() => setOpen(true)}
          style={{marginTop: 5, marginBottom: 5}}
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
        style={{marginTop: 5}}
      />
      <Text variant="titleLarge" style={{marginTop: 25}}>
        Expense History
      </Text>
      <DataTable style={{marginTop: 5}}>
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
const data = [
  {Category: 'Category', Amount: 'Amount', Title: 'Title'},
  {Category: 'Abc', Amount: 1000, Title: 'Rent'},
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
