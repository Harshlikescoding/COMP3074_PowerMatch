import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Animated } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

const AnalyticsScreen = () => {
  const [weeklySchedule, setWeeklySchedule] = useState({
    Mon: { exercise: 'Cardio', rest: false },
    Tue: { exercise: 'Weightlifting', rest: false },
    Wed: { exercise: null, rest: true },
    Thu: { exercise: 'Yoga', rest: false },
    Fri: { exercise: 'HIIT', rest: false },
    Sat: { exercise: null, rest: true },
    Sun: { exercise: 'Cycling', rest: false },
  });

  const [editingDay, setEditingDay] = useState(null);
  const [editedExercise, setEditedExercise] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); 

  const missedGymCount = 2;
  const highestGymStreak = 7;

 
  const progressData = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 100) + 20
  );

  const handleEditExercise = (day) => {
    setEditingDay(day);
    setEditedExercise(weeklySchedule[day].exercise || '');
  };

  const handleSaveExercise = () => {
    setWeeklySchedule({
      ...weeklySchedule,
      [editingDay]: { ...weeklySchedule[editingDay], exercise: editedExercise, rest: false },
    });
    setEditingDay(null);
    setEditedExercise('');
  };

  const handleCancelEdit = () => {
    setEditingDay(null);
    setEditedExercise('');
  };


  React.useEffect(() => {
    const animateMealPlan = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };

    animateMealPlan();
  }, [fadeAnim]); 

  return (
    <ScrollView style={styles.container}>
      {/* Weekly Schedule */}
      <View style={styles.scheduleCard}>
        <Text style={styles.sectionTitle}>Weekly Exercise Schedule</Text>
        <View style={styles.schedule}>
          {Object.keys(weeklySchedule).map((day) => (
            <View key={day} style={styles.dayContainer}>
              <Text style={styles.dayText}>{day}</Text>
              {editingDay === day ? (
                <View>
                  <TextInput
                    style={styles.input}
                    value={editedExercise}
                    onChangeText={setEditedExercise}
                    placeholder="Enter exercise"
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleSaveExercise} style={styles.button}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCancelEdit} style={styles.button}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={weeklySchedule[day].rest ? styles.restText : styles.exerciseText}>
                    {weeklySchedule[day].rest ? 'Rest' : weeklySchedule[day].exercise}
                  </Text>
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={weeklySchedule[day].rest ? '#ff6347' : '#00FF00'}
                  />
                  <TouchableOpacity onPress={() => handleEditExercise(day)} style={styles.editButton}>
                    <Ionicons name="create-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Progress Graph */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Monthly Progress: Calories Burned</Text>
        <LineChart
          data={{
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
              {
                data: progressData,
              },
            ],
          }}
          width={320}
          height={220}
          yAxisSuffix="kcal"
          chartConfig={{
            backgroundColor: '#3a3a3a',
            backgroundGradientFrom: '#1f1f1f',
            backgroundGradientTo: '#3a3a3a',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#00ff00',
            },
          }}
        />
      </View>

      {/* Missed Gym Days */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Missed Gym Days</Text>
        <Text style={styles.missedCount}>{missedGymCount} Days</Text>
      </View>

      {/* Highest Gym Streak */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Highest Gym Streak</Text>
        <Text style={styles.highestStreak}>{highestGymStreak} Days</Text>
      </View>

      {/* Meal Plan for Gym Users */}
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.sectionTitle}>Meal Plan for Gym Users</Text>
        <View style={styles.mealPlanList}>
          <View style={styles.mealItem}>
            <Ionicons name="fast-food" size={30} color="#FFEB3B" />
            <Text style={styles.text}>Breakfast: Oatmeal with fruits and eggs. 400-500 kcal</Text>
          </View>
          <View style={styles.mealItem}>
            <Ionicons name="pizza" size={30} color="#F44336" />
            <Text style={styles.text}>Lunch: Grilled chicken, quinoa, and veggies. 600-700 kcal</Text>
          </View>
          <View style={styles.mealItem}>
            <Ionicons name="restaurant" size={30} color="#3F51B5" />
            <Text style={styles.text}>Dinner: Salmon, sweet potatoes, and broccoli. 500-600 kcal</Text>
          </View>
          <View style={styles.mealItem}>
            <Ionicons name="ice-cream" size={30} color="#FF9800" />
            <Text style={styles.text}>Snacks: Protein bar or Greek yogurt. 200-300 kcal</Text>
          </View>
          <View style={styles.mealItem}>
            <Ionicons name="bicycle" size={30} color="#4CAF50" />
            <Text style={styles.text}>Pre-workout: Banana and a scoop of protein. 150-200 kcal</Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  scheduleCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    padding: 16,
  },
  schedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  exerciseText: {
    fontSize: 14,
    color: '#00FF00',
  },
  restText: {
    fontSize: 14,
    color: '#ff6347',
  },
  missedCount: {
    fontSize: 30,
    color: '#ff0000',
    fontWeight: 'bold',
  },
  highestStreak: {
    fontSize: 30,
    color: '#008000',
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#1e90ff',
    padding: 8,
    borderRadius: 30, // Circle edit button
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealPlanList: {
    marginTop: 10,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default AnalyticsScreen;
