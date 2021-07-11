import React, {useState} from 'react';
import {Button,Col,Input} from 'reactstrap';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {apiVerify,apiToken} from '../../utils/api';
import {validateToken} from '../../utils/regex';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

function VerifyEmail({height}){
    const [alertVerify, setAlertVerify] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertMessageVerify, setAlertMessageVerify] = useState('');
    const [loading,setLoading]=useState(false);
    const history = useHistory();
    const [token, setToken] = useState('');
    const [alertInvalidToken, setAlertInvalidToken] = useState(false);
    const [step,setStep]=useState(0);

    const dismissAlerts= () => {
        setAlertVerify(false);
        setAlertSuccess(false);
        setAlertInvalidToken(false);
        setAlertMessageVerify('');
    };
    
    async function sendToken(){
        try{
            const data = await apiVerify(sessionStorage.getItem('id'));
            setStep(1);
          } catch (error){
                if (error.response.status === 401){
                    setAlertVerify(true);
                    setAlertMessageVerify("We were unable to find an account associated with your credentials. Please try again.");
                } else {
                    setAlertVerify(true);
                    setAlertMessageVerify("Oops... Something Went Wrong");
                }
          };
    };

    async function handleToken(){
        try{
            const body = {"token":token,"_userId":sessionStorage.getItem('id')}
            const data = await apiToken(body);
            setAlertSuccess(true);
          } catch (error){
                console.log(error);
                if (error.response.status === 401){
                    setAlertInvalidToken(true);
                } else if (error.response.status === 402) {
                    setAlertVerify(true);
                    setAlertMessageVerify(error.response.data.msg);
                } else if (error.response.status === 403) {
                    setAlertSuccess(true);
                } else {
                    setAlertVerify(true);
                    setAlertMessageVerify("Oops... Something Went Wrong");
                }
          };
    };

    return (
    <div>
        <div style={{height:(height==='modal') ? '': 'calc(100vh - 60px)',width:'25vw',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Col>
                <Collapse in={alertVerify}>
                    <Alert severity="error" onClose={() => setAlertVerify(false)}>{alertMessageVerify}</Alert>
                </Collapse>
                <Collapse in={alertInvalidToken}>
                    <Alert severity="error" onClose={() => setAlertInvalidToken(false)}>
                        Your token is incorrect or expired. Please <Link to="/verify" onClick={()=>{setStep(0);}}>request a new token</Link> or try again.
                    </Alert>
                </Collapse>
                <Collapse in={alertSuccess}>
                    <Alert severity="success" onClose={() => setAlertSuccess(false)}>
                        Success! <Link to="/verify" onClick={()=>{history.push('/');}}>Go to your dashboard</Link>
                    </Alert>
                </Collapse>
                <div hidden={step !== 0} style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',marginTop:'10px'}}>
                    Click below to verify your email
                    <div style={{marginTop:'15px'}}>
                        <Button 
                            size="md"
                            onClick={async () => {
                                dismissAlerts();
                                setLoading(true);
                                await sendToken();
                                setLoading(false);
                            }}
                            style={{marginBottom:'0px',marginTop:'0px'}}
                            > Send Me a Code
                        </Button>
                    </div>
                    <Button color="link" style={{fontSize:'12px',outline:'none',marginTop:'0px'}} onClick={()=>{setStep(1);}}>I already have a token</Button>  
                </div>
                <div hidden={step !== 1} style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',marginTop:'10px'}}>
                    Enter the token below to verify your email
                    <Input
                        type="text"
                        name="token"
                        placeholder="Token"
                        value={token}
                        onChange={(e) => {
                            setToken(e.target.value)
                        }}
                        valid={validateToken(token)}
                        invalid={token.length > 0 && !validateToken(token)}
                        style={{marginTop:'15px'}}
                    />
                    <Button 
                            size="md"
                            onClick={async () => {
                                dismissAlerts();
                                setLoading(true);
                                await handleToken();
                                setLoading(false);
                            }}
                            disabled={!validateToken(token)}
                            style={{marginTop:'15px'}}
                    > Confirm My Email
                    </Button>
                    <Button color="link" style={{fontSize:'12px',outline:'none'}} onClick={()=>{setStep(0);}}>I need a token</Button>  
                </div>
            </Col>
        </div>
    </div>
)};

export default VerifyEmail;