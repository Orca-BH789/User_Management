// src/userService.js
import { collection, addDoc, getDocs ,doc ,updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addUser = async (user) => {
  try {
    await addDoc(collection(db, "users"), user);
    alert("User added successfully!");
  } catch (error) {
    console.error("Error adding user: ", error);
    alert("Error adding user.");
  }
  
};
export const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
};

export const updateUser = async (userId, updatedUser) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, updatedUser);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user: ", error);
      alert("Error updating user.");
    }
  };

  export const deleteUser = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef);
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user: ", error);
      alert("Error deleting user.");
    }
  };
