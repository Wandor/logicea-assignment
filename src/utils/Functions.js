const defErrorMessage = 'An error occured processing your current request!';
class Functions {
  constructor(that) {
    this.that = that;
    this.initialState = JSON.stringify(that.state);
  }

  handleSubmit = (event, fields, special) => {
    window.scrollTo(0, 0);

    if (this.checkEmpty(fields)) {
      return;
    }

    switch (special) {
      case 'joke':
        this.that.submitForm();
        break;
      default:
        break;
    }
  };

  // handles input change
  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    this.that.setState({
      [name]: target.value,
    });
  };


 // handles empty inputs
  checkEmpty = (requiredFields) => {
    const empty = [];
    requiredFields.forEach((field) => (
      this.that.state[`${field}`] === '' || this.that.state[`${field}`] === null
        ? empty.push(field) : false));

    if (empty.length === 0) {
      return false;
    }
    this.setMessage(
      'error',
      "It appears there are required fields you haven't filled!",
    );

    empty.forEach((emptyField) => ( document.getElementById(`${emptyField}`).classList.add('required')));
    setTimeout(() => {
      this.that.setState({ error: false, errorMessage: '' });
      empty.forEach((emptyField) => ( document
          .getElementById(`${emptyField}`)
          .classList.remove('required')));
    }, 8000);
    return true;
  };

  // handles input on focus
  handleFocus = (event) => {
    const target = event.target;
    const name = target.name;
    document.getElementById(`${name}`).classList.remove('required');
    this.that.setState({
      emptyFields: false,
      error: false,
      errorMessage: '',
    });
  };

  // sets alert messages to null or emnpty
  timeOut = (that) => {
    setTimeout(
      () => this.that.setState({
        error: false,
        errorMessage: '',
        success: false,
        successMessage: '',
      }),
      8000,
    );
  };

  // sets error or success message
  setMessage = (type, message) => {
    this.that.setState({
      error: type === 'error',
      errorMessage: type === 'error' ? message : '',
      success: type === 'success',
      successMessage: type === 'success' ? message : '',
      warning: type === 'warning',
      warningMessage: type === 'warning' ? message : '',
    });
    this.timeOut(this);
  };

  setIsLoading = (value) => {
    this.that.setState({
      isLoading: value === 'true',
    });
  };

  // function to populate fields
  populateFields = (that) => {
    // eslint-disable-next-line array-callback-return
    Object.keys(that.state).map((obj) => {
      for (const [key, value] of Object.entries(this.that.state.item)) {
        if (obj === key) {
          that.setState({
            [obj]: value === null ? '' : value,
          });
        } else if (key === 'id') {
          that.setState({ id: value === null ? '' : value });
        }
      }
    });
  };

  // Toggle side bar menu
  _onSideMenu = (active) => {
    this.that.setState({ sideMenu: active });
  };

  toggleClass = (e) => {
    e.preventDefault();
    const currentState = this.that.state.active;
    this.that.setState({ active: !currentState });
  };


  handleCancel = () => {
    this.that.props.history.goBack();
  };


  handleError = (error) => {
    // eslint-disable-next-line no-console
    this.setIsLoading('false');
    // eslint-disable-next-line no-console
    console.log('This is the error: ', error);
    if (error.response) {
      const message = error.response.data.message || error.message || defErrorMessage;
      this.setMessage('error', message);
      this.that.props.history.push('/');
    } else if (error.request) {
      // localStorage.setItem('error', error);
      this.that.props.history.push('/app/error-page');
    } else {
      // localStorage.setItem('error', error);
      this.that.props.history.push('/app/error-page');
    }
    this.timeOut(error, this);
  };

}

export default Functions;
