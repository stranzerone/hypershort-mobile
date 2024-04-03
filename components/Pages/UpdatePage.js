import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { updateTaskPriority, updateTaskStatus } from '../Redux/TaskSlice';

const UpdatePage = ({ show, onHide, ids }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [formData, setFormData] = useState({
    title: '',
    assignee: '',
    priority: '',
    status: '',
  });

  useEffect(() => {
    const task = tasks.find((task) => task.id === parseInt(ids));
    if (task) {
      setFormData({
        title: task.title,
        assignee: task.assignee,
        priority: task.priority,
        status: task.status,
      });
    }
  }, [ids, tasks]);

  const handleUpdate = () => {
    dispatch(updateTaskPriority({
      taskId: parseInt(ids),
      newPriority: formData.priority,
    }));
    
    dispatch(updateTaskStatus({
      taskId: parseInt(ids),
      newStatus: formData.status,
    }));

    onHide();  // Close the modal after updating
  };

  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [priorityModalVisible, setPriorityModalVisible] = useState(false);

  const renderStatusModal = () => (
    <Modal visible={statusModalVisible} onRequestClose={() => setStatusModalVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setStatusModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Select Status</Text>
          {['Pending', 'In Progress', 'Completed', 'Deployed', 'Deferred'].map((item) => (
            <TouchableOpacity key={item} style={styles.modalOption} onPress={() => {setFormData({ ...formData, status: item }); setStatusModalVisible(false)}}>
              <Text style={styles.modalOptionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  const renderPriorityModal = () => (
    <Modal visible={priorityModalVisible} onRequestClose={() => setPriorityModalVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setPriorityModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Select Priority</Text>
          {['P1', 'P2', 'P3'].map((item) => (
            <TouchableOpacity key={item} style={styles.modalOption} onPress={() => {setFormData({ ...formData, priority: item }); setPriorityModalVisible(false)}}>
              <Text style={styles.modalOptionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  return (
    <Modal visible={show} onRequestClose={onHide} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onHide}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Update Task</Text>
          <View style={styles.modalBody}>
            <Text style={styles.label}>Title</Text>
            <Text style={styles.value}>{formData.title}</Text>

            <Text style={styles.label}>Assignee</Text>
            <Text style={styles.value}>@{formData.assignee}</Text>

            <Text style={styles.label}>Status</Text>
            <TouchableOpacity onPress={() => setStatusModalVisible(true)} style={styles.selectButton}>
              <Text style={styles.selectButtonText}>{formData.status}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Priority</Text>
            <TouchableOpacity onPress={() => setPriorityModalVisible(true)} style={styles.selectButton}>
              <Text style={styles.selectButtonText}>{formData.priority}</Text>
            </TouchableOpacity>

            <Button title="Update" onPress={handleUpdate} />
          </View>
        </View>
      </View>
      {renderStatusModal()}
      {renderPriorityModal()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalBody: {
    alignItems: 'flex-start'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#f00',
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  modalOptionText: {
    fontSize: 18,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  value: {
    fontSize: 16,
    marginBottom: 15
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15
  },
  selectButtonText: {
    fontSize: 16,
    textAlign: 'center'
  }
});

export default UpdatePage;
