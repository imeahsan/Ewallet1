import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Button,
  View,
} from 'react-native';
import {Text, TextInput, DataTable} from 'react-native-paper';
const data = [{value: 50}, {value: 80}, {value: 90}, {value: 70}];

const Income = () => {
  return (
    <View style={{margin: 5}}>
      <Text
        variant="titleLarge"
        style={{marginTop: 5, marginBottom: 5, marginLeft: 5}}>
        Income
      </Text>
      <View style={{alignItems: 'center'}}>
        <Circle></Circle>
      </View>
      <View>
        <TextInput
          label={'Amount'}
          placeholder="Income Amount"
          style={{marginTop: 5, marginBottom: 5}}
          right={<TextInput.Affix text="required" />}
        />
        <Button title="Add Amount" />
        <TextInput
          label={'Expense Limit'}
          placeholder="Expense Limit"
          right={<TextInput.Affix text="required" />}
          style={{marginTop: 5, marginBottom: 5}}
        />
        <Button title="Set Limit"></Button>
      </View>

      <View>
        <Text variant="titleLarge" style={{marginTop: 50}}>
          Income History
        </Text>
        <DataTable style={{marginTop: 5}}>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>

            <DataTable.Title numeric>Amount</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>11 November 2022</DataTable.Cell>

            <DataTable.Cell numeric>60</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>11 November 2022</DataTable.Cell>
            <DataTable.Cell numeric>80</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </View>
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
    backgroundColor: 'red',
  },
});
export default Income;
