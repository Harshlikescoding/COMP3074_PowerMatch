import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import Swiper from 'react-native-deck-swiper';

import johnImage from '../assets/images/john.jpg';
import janeImage from '../assets/images/jane.jpg';
import aliceImage from '../assets/images/alice.jpg';
import bobImage from '../assets/images/bob.jpg';
import sarahImage from '../assets/images/sarah.jpg';
import michaelImage from '../assets/images/michael.jpg';

const HomeScreen = ({ onNewMatch }) => {
  const cards = [
    { id: 1, name: 'John', age: 25, location: 'New York', image: johnImage },
    { id: 2, name: 'Jane', age: 28, location: 'Los Angeles', image: janeImage },
    { id: 3, name: 'Alice', age: 23, location: 'Chicago', image: aliceImage },
    { id: 4, name: 'Bob', age: 30, location: 'San Francisco', image: bobImage },
    { id: 5, name: 'Sarah', age: 27, location: 'Miami', image: sarahImage },
    { id: 6, name: 'Michael', age: 35, location: 'Seattle', image: michaelImage },
  ];

  const swiperRef = useRef(null);
  const [cardIndex, setCardIndex] = useState(0); 
  const [noMoreMatches, setNoMoreMatches] = useState(false);
  const [swipeMessage, setSwipeMessage] = useState('');
  let timeoutId;

  const handleSwipe = (index, direction) => {
    if (index < 0 || index >= cards.length) return; 
    const card = cards[index];
    let message = '';

    if (direction === 'left') {
      message = `You disliked ${card.name}`;
    } else if (direction === 'right') {
      message = `You liked ${card.name}`;
    } else if (direction === 'up') {
      message = `You superliked ${card.name}`;
    }

    console.log(`Swiped ${direction} on card ${card.name}`); 
    setSwipeMessage(message);


    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => setSwipeMessage(''), 3000);

    setCardIndex(index + 1); 
  };

  const handleLike = () => {
    swiperRef.current?.swipeRight();
  };

  const handleDislike = () => {
    swiperRef.current?.swipeLeft();
  };

  const handleSuperlike = () => {
    swiperRef.current?.swipeTop();
  };

  const handleSwipedAllCards = () => {
    setNoMoreMatches(true);
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={cards}
        renderCard={(card) =>
          card ? (
            <View style={styles.card}>
              <Image source={card.image} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.cardDetails}>
                <Text style={styles.cardText}>{card.name}</Text>
                <Text style={styles.cardText}>{card.age} years old</Text>
                <Text style={styles.cardText}>{card.location}</Text>
              </View>
            </View>
          ) : null 
        }
        onSwipedLeft={(index) => handleSwipe(index, 'left')}
        onSwipedRight={(index) => handleSwipe(index, 'right')}
        onSwipedTop={(index) => handleSwipe(index, 'up')}
        onSwipedAll={handleSwipedAllCards}
        cardIndex={cardIndex} 
        backgroundColor="#f9f9f9"
        stackSize={3}
        verticalSwipe={false}
        overlayLabels={{
          left: {
            title: 'DISLIKE',
            style: {
              label: {
                backgroundColor: 'red',
                color: 'white',
                fontSize: 30,
                fontWeight: 'bold',
                padding: 10,
              },
            },
          },
          right: {
            title: 'LIKE',
            style: {
              label: {
                backgroundColor: 'green',
                color: 'white',
                fontSize: 30,
                fontWeight: 'bold',
                padding: 10,
              },
            },
          },
          top: {
            title: 'SUPERLIKE',
            style: {
              label: {
                backgroundColor: 'blue',
                color: 'white',
                fontSize: 30,
                fontWeight: 'bold',
                padding: 10,
              },
            },
          },
        }}
      />

      {swipeMessage !== '' && (
        <View style={styles.swipeMessageContainer}>
          <Text style={styles.swipeMessageText}>{swipeMessage}</Text>
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDislike}
          accessibilityLabel="Dislike"
          accessible={true}
        >
          <Text style={styles.buttonText}>👎</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSuperlike}
          accessibilityLabel="Superlike"
          accessible={true}
        >
          <Text style={styles.buttonText}>⭐</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLike}
          accessibilityLabel="Like"
          accessible={true}
        >
          <Text style={styles.buttonText}>👍</Text>
        </TouchableOpacity>
      </View>

      {noMoreMatches && (
        <View style={styles.noMoreMatchesContainer}>
          <Text style={styles.noMoreMatchesText}>
            No more matches. Try expanding your search area or give old matches another try.
          </Text>
        </View>
      )}
    </View>
  );
};

const shadowStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  android: {
    elevation: 5,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    width: 370,
    height: 550,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    ...shadowStyle,
    padding: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
  },
  cardDetails: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 30,
    width: '100%',
    zIndex: 1000, 
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadowStyle,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  },
  swipeMessageContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    alignItems: 'center',
    zIndex: 1000,
  },
  swipeMessageText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  noMoreMatchesContainer: {
    position: 'absolute',
    bottom: 150,
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  noMoreMatchesText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
