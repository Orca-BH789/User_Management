import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, TextInput, Button } from 'react-native';

const UserList = ({ users, loading, onDeleteUser, onUpdateUser }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedAge, setUpdatedAge] = useState('');

  const handleUpdatePress = (user) => {
    setEditingUser(user);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
    setUpdatedAge(user.age.toString());
  };

  const handleUpdateSubmit = () => {
    onUpdateUser(editingUser.id, {
      name: updatedName,
      email: updatedEmail,
      age: parseInt(updatedAge, 10)
    });
    setEditingUser(null);
  };

  const renderUser = ({ item }) => (
    <View style={styles.userItem}>
      {editingUser && editingUser.id === item.id ? (
        <View style={styles.editForm}>
          <TextInput
            style={styles.input}
            value={updatedName}
            onChangeText={setUpdatedName}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={updatedEmail}
            onChangeText={setUpdatedEmail}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={updatedAge}
            onChangeText={setUpdatedAge}
            placeholder="Age"
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleUpdateSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setEditingUser(null)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Name: {item.name}</Text>
            <Text style={styles.userDetail}>Email: {item.email}</Text>
            <Text style={styles.userDetail}>Age: {item.age}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.updateButton]} 
              onPress={() => handleUpdatePress(item)}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.deleteButton]} 
              onPress={() => onDeleteUser(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      renderItem={renderUser}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  userItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userDetail: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  updateButton: {
    backgroundColor: 'green',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  editForm: {
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: 'green',
  },
  cancelButton: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default UserList;