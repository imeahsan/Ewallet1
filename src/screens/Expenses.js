import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Button,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Text, TextInput, Card, Badge} from 'react-native-paper';

const Expenses = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <View>
      <Button title="Select Date From" onPress={() => setOpen(true)} />
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
        <Button title="Select Date From" onPress={() => setOpen(true)} />
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
        placeholder="Category, title, description"
        style={{marginTop: 2}}
      />

      <Card>
        <Badge style={{backgroundColor: 'Red'}}></Badge>
      </Card>
    </View>
  );
};
const Circle = () => {
  return <View style={styles.circle} />;
};

StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: 'red',
  },
});
export default Expenses;
