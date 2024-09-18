import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import AddUserForm from '@/src/AddUserForm';
import UserList from '@/src/UserList';
import { getUsers, deleteUser, updateUser } from '@/src/userService';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAdded = () => {
    fetchUsers(); // Refresh the user list after adding a new user
  };

  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userId, updatedUserData) => {
    setLoading(true);
    try {
      await updateUser(userId, updatedUserData);
      // Update the local state with the updated user data
      setUsers(users.map(user => user.id === userId ? { ...user, ...updatedUserData } : user
      ));
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddUserForm onUserAdded={handleUserAdded} />
      <UserList 
        users={users} 
        loading={loading} 
        onDeleteUser={handleDeleteUser}
        onUpdateUser={handleUpdateUser}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});