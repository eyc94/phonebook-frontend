const Notification = ({ newName, successMessage }) => {
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  if (successMessage) {
    return (
      <div style={successStyle}>
        {successMessage}
      </div>
    );
  }
  
};

export default Notification;
