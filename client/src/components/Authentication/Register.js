import React, {useState} from 'react';
import {Button,FormGroup,Input,FormFeedback} from 'reactstrap';
import {Form,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {login,logout} from '../../utils/common';
import {validatePassword,validateEmail,validatePasswordLiteral} from '../../utils/regex';
import { useHistory } from "react-router-dom";
import { apiRegister} from '../../utils/api';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';

function Register(){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [alertRegister, setAlertRegister] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [alertAlreadyLoggedIn, setAlertAlreadyLoggedIn] = useState(false);
	const history = useHistory();

	const dismissAlerts= () => {
		setAlertMessage('');
		setAlertAlreadyLoggedIn(false);
		setAlertRegister(false);
	};

	async function handleRegister(){
		try{
			dismissAlerts();
			if (!email||!password||!passwordConfirm||!firstName||!lastName){
				dismissAlerts();
				setAlertRegister(true);
				setAlertMessage("Please fill in all required fields");
			} else {
				if (!sessionStorage.getItem('id')){
					const payload = {
						"email":email,
						"password":password,
						"first":firstName,
						"last":lastName,
					};
					const data = await apiRegister(payload);
					login(data.data.user._id);
					history.push(`/`);
				} else {
					dismissAlerts();
					setAlertAlreadyLoggedIn(true);
				}
		}
		} catch (error){
			if (error.response.status === 401){
				dismissAlerts();
				setAlertRegister(true);
				setAlertMessage(error.response.data.msg);
			} else {
				dismissAlerts();
				setAlertRegister(true);
				setAlertMessage("Oops... Something Went Wrong");
			} 
		};
	};

	return (
	<div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
			<div style={{height:'calc(100vh)',width:'40vw',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>
					<Col>
						<Collapse in={alertRegister} style={{marginBottom:'10px'}}>
								<Alert severity="error" onClose={() => setAlertRegister(false)}>{alertMessage}</Alert>
						</Collapse>
						<Collapse in={alertAlreadyLoggedIn} style={{marginBottom:'10px'}}>
								<Alert severity="error" onClose={() => setAlertAlreadyLoggedIn(false)}>
										Please <Link to="/register" onClick={()=>{setAlertAlreadyLoggedIn(false);logout()}}>Logout</Link>
								</Alert>
						</Collapse>
				<Form className="form" style={{marginBottom:'10px'}}>
					<FormGroup>
						<Input
									type="email"
									name="Email"
									placeholder="Email"
									onChange={(e) => setEmail(e.target.value)}
									valid={email.length !== 0 && validateEmail(email)}
									invalid={email.length > 0 && !validateEmail(email)}
						/>
						<FormFeedback>
							There is an issue with your email. Please input a correct email.
						</FormFeedback>
					</FormGroup>
						<Row form style={{marginTop:'10px'}}>
							<Col md={6}>
								<FormGroup>
									<Input
											type="text"
											name="firstName"
											placeholder="First Name"
											invalid={firstName.length > 0 && /[^a-zA-Z]/.test(firstName)}
											valid={firstName.length !== 0 && !/[^a-zA-Z]/.test(firstName)}
											onChange={(e) => setFirstName(e.target.value)}
										/>
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
										<Input
											type="text"
											name="lastName"
											placeholder="Last Name"
											invalid={lastName.length > 0 && /[^a-zA-Z]/.test(lastName)}
											valid={lastName.length !== 0 && !/[^a-zA-Z]/.test(lastName)}
											onChange={(e) => setLastName(e.target.value)}
										/>
								</FormGroup>
							</Col>
						</Row>
						<Row form style={{marginTop:'10px'}}>
							<Col md={6}>
								<FormGroup>
									<Input
										type="password" 
										name="password"
										placeholder="Password"
										invalid={password.length > 0 && !validatePassword(password)} 
										valid={validatePassword(password)}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<FormFeedback>
											{validatePasswordLiteral(password)}
									</FormFeedback>
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Input
										type="password" 
										name="passwordConfirm" 
										placeholder="Confirm Password" 
										invalid={passwordConfirm.length > 0 && (!validatePassword(passwordConfirm) || (password)!==(passwordConfirm))} 
										valid={(password)===(passwordConfirm) && validatePassword(passwordConfirm)}
										onChange={(e) => {setPasswordConfirm(e.target.value);}}
									/>
									<FormFeedback>
											Passwords do not match
									</FormFeedback>
								</FormGroup>
							</Col>
						</Row>
						<Button 
							size="md" 
							type="submit"
							disabled={
								!((password)===(passwordConfirm) && validatePassword(passwordConfirm))
								||!(validateEmail(email))
								||!(email.length > 0)
								||!(lastName.length !== 0 && !/[^a-zA-Z]/.test(lastName))
								||!(firstName.length !== 0 && !/[^a-zA-Z]/.test(firstName))
							} 
							onClick={async (e) => {
								e.preventDefault();
								dismissAlerts();
								await handleRegister();
							}}
							style={{marginTop:'10px',backgroundColor:'#D90166',borderColor:'#D90166'}}
						> Register
						</Button> 
				</Form>
				Already Have an Account?
        <Link to='/login' style={{marginLeft:'1vw'}}>Sign In Now</Link>
			</Col> 
			</div>
		</div> 
	)};

export default Register;