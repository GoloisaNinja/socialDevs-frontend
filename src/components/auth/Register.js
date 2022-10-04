import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../Alert';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // Redirect if logged in

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='container'>
      <Alert />
      <Fragment>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              className='float-input'
              id='name'
              type='text'
              name='name'
              required
              value={name}
              onChange={(e) => onChange(e)}
            />
            <label htmlFor='name' className='float-label'>
              Name
            </label>
          </div>
          <div className='form-group'>
            <input
              className='float-input'
              id='email'
              type='email'
              name='email'
              required
              value={email}
              onChange={(e) => onChange(e)}
            />
            <label htmlFor='email' className='float-label'>
              Email Address
            </label>
            <small className='form-text'>
              This site uses Gravatar! Sign up with an email that supports
              Gravatar for a profile image.
            </small>
          </div>
          <div className='form-group'>
            <input
              className='float-input'
              id='password'
              type='password'
              name='password'
              required
              minLength='7'
              onChange={(e) => onChange(e)}
            />
            <label htmlFor='password' className='float-label'>
              Password
            </label>
          </div>
          <div className='form-group'>
            <input
              className='float-input'
              id='passwordtwo'
              type='password'
              name='password2'
              required
              minLength='7'
              onChange={(e) => onChange(e)}
            />
            <label htmlFor='passwordtwo' className='float-label'>
              Confirm Password
            </label>
          </div>
          <input type='submit' value='Register' className='btn btn-primary' />
        </form>
        <p className='my-1'>
          Already have an account?<Link to='/login'> Sign In</Link>
        </p>
      </Fragment>
    </section>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
