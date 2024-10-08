import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBar from './../components/NavBar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePage = () => {
  const [_id, set_id] = useState('');
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    profession: '',
    gender: '',
    type:'',
  });
  
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  // Fetch the user ID from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('loggedInUser');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser && parsedUser._id) {
          set_id(parsedUser._id);
        }
      } catch (error) {
        console.log('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch user data from backend using the user ID
  useEffect(() => {
    if (_id) {
      axios.get(`${apiUrl}/users/profile/${_id}`)
        .then((response) => setUserData(response.data))
        .catch((error) => console.error(error));
    }
  }, [_id]);  // Add _id as a dependency to trigger the API call when _id is set

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Text style={styles.profileTitle}>Profile</Text>
        <Icon name="edit" size={30} color="black" />
      </View>

    <ScrollView contentContainerStyle={styles.scrollView}>
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../assets/images/ProfileImage.png')} // Add a local image or dynamic source
          style={styles.profileImage}
        />
      </View>

      {/* User Name */}
      <Text style={styles.userName}>
        {userData.first_name} {userData.last_name}
      </Text>

      {/* Profile Fields */}
      <View style={styles.inputContainer}>
      <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={userData.first_name || ''}
          editable={false}
          placeholder="First Name :"
        />
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={userData.last_name || ''}
          editable={false}
          placeholder="Last Name :"
        />
        <Text style={styles.label}>Mobile:</Text>
        <TextInput
          style={styles.input}
          value={userData.mobile || ''}
          editable={false}
          placeholder="Phone No :"
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={userData.email || ''}
          editable={false}
          placeholder="Email :"
        />

<Text style={styles.label}>Profession:</Text>
        <TextInput
          style={styles.input}
          value={userData.profession || ''}
          editable={false}
          placeholder="Profession :"
        />

<Text style={styles.label}>Gender:</Text>
        <TextInput
          style={styles.input}
          value={userData.gender || ''}
          editable={false}
          placeholder="Gender :"
        />
        <Text style={styles.label}>User Type:</Text>
        <TextInput
          style={styles.input}
          value={userData.type || ''}
          editable={false}
          placeholder="Type :"
        />
      </View>
      </ScrollView>
      {/* Fixed Navigation Bar */}
      <View style={styles.navbarContainer}>
        <NavBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },scrollView: {
    flexGrow: 1,
    paddingBottom:100,
  },
  profileTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#000',
  },
  userName: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ecf0f1',
    marginBottom: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 5,
  },
});

export default ProfilePage;
