import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker'; // Add this for image picking

const ProfileScreen = () => {
  // User profile state
  const [name, setName] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [weight, setWeight] = useState('');
  const [gymFrequency, setGymFrequency] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [extraQuestions, setExtraQuestions] = useState({
    favoriteExercise: '',
    motivation: '',
  });
  const [images, setImages] = useState([]); // Array to store up to 6 images

  // Handle text change for extra questions
  const handleExtraQuestionChange = (field, value) => {
    setExtraQuestions({
      ...extraQuestions,
      [field]: value,
    });
  };

  // Handle image picking
  const pickImage = async (index = null) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (index !== null) {
        // Replace the existing image
        const updatedImages = [...images];
        updatedImages[index] = result.assets[0].uri;
        setImages(updatedImages);
      } else {
        // Add new image if less than 6 images
        if (images.length < 6) {
          setImages([...images, result.assets[0].uri]);
        } else {
          alert('You can only upload up to 6 images.');
        }
      }
    }
  };

  // Remove image function
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Save profile function
  const saveProfile = () => {
    alert('Profile saved!');
    // Add actual save functionality here (e.g., save to database or AsyncStorage)
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Profile</Text>

        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          {images.length > 0 ? (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: images[0] }} style={styles.profilePicture} />
              <View style={styles.imageActions}>
                <TouchableOpacity onPress={() => pickImage(0)} style={styles.actionButton}>
                  <Icon name="pencil" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeImage(0)} style={styles.actionButton}>
                  <Icon name="trash" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text style={styles.noImageText}>No profile picture selected</Text>
          )}
        </View>

        {/* Other Images */}
        <View style={styles.otherImagesContainer}>
          {images.slice(1, 6).map((imageUri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: imageUri }} style={styles.smallImage} />
              <View style={styles.imageActions}>
                <TouchableOpacity onPress={() => pickImage(index + 1)} style={styles.actionButton}>
                  <Icon name="pencil" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeImage(index + 1)} style={styles.actionButton}>
                  <Icon name="trash" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Image Upload */}
        <View style={styles.imageUploadContainer}>
          <TouchableOpacity onPress={() => pickImage()} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Images (Max 6)</Text>
          </TouchableOpacity>
        </View>

        {/* Editable fields */}
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#bbb"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="bullseye" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Fitness Goal"
            placeholderTextColor="#bbb"
            value={fitnessGoal}
            onChangeText={setFitnessGoal}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="weight" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            placeholderTextColor="#bbb"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="calendar" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="How often do you go to the gym?"
            placeholderTextColor="#bbb"
            value={gymFrequency}
            onChangeText={setGymFrequency}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="mars" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            placeholderTextColor="#bbb"
            value={gender}
            onChangeText={setGender}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="birthday-cake" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="#bbb"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
        </View>

        {/* Extra Questions */}
        <View style={styles.extraQuestionsContainer}>
          <Text style={styles.extraQuestionTitle}>What is your favorite exercise?</Text>
          <TextInput
            style={styles.input}
            placeholder="Favorite Exercise"
            placeholderTextColor="#bbb"
            value={extraQuestions.favoriteExercise}
            onChangeText={(value) => handleExtraQuestionChange('favoriteExercise', value)}
          />
        </View>

        <View style={styles.extraQuestionsContainer}>
          <Text style={styles.extraQuestionTitle}>What motivates you to workout?</Text>
          <TextInput
            style={styles.input}
            placeholder="Motivation"
            placeholderTextColor="#bbb"
            value={extraQuestions.motivation}
            onChangeText={(value) => handleExtraQuestionChange('motivation', value)}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={saveProfile}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures the scrollview grows and scrolls if the content exceeds the screen height
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingTop: 20,
    paddingLeft: 20, // Add padding on the left
    paddingRight: 20, // Optional: Add padding on the right if needed
  },
  formContainer: {
    width: '100%', // Ensure it takes full width
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75, // Circular shape
    borderWidth: 3,
    borderColor: '#ddd',
  },
  noImageText: {
    fontSize: 16,
    color: '#bbb',
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    width: 30,
    height: 30,
    borderRadius: 15, // Circular button
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  otherImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  smallImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  imageUploadContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  extraQuestionsContainer: {
    marginBottom: 20,
  },
  extraQuestionTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
