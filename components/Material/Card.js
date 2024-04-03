import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateTaskPriority, deleteTask } from '../Redux/TaskSlice'; 
import UpdatePage from '../Pages/UpdatePage';

const screenWidth = Dimensions.get('window').width;

const TaskCard = ({ tasks, status }) => {
  
  const dispatch = useDispatch();
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [priorityModalVisible, setPriorityModalVisible] = useState(null); // state for priority modal
  const [actionsModalVisible, setActionsModalVisible] = useState(null); // state for actions modal

  const handlePriorityUpdate = (taskId, newPriority) => {
    dispatch(updateTaskPriority({ taskId, newPriority }));
    setPriorityModalVisible(null); // Close the modal after updating priority
  };

  const handleUpdateClick = (task) => {
    setSelectedTask(task);
    setUpdateModalShow(true);
  };

  const handleDeleteClick = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleActionsClick = (taskId) => {
    setActionsModalVisible(taskId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#007bff';
      case 'In Progress':
        return '#ffc107';
      case 'Completed':
        return '#28a745';
      case 'Deployed':
        return '#17a2b8';
      case 'Deferred':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <View>
      <View style={{ backgroundColor: getStatusColor(status), padding: 10, borderRadius: 10, width: "90%", marginLeft: 15, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontWeight: "900" }}>{status}</Text>
      </View>
      {tasks.map((task) => (
        <View key={task.id} style={[styles.taskCardContainer, { borderColor: getStatusColor(task.status), maxWidth: screenWidth }]}>
          <View style={styles.card}>
            <View style={styles.taskOptions}>
              <Text style={styles.title}>{task.title}</Text>
              
              {/* Priority Button */}
              <TouchableOpacity 
                style={[styles.smallButton, { backgroundColor: getStatusColor(task.status) }]}
                onPress={() => setPriorityModalVisible(task.id)}
              >
                <Text style={{color:"white",fontWeight:"900"}}>{task.priority}</Text>
              </TouchableOpacity>
              
              {/* Priority Modal */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={priorityModalVisible === task.id}
                onRequestClose={() => setPriorityModalVisible(null)}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                  <Text>{task.title}</Text>
                    <TouchableOpacity 
                      style={styles.modalButton}
                      onPress={() => handlePriorityUpdate(task.id, 'P1')}
                    >
                      <Text>P1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.modalButton}
                      onPress={() => handlePriorityUpdate(task.id, 'P2')}
                    >
                      <Text>P2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.modalButton}
                      onPress={() => handlePriorityUpdate(task.id, 'P3')}
                    >
                      <Text>P3</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.modalButton,{backgroundColor:"red",width:130}]}
                      onPress={() =>setPriorityModalVisible(false)}
                    >
                      <Text style={{color:"white"}}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            <Text style={styles.description}>{task.description}</Text>

            <View style={styles.assignee}>
              <Text style={styles.assigneeText}>@{task.assignee}</Text>
      <TouchableOpacity style={[styles.smallButton, { backgroundColor: getStatusColor(task.status) }]} onPress={() => setActionsModalVisible(task.id)} >
        <Text style={{color:'white',fontWeight:"900"}}>:</Text>
      </TouchableOpacity>
      <Modal
                animationType="slide"
                transparent={true}
                visible={actionsModalVisible === task.id}
                onRequestClose={() => setActionsModalVisible(null)}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => handleUpdateClick(task.id)} style={styles.modalButton}>
                      <Text>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteClick(task.id)} style={styles.modalButton}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.modalButton,{backgroundColor:"red",width:130}]}
                      onPress={() => setActionsModalVisible(null)}
                    >
                      <Text style={{color:"white"}}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

            </View>

            <View style={styles.bottomButton}>
              <TouchableOpacity  onPress={() => handleActionsClick(task.id)}>
                <Text>Assign</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      <UpdatePage show={updateModalShow} onHide={() => setUpdateModalShow(null)} ids={selectedTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  taskCardContainer: {
    marginTop: 10,
    borderBottomWidth: 2,
    
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    padding: 10,
    width:310
  },
  taskOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    width:"90%"
  },
  assignee: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  assigneeText: {
    fontWeight: 'bold',
  },
  smallButton: {
    padding: 10,
    borderRadius: 4,
  },
  bottomButton: {
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    width: 100,
    alignItems: 'center'
  },
});

export default TaskCard;
