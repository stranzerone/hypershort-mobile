import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Pressable, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DashboardStyles from './PagesStyle'; // Make sure this import is correct and styles are defined
import TaskForm from "../Pages/TaskForm";
import AllTasks from './AllPages';

const Dashboard = () => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const toggleSortMenu = () => {
    setIsSortMenuOpen(!isSortMenuOpen);
  };

  const togglePriorityModal = () => {
    setShowPriorityModal(!showPriorityModal);
  };

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  const selectPriority = (value) => {
    setPriorityFilter(value);
    togglePriorityModal();
  };

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  return (
    <View style={DashboardStyles.container}>
      <View style={DashboardStyles.header}>
        <Text style={DashboardStyles.headerText}>Dashboard</Text>
      </View>
      <View style={DashboardStyles.buttonContainer}>
        <TouchableOpacity style={DashboardStyles.filterButton} onPress={toggleFilterMenu}>
          <Text style={{ color: '#FFFFFF' }}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.filterButton} onPress={toggleSortMenu}>
          <Text style={{ color: '#FFFFFF' }}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.sortButton} onPress={toggleTaskForm}>
          <Text style={{ color: '#FFFFFF' }}>Add Task</Text>
        </TouchableOpacity>
      </View>
      {isFilterMenuOpen && (
        <View style={DashboardStyles.filterMenu}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Filter By</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={DashboardStyles.input}
          />
          <View style={DashboardStyles.dateRange}>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
              <Text style={DashboardStyles.startDateButton}>
                {startDate ? startDate.toISOString().split('T')[0] : 'Start Date'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
              <Text style={DashboardStyles.startDateButton}>
                {endDate ? endDate.toISOString().split('T')[0] : 'End Date'}
              </Text>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                testID="startDateTimePicker"
                value={startDate || new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleStartDateChange}
                style={DashboardStyles.datepicker}
              />
            )}
            {showEndDatePicker && (
             
              <DateTimePicker
                testID="endDateTimePicker"
              
                value={endDate || new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleEndDateChange}
                style={DashboardStyles.datepicker}
              />
           
            )}
            <TouchableOpacity style={DashboardStyles.startDateButton} onPress={() => { setStartDate(null); setEndDate(null); }}>
              <Text>Reset</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={DashboardStyles.selectButton} onPress={togglePriorityModal}>
            <Text>{priorityFilter || 'Select priority'}</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showPriorityModal}
            onRequestClose={togglePriorityModal}
          >
            <View style={DashboardStyles.centeredView}>
              <View style={DashboardStyles.modalView}>
                <Pressable
                  style={[DashboardStyles.button, DashboardStyles.buttonClose]}
                  onPress={togglePriorityModal}
                >
                  <Text style={DashboardStyles.textStyle}>Close</Text>
                </Pressable>
                <TouchableOpacity
                  style={[DashboardStyles.button, DashboardStyles.priorityButton]}
                  onPress={() => selectPriority('P1')}
                >
                  <Text style={DashboardStyles.textStyle}>P1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[DashboardStyles.button, DashboardStyles.priorityButton]}
                  onPress={() => selectPriority('P2')}
                >
                  <Text style={DashboardStyles.textStyle}>P2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[DashboardStyles.button, DashboardStyles.priorityButton]}
                  onPress={() => selectPriority('P3')}
                >
                  <Text style={DashboardStyles.textStyle}>P3</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}
      {isSortMenuOpen && (
        <View style={DashboardStyles.sortMenu}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Sort By Priority</Text>
          <TouchableOpacity
            style={DashboardStyles.sortOption}
            onPress={() => {
              setPriorityFilter('P1');
              setIsSortMenuOpen(false);
            }}
          >
            <Text>P1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={DashboardStyles.sortOption}
            onPress={() => {
              setPriorityFilter('P2');
              setIsSortMenuOpen(false);
            }}
          >
            <Text>P2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={DashboardStyles.sortOption}
            onPress={() => {
              setPriorityFilter('P3');
              setIsSortMenuOpen(false);
            }}
          >
            <Text>P3</Text>
          </TouchableOpacity>
        </View>
      )}
      {showTaskForm && (
        <TaskForm show={showTaskForm} onHide={toggleTaskForm} />
      )}
      <ScrollView contentContainerStyle={DashboardStyles.scrollViewContent}>
        <AllTasks 
          name={name}
          startDate={startDate}
          endDate={endDate}
          priorityFilter={priorityFilter}
          sortPriority={priorityFilter}
        />
      </ScrollView>
    </View>
  );
};

export default Dashboard;
