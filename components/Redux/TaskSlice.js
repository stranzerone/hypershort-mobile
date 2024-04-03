import { createSlice } from '@reduxjs/toolkit';
import Tasks from '../Material/SampleTask';
const initialState = {
  tasks: [...Tasks],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      const newTask = action.payload;
      state.tasks.push(newTask);
    },
    updateTaskPriority: (state, action) => {
      const { taskId, newPriority } = action.payload;

      const updatedTasks = state.tasks.map(task =>
        task.id === taskId ? { ...task, priority: newPriority } : task
      );
      state.tasks = updatedTasks;
    },
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const updatedTasks = state.tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      state.tasks = updatedTasks;
    },
    deleteTask: (state, action) => {
      const taskIdToDelete = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskIdToDelete);
    },
  },
});

export const { addNewTask, updateTaskPriority, updateTaskStatus, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
