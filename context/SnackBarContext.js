import React, {createContext, useContext, useState} from 'react';
import {Snackbar} from 'react-native-paper';

const SnackbarContext = createContext();

export const SnackbarProvider = ({children}) => {
  const [snackbar, setSnackbar] = useState({visible: false, message: ''});

  const showSnackbar = message => {
    setSnackbar({visible: true, message});
  };

  const hideSnackbar = () => {
    setSnackbar({visible: false, message: ''});
  };

  return (
    <SnackbarContext.Provider value={{showSnackbar, hideSnackbar}}>
      {children}
      <Snackbar
        visible={snackbar.visible}
        onDismiss={hideSnackbar}
        action={{
          label: 'Dismiss',
          onPress: hideSnackbar,
        }}>
        {snackbar.message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
