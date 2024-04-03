import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTask } from "../Redux/TaskSlice";
import { Modal, Button, TextInput, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const TaskForm = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);

  const generateRandomId = () => {
    return Math.floor(Math.random() * 10000);
  };

  const [task, setTask] = useState({
    id: generateRandomId(),
    title: '',
    description: '',
    assignee: '',
    team: '',
    status: 'Pending',
    priority: 'P1',
  });

  const [showPriorityOptions, setShowPriorityOptions] = useState(false);
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  const handleChange = (name, value) => {
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };



  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    dispatch(addNewTask(task));
    setTask({
      id: generateRandomId(),
      title: '',
      description: '',
      assignee: '',
      team: '',
      priority: 'P1',
      status: 'Pending',
      startDate:getCurrentDate(),
    });
    onHide(); // Close the modal after submitting
  };

  const priorityOptions = ['P1', 'P2', 'P3'];
  const statusOptions = ['Pending', 'In Progress', 'Completed','Deployed','Deferred'];

  const handleSelectPriority = (option) => {
    handleChange('priority', option);
    setShowPriorityOptions(false);
  };

  const handleSelectStatus = (option) => {
    handleChange('status', option);
    setShowStatusOptions(false);
  };

  return (
    <Modal visible={show} onRequestClose={onHide} animationType="slide" transparent>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onHide}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Add New Task</Text>
          <View style={styles.modalBody}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              value={task.title}
              onChangeText={(text) => handleChange('title', text)}
              placeholder="Enter task title"
              placeholderTextColor="#999"
              required
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              value={task.description}
              onChangeText={(text) => handleChange('description', text)}
              placeholder="Enter task description"
              placeholderTextColor="#999"
              required
            />

            <Text style={styles.label}>Assignee:</Text>
            <TextInput
              style={styles.input}
              value={task.assignee}
              onChangeText={(text) => handleChange('assignee', text)}
              placeholder="Enter assignee"
              placeholderTextColor="#999"
              required
            />

            <Text style={styles.label}>Team:</Text>
            <TextInput
              style={styles.input}
              value={task.team}
              onChangeText={(text) => handleChange('team', text)}
              placeholder="Enter team name"
              placeholderTextColor="#999"
              required
            />

            <Text style={styles.label}>Priority:</Text>
            <TouchableOpacity
              style={styles.dropdownContainer}
              onPress={() => {
                setShowPriorityOptions(!showPriorityOptions);
                scrollViewRef.current.scrollToEnd({ animated: true });
              }}
            >
              <Text style={styles.dropdownText}>{task.priority}</Text>
            </TouchableOpacity>
            {showPriorityOptions && (
              <View style={styles.optionsContainer}>
                {priorityOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.optionItem}
                    onPress={() => handleSelectPriority(option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.label}>Status:</Text>
            <TouchableOpacity
              style={styles.dropdownContainer}
              onPress={() => {
                setShowStatusOptions(!showStatusOptions);
                scrollViewRef.current.scrollToEnd({ animated: true });
              }}
            >
              <Text style={styles.dropdownText}>{task.status}</Text>
            </TouchableOpacity>
            {showStatusOptions && (
              <View style={styles.optionsContainer}>
                {statusOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.optionItem}
                    onPress={() => handleSelectStatus(option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
<TouchableOpacity onPress={handleSubmit} style={{backgroundColor:"red",width:"100%",padding:10,alignItems:'center',borderRadius:10}}>
  <Text style={{color:'white',fontWeight:"900"}}>Add Task</Text>
</TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#333',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    alignItems: 'flex-start',
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 4,
    color: '#333',
  },
  textArea: {
    height: 80,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  dropdownContainer: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 4,
    padding: 10,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  optionsContainer: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 4,
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default TaskForm;
