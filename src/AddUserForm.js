import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { addUser } from '@/src/userService';

export default function AddUserForm({ onUserAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleAddUser = async () => {
    if (name && email && age) {
      setLoading(true); // Set loading to true
      try {
        await addUser({ name, email, age });
        setName('');
        setEmail('');
        setAge('');
        if (onUserAdded) {
          onUserAdded(); // Notify parent component
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to add user');
      } finally {
        setLoading(false); // Set loading to false
      }
    } else {
      Alert.alert('Error', 'All fields are required');
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        maxval={99}
      />
      <Button
        title="Add User"
        onPress={handleAddUser}
        disabled={loading} // Disable button when loading
      />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});
