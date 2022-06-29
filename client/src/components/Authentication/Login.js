import React, { useState } from 'react';
import {
  Button, Col, Form, FormGroup, FormFeedback, Input,
} from 'reactstrap';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import { validateEmail } from '../../utils/regex';
import { useUser } from '../../contexts/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertLogin, setAlertLogin] = useState(false);
  const [alertInvalidCreds, setAlertInvalidCreds] = useState(false);
  const [alertAlreadyLoggedIn, setAlertAlreadyLoggedIn] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [user, [login, logout]] = useUser();

  const dismissAlerts = () => {
    setAlertLogin(false);
    setAlertAlreadyLoggedIn(false);
    setAlertInvalidCreds(false);
    setAlertMessage('');
  };

  async function handleLogin() {
    try {
      if (!email || !password) {
        dismissAlerts();
        setAlertLogin(true);
        setAlertMessage('Please fill in all required fields');
      } else if (!user._id) {
        const payload = { email, password };
        login(payload);
      } else {
        dismissAlerts();
        setAlertAlreadyLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setAlertLogin(true);
        setAlertMessage(error.response.data.msg);
      } else {
        dismissAlerts();
        setAlertLogin(true);
        setAlertMessage('Oops... Something Went Wrong');
      }
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        height: 'calc(100vh)', width: '40vw', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
      }}
      >
        <Col>
          <Collapse in={alertLogin} style={{ marginBottom: '10px' }}>
            <Alert severity="error" onClose={() => setAlertLogin(false)}>{alertMessage}</Alert>
          </Collapse>
          <Collapse in={alertInvalidCreds} style={{ marginBottom: '10px' }}>
            <Alert severity="error" onClose={() => setAlertInvalidCreds(false)}>We can&apos;t find that username and password.</Alert>
          </Collapse>
          <Collapse in={alertAlreadyLoggedIn} style={{ marginBottom: '10px' }}>
            <Alert severity="info" onClose={() => setAlertAlreadyLoggedIn(false)}>
              Please
              <Link to="/login" onClick={() => { setAlertAlreadyLoggedIn(false); logout(); }}>Logout</Link>
            </Alert>
          </Collapse>
          <Form className="form" style={{ marginBottom: '10px' }}>
            <FormGroup>
              <Input
                type="email"
                name="Email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                valid={validateEmail(email)}
                invalid={email.length > 0 && !validateEmail(email)}
                value={email}
              />
              <FormFeedback>
                There is an issue with your email. Please input a correct email.
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                style={{ marginTop: '10px' }}
              />
            </FormGroup>
            <Button
              size="md"
              type="submit"
              disabled={
                                    !(validateEmail(email))
                                    || !(email.length > 0)
}
              onClick={async (e) => {
                e.preventDefault();
                dismissAlerts();
                await handleLogin();
              }}
              style={{ marginTop: '10px', backgroundColor: '#D90166', borderColor: '#D90166' }}
            >
              {' '}
              Sign In
            </Button>
          </Form>
          Don&apos;t Have an Account?
          <Link to="/register" style={{ marginLeft: '1vw' }}>Sign Up Now</Link>
          <br />
          <Link to="/register">Forgot Password?</Link>
        </Col>
      </div>
    </div>
  );
}
export default Login;
