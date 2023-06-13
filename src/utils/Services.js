/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-case-declarations */
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  startOfYear,
  endOfQuarter,
  endOfYear,
} from 'date-fns';
import { Buffer } from 'buffer';
import Functions from './Functions';

const defSuccessMessage = 'Operation was successful!';

class Services {
  constructor(that) {
    this.BASE_URL = process.env.REACT_APP_HOST;
    this.that = that;
    this.initialState = JSON.stringify(this.that.state);
    this.function = new Functions(this.that);
  }

  getJokes = () => {
    this.function.setIsLoading('true');
    axios
      .get(
        `${this.BASE_URL}/jokes`
      )
      .then((response) => {
        this.function.setIsLoading('false');
        this.that.setState({
          jokes: response.data
        })
      })
      .catch((error) => {
        this.function.handleError(error);
      });
  };

  signOut = () => {
    window.location.href= '/'
  };

  getJoke = (id) => {
    this.function.setIsLoading('true');
    axios
      .get(
        `${this.BASE_URL}/jokes/${id}`
      )
      .then((response) => {
        this.function.setIsLoading('false');
        this.that.setState({
          item: response.data,
        });
      })
      .then(async () => {
        this.function.populateFields(this.that);
      })
      .catch((error) => {
        this.function.handleError(error);
      });
  };

  submitAction = (item, special, action) => {
    let url = '';
    let data;
    switch (special) {
      case 'jokes':
        switch (action) {
          case 'post':
            url = `${this.BASE_URL}/jokes`;
            data = item;
            break;
          case 'put':
            url = `${this.BASE_URL}/jokes/${this.that.state.jokeId}`;
            data = item;
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    const process = action === 'delete' ? 'put' : action;
    switch (process) {
      case 'post':
        this.__createSubmission(process, url, data, special);
        break;
      case 'put':
        this.__updateSubmission(process, url, data, special);
        break;
      default:
        break;
    }
  };

  __createSubmission = (method, url, data, special) => {
    this.function.setIsLoading('true');
    axios
      .post(url, data, this.CONFIG)
      .then((response) => {
        this.function.setIsLoading('false');
        if (
          response.status === 200
          || response.status === 201
          || response.status === 204
        ) {
          const message = response.data.message || defSuccessMessage;
          this.function.setMessage('success', message);

          this.function.setIsLoading('false');
          switch (special) {
            case 'jokes':
              setTimeout(
                () => this.that.props.history.push('/app/jokes'),
                1000,
              );
              break;
            default:
              break;
          }
        }
      })
      .catch((error) => {
        this.function.handleError(error);
      });
  };

  __updateSubmission = (method, url, data, special) => {
    this.function.setIsLoading('true');
    axios
      .put(url, data, this.CONFIG)
      .then((response) => {
        this.function.setIsLoading('false');
        if (
          response.status === 200
          || response.status === 201
          || response.status === 204
        ) {
          const message = response.data.message || defSuccessMessage;
          this.function.setMessage('success', message);

          this.function.setIsLoading('false');
          switch (special) {
            case 'jokes':
              setTimeout(
                () => this.that.props.history.push('/app/jokes'),
                1000,
              );
              break;
            default:
              break;
          }
        }
      })
      .catch((error) => {
        this.function.handleError(error);
      });
  };

  }

export default Services;
