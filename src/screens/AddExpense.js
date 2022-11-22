import {React, useState} from 'react';
import {TextInput} from 'react-native-paper';
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

import {Text} from 'react-native-paper';

const AddExpense = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <ScrollView>
      <View style={{marginTop: 25}}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          Add Expense
        </Text>
      </View>
      <View style={{marginTop: 50, padding: 10}}>
        <TextInput
          mode="outlined"
          label="Title"
          placeholder="Enter title"
          right={<TextInput.Affix text="required" />}
          style={{margin: 10}}
        />
        <TextInput
          mode="outlined"
          label="Amount"
          placeholder="Enter amount"
          keyboardType="numeric"
          right={<TextInput.Affix text="required" />}
          style={{margin: 10}}
        />
        <TextInput
          mode="outlined"
          label="Category"
          placeholder="Enter category"
          right={<TextInput.Affix text="required" />}
          style={{margin: 10}}
        />
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
        <TextInput
          multiline
          numberOfLines={4}
          mode="outlined"
          label="Note"
          placeholder="Enter note"
          style={{margin: 10}}
        />

        <Button
          icon="content-save"
          title="Save"
          mode="contained"
          onPress={() => console.log('Password toh daal bay')}
          style={{marginHorizontal: 50, margin: 50, padding: 5}}>
        
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddExpense;
