import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  taskCardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100%',
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  status: {
    color: 'white',
  },
  title: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 10,
  },
  taskOptions: {
    marginBottom: 20,
  },
  card: {
    minWidth: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  description: {
    marginTop: 10,
    marginBottom: 20,
  },
  assignee: {
    marginTop: 20,
  },
  primaryButton: {
    marginRight: 10,
  },
  smallButton: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    borderRadius: 4,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default styles;
