import { StyleSheet } from 'react-native';

const DashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EAF3',
  },
  header: {
    backgroundColor: '#3F51B5',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  filterButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    flex: .5,
    marginRight: 10,
    alignItems: 'center',
  },
  sortButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  filterMenu: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
    elevation: 3,
  },
  sortMenu: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
    elevation: 3,
  },
  sortOption: {
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dateRange: {
    flexDirection: 'row',
    gap:20,
    marginBottom: 10,
  },
  startDateButton:{
backgroundColor:"#F4F4F4",
padding:10,
borderRadius:15,
color:"black",
fontWeight:"900"
  },
  selectButton: {
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  priorityButton: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollViewContent: {
    padding: 20,
  },
});

export default DashboardStyles;
