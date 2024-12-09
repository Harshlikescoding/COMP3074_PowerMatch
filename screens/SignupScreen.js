import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Animated button scale effect
  const [buttonScale] = useState(new Animated.Value(1));

  // Function for handling signup button press animation
  const handleSignupPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleSignupPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  // Handle signup logic with validation
  const handleSignup = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Regex pattern for Gmail

    if (!username || !password) {
      alert('Please enter both Gmail and password');
      return;
    }

    // Validate email
    if (!emailPattern.test(username)) {
      alert('Please enter a valid Gmail address');
      return;
    }

    // Validate password (at least 6 characters)
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    // If all validations pass, navigate to Home screen
    alert('Signup successful');
    navigation.replace('Home'); // Navigate to HomeScreen after signup
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Gmail"
            placeholderTextColor="#bbb"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#bbb"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.button}
            onPressIn={handleSignupPressIn}
            onPressOut={handleSignupPressOut}
            onPress={handleSignup} // This will trigger the handleSignup function
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signupText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8', // Light background color
  },
  formContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff', // White background for the form
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    color: '#333', // Dark text color
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd', // Light border color
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    padding: 10,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#4CAF50', // Green button color
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 20,
    color: '#4CAF50', // Green color for the link
    fontSize: 16,
  },
});

export default SignupScreen;
