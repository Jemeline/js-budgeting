import React, { useState, useEffect } from 'react';
import {
  Modal, ModalHeader, ModalBody, Button,
} from 'reactstrap';
import VerifyEmail from '../components/Authentication/VerifyEmail';
import CategoryTable from '../components/Tables/CategoryTable';
import RecentTransactions from '../components/Tables/RecentTransactions';
import UpdateBudgetReusable from '../components/Dashboard/UpdateBudgetReusable';
import Total from '../components/Dashboard/Total';
import { useBudgetState } from '../contexts/BudgetContext';
import { useUserState } from '../contexts/UserContext';

function Home() {
  const [modal, setModal] = useState(false);
  const { budget } = useBudgetState();
  const user = useUserState();

  useEffect(() => {
    if (user._id && !user.isVerified) {
      setModal(true);
    }
  }, [user]);

  const closeBtn = <Button size="sm" onClick={() => { setModal(false); }} style={{ backgroundColor: 'white', borderColor: 'white', outline: 'none' }}><strong style={{ fontSize: '20px' }}>&times;</strong></Button>;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', height: 'calc(100vh - 60px)',
    }}
    >
      <div>
        <RecentTransactions budget={budget} type="expense" transactions={5} />
        <div style={{ height: '1.5vh' }} />
        <RecentTransactions budget={budget} type="income" transactions={3} />
      </div>
      <div style={{ width: '30vw' }}>
        <p style={{ color: 'white', margin: 0 }}>Yearly</p>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row',
        }}
        >
          <Total budget={budget} interval="Y" index={0} type="income" />
          <Total budget={budget} interval="Y" index={0} type="expense" />
          <Total budget={budget} interval="Y" index={0} type="saving" />
        </div>
        <p style={{ color: 'white', margin: 0 }}>Monthly</p>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row',
        }}
        >
          <Total budget={budget} interval="M" index={0} type="income" />
          <Total budget={budget} interval="M" index={0} type="expense" />
          <Total budget={budget} interval="M" index={0} type="saving" />
        </div>
      </div>
      <div>
        <div style={{ backgroundColor: '#393E46', borderRadius: '10px' }}>
          <UpdateBudgetReusable BudgetClass="add" />
        </div>
        <div style={{ height: '2.5vh' }} />
        <CategoryTable budget={budget} categories={5} index={0} type="expense" />
      </div>
      <Modal isOpen={modal} toggle={() => { setModal(false); }} style={{ marginTop: '65px', width: '30vw' }}>
        <ModalHeader toggle={() => { setModal(false); }} close={closeBtn}>
          Please Verify Your Email
        </ModalHeader>
        <ModalBody style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        }}
        >
          <VerifyEmail height="modal" />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Home;
