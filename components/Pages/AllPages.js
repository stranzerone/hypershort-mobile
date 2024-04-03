import React from 'react';
import { View, Text, ScrollView } from 'react-native'; // Import ScrollView component
import Card from '../Material/Card.js';
import { useSelector } from 'react-redux';
import styles from './PagesStyle.js'; // Importing the StyleSheet

const AllTasks = ({ name, startDate, endDate, priorityFilter, sortPriority }) => {
  
  const Tasks = useSelector((state) => state.tasks.tasks);

  const filterArrayByParam = (status) => {
    const filteredTasks = Tasks.filter(item => 
      item.status === status &&
      (!name || item.assignee.toLowerCase().includes(name.toLowerCase())) &&
      (!startDate || new Date(item.startDate) >= new Date(startDate)) &&
      (!endDate || new Date(item.endDate) <= new Date(endDate)) &&
      (!priorityFilter || item.priority === priorityFilter)
    );

    if (sortPriority) {
      const priorityOrder = ['P1', 'P2', 'P3'];
      filteredTasks.sort((a, b) => {
        const aIndex = priorityOrder.indexOf(a.priority);
        const bIndex = priorityOrder.indexOf(b.priority);

        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;

        if (a.priority === sortPriority) return -1;
        if (b.priority === sortPriority) return 1;

        return aIndex - bIndex;
      });
    }

    return filteredTasks;
  };

  return (
    <ScrollView horizontal={true}>
      <View style={{ display: 'flex', flexDirection: "row"}}>
        <Card tasks={filterArrayByParam("Pending")} status= {"Pending"}/>
        <Card tasks={filterArrayByParam("In Progress")}  status= {"In Progress"} />
        <Card tasks={filterArrayByParam("Deployed")}  status= {"Deployed"} />
        <Card tasks={filterArrayByParam("Completed")}  status= {"Completed"} />
        <Card tasks={filterArrayByParam("Deferred")}  status= {"Deferred"} />
      </View>
    </ScrollView>
  );
};

export default AllTasks;
