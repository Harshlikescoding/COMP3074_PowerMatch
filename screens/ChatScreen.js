import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, Image, ScrollView, TextInput, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from 'react-native-vector-icons'; // Icon library for call, send, and add icons
import johnImage from '../assets/images/john.jpg';
import janeImage from '../assets/images/jane.jpg';
import aliceImage from '../assets/images/alice.jpg';
import bobImage from '../assets/images/bob.jpg';
import sarahImage from '../assets/images/sarah.jpg';
import michaelImage from '../assets/images/michael.jpg';
import defaultImage from '../assets/images/default.png';

const { width, height } = Dimensions.get('window'); // Get device width and height for responsive design

const ChatScreen = ({ navigation }) => {
  const [selectedStreak, setSelectedStreak] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null); // New state for selected chat
  const [message, setMessage] = useState(""); // State for message input
  const [chats] = useState([
    { id: '1', name: 'John', imageUrl: johnImage, message: "Hey, how's your workout going?" },
    { id: '2', name: 'Jane', imageUrl: janeImage, message: "Did you try the new leg day routine?" },
    { id: '3', name: 'Alice', imageUrl: aliceImage, message: "Let’s hit the gym at 6 PM tonight!" },
    { id: '4', name: 'Bob', imageUrl: bobImage, message: "What supplements are you using for recovery?" },
    { id: '5', name: 'Sarah', imageUrl: sarahImage, message: "How was your chest day? Feeling sore?" },
    { id: '6', name: 'Michael', imageUrl: michaelImage, message: "Can you share your workout split for this week?" },
    { id: '7', name: 'Liam Carter', imageUrl: defaultImage, message: "I saw your deadlift form on Instagram. It looks great!" },
    { id: '8', name: 'Emily Davis', imageUrl: defaultImage, message: "I need a good leg day playlist, got any recommendations?" },
    { id: '9', name: 'Ethan Clark', imageUrl: defaultImage, message: "Do you have a post-workout smoothie recipe?" },
    { id: '10', name: 'Sophia Moore', imageUrl: defaultImage, message: "How's your progress on the squat? Any tips?" }
  ]);

  const openStreak = (streak) => {
    setSelectedStreak(streak);
  };

  const openChatDetail = (chat) => {
    if (chat.name === 'Alice') {
      setSelectedChat(chat); // If Alice's chat is clicked, show the modal with her conversation
    } else {
      navigation.navigate('ChatDetail', { chat });
    }
  };

  const getRandomStreak = () => {
    return Math.floor(Math.random() * 30) + 1; // Random number between 1 and 30
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message send
      setMessage(""); // Clear input after sending
      console.log("Message sent:", message);
    }
  };

  const handleCloseStreakModal = () => {
    setSelectedStreak(null); // This will close the modal
  };

  return (
    <View style={styles.container}>
      {/* Gym Chat Users Layout */}
      <View style={styles.streakSection}>
        <FlatList
          data={chats}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openStreak(item)}>
              <View style={styles.streakItem}>
                <Image source={item.imageUrl} style={styles.streakImage} />
                <Text style={styles.streakName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.streakList}
        />
      </View>

      {/* Chat Inbox with Gym-Related Messages */}
      <View style={styles.chatSection}>
        <FlatList
          data={chats}
          renderItem={({ item }) => (
            <View style={styles.chatItem}>
              <Image source={item.imageUrl} style={styles.chatImage} />
              <View style={styles.chatContent}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage}>{item.message}</Text>
              </View>
              <TouchableOpacity onPress={() => openChatDetail(item)}>
                <Text style={styles.viewMessage}>View</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyMessage}>No chats available.</Text>
          )}
        />
      </View>

      {/* Modal for Streak */}
      {selectedStreak && (
        <Modal transparent={true} visible={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={handleCloseStreakModal} style={styles.closeButton}>
                <Ionicons name="close-circle" size={30} color="#4CAF50" />
              </TouchableOpacity>
              <ScrollView contentContainerStyle={styles.modalScroll}>
                <Image source={selectedStreak.imageUrl} style={styles.modalImage} />
                <Text style={styles.modalName}>{selectedStreak.name}</Text>
                <Text style={styles.modalDescription}>
                  {getRandomStreak()} days 🔥
                </Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal for Alice's Conversation */}
      {selectedChat && selectedChat.name === 'Alice' && (
        <Modal transparent={true} visible={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setSelectedChat(null)} style={styles.closeButton}>
                <Ionicons name="close-circle" size={30} color="#4CAF50" />
              </TouchableOpacity>
              <ScrollView contentContainerStyle={styles.modalScroll}>
                <Text style={styles.modalName}>{selectedChat.name}</Text>

                {/* Add Conversation Messages */}
                <View style={styles.conversation}>
                  <View style={styles.messageContainer}>
                    <Text style={styles.message}>Hey Alice! I’m ready for the workout!</Text>
                  </View>
                  <View style={styles.messageContainerRight}>
                    <Text style={styles.message}>Let’s do it! Starting with chest exercises.</Text>
                  </View>
                  <View style={styles.messageContainer}>
                    <Text style={styles.message}>Got any tips for improving my bench press?</Text>
                  </View>
                  <View style={styles.messageContainerRight}>
                    <Text style={styles.message}>Focus on your form and don’t rush it!</Text>
                  </View>
                </View>
              </ScrollView>

              {/* Conversation Input Section */}
              <View style={styles.inputSection}>
                <TouchableOpacity>
                  <MaterialIcons name="call" size={30} color="#007BFF" style={styles.icon} />
                </TouchableOpacity>
                <TextInput
                  style={styles.textInput}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Type your message..."
                />
                <TouchableOpacity onPress={handleSendMessage}>
                  <Ionicons name="send" size={30} color="#007BFF" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons name="attach-file" size={30} color="#007BFF" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  streakSection: {
    height: '10%',
  },
  streakList: {
    paddingVertical: 10,
  },
  streakItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  streakImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  streakName: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  chatSection: {
    flex: 1,
  },
  chatItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatContent: {
    marginLeft: 10,
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  chatMessage: {
    color: '#777',
    fontSize: 14,
    marginTop: 5,
  },
  viewMessage: {
    marginTop: 10,
    color: '#007BFF',
  },
  chatList: {
    marginTop: 10,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    height: height * 0.8, 
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  modalScroll: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  modalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  conversation: {
    marginVertical: 20,
    width: '100%',
  },
  messageContainer: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    padding: 10,
    maxWidth: '80%',
  },
  messageContainerRight: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    padding: 10,
    maxWidth: '80%',
  },
  message: {
    color: '#333',
    fontSize: 14,
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  modalImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});

export default ChatScreen;
