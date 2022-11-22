import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import {Text, TextInput, DataTable} from 'react-native-paper';

const Categories = () => {
  return (
    <ScrollView style={{margin: 5}}>
      <Text variant="titleLarge">Add Category</Text>
      <TextInput
        label="Category Name"
        placeholder="Category Name"
        style={{marginTop: 5, marginBottom: 5}}
      />
      <Button title="Add Category"></Button>

      <View style={{marginTop: 25, marginBottom: 5}}>
        <Text variant="titleLarge">Categories</Text>
        <DataTable style={{marginTop: 5}}>
          <DataTable.Header>
            <DataTable.Title>Category</DataTable.Title>
            <DataTable.Title >No of Expenses</DataTable.Title>

            <DataTable.Title>Delete</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>11 November 2022</DataTable.Cell>
            <DataTable.Cell >80</DataTable.Cell>

            <DataTable.Cell>
              <Button title="Delete"></Button>
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>11 November 2022</DataTable.Cell>
            <DataTable.Cell >80</DataTable.Cell>
            <DataTable.Cell>
              <Button title="Delete"></Button>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </ScrollView>
  );
};

export default Categories;
