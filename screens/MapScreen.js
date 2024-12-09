import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, TextInput, FlatList, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps'; 
import { Ionicons } from '@expo/vector-icons';

// Updated mock data for gyms in Scarborough, Canada with new coordinates
const mockPlaces = [
  {
    id: '1',
    tags: {
      name: 'LA Fitness',
      address: { city: 'Scarborough', country: 'Canada' },
      description: 'A gym with a wide range of workout equipment and classes.',
      fees: 'Monthly: $45',
      timings: 'Mon-Sun: 7 AM - 9 PM',
      trainers: ['Emily Brown', 'Alex Johnson'],
    },
    lat: 43.7301213,
    lon: -79.2855928,
  },
  {
    id: '2',
    tags: {
      name: 'GoodLife Fitness',
      address: { city: 'Scarborough', country: 'Canada' },
      description: 'A popular gym offering various fitness programs and amenities.',
      fees: 'Monthly: $50',
      timings: 'Mon-Sun: 6 AM - 10 PM',
      trainers: ['John Doe', 'Jane Smith'],
    },
    lat: 43.7411865,
    lon: -79.2151913,
  },
  {
    id: '3',
    tags: {
      name: 'Fit4Less',
      address: { city: 'Scarborough', country: 'Canada' },
      description: 'An affordable gym with a variety of fitness options.',
      fees: 'Monthly: $35',
      timings: 'Mon-Sun: 8 AM - 8 PM',
      trainers: ['Michael Lee', 'Sarah Davis'],
    },
    lat: 43.7578273,
    lon: -79.2284603,
  },
  {
    id: '4',
    tags: {
      name: 'Fit4Less',
      address: { city: 'Scarborough', country: 'Canada' },
      description: 'An affordable gym with a variety of fitness options.',
      fees: 'Monthly: $35',
      timings: 'Mon-Sun: 8 AM - 8 PM',
      trainers: ['Michael Lee', 'Sarah Davis'],
    },
    lat: 43.7253091,
    lon: -79.2979000,
  },
  {
    id: '5',
    tags: {
      name: 'Fit4Less',
      address: { city: 'Scarborough', country: 'Canada' },
      description: 'An affordable gym with a variety of fitness options.',
      fees: 'Monthly: $35',
      timings: 'Mon-Sun: 8 AM - 8 PM',
      trainers: ['Michael Lee', 'Sarah Davis'],
    },
    lat: 43.7500000, // Added new Fit4Less location (example coordinates)
    lon: -79.2500000, // Added new Fit4Less location (example coordinates)
  },
];

const MapScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = {
          coords: {
            latitude: 43.7696,
            longitude: -79.2574,
          },
        };
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        alert('Error getting location');
      }
    };

    getLocation();
  }, []);

  const handleMarkerPress = (place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  const renderPlace = ({ item }) => (
    <TouchableOpacity style={styles.placeItem}>
      <Text>{item.tags.name || 'Unnamed Place'}</Text>
      <Text>{item.tags.address ? `${item.tags.address.city}, ${item.tags.address.country}` : 'No address info'}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for gyms"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      {userLocation && (
        <MapView
          style={styles.map}
          region={userLocation}
          showsUserLocation={true}  // Default blue circle for current location
          followsUserLocation={true}
        >
          {/* OpenStreetMap Tile Layer */}
          <UrlTile
            urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
          />
          {mockPlaces.map((place, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: place.lat, longitude: place.lon }}
              title={place.tags.name || 'Unnamed Place'}
              onPress={() => handleMarkerPress(place)} 
            />
          ))}
        </MapView>
      )}

      {/* List of Places */}
      <FlatList
        data={mockPlaces}
        renderItem={renderPlace}
        keyExtractor={(item) => item.id}
        style={styles.placesList}
      />

      {/* Modal for Gym Details */}
      {selectedPlace && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <Animated.View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedPlace.tags.name}</Text>
              <Text style={styles.modalDescription}>{selectedPlace.tags.description}</Text>
              <Text style={styles.modalFees}>Fees: {selectedPlace.tags.fees}</Text>
              <Text style={styles.modalTimings}>Timings: {selectedPlace.tags.timings}</Text>
              <Text style={styles.modalTrainers}>Trainers Available: {selectedPlace.tags.trainers.join(', ')}</Text>

              {selectedPlace.tags.trainers.map((trainer, index) => (
                <TouchableOpacity style={styles.bookButton} key={index}>
                  <Text style={styles.bookButtonText}>Book with {trainer}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingTop: 10,
  },
  searchBar: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  placesList: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20,
    marginHorizontal: 15,
  },
  placeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'flex-start', // Align text to the left
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalDescription: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  modalFees: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  modalTimings: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  modalTrainers: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  bookButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MapScreen;
