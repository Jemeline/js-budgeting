import React, {
  useState, useContext, createContext, useMemo, useEffect,
} from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { apiLogin, apiGetUser } from '../utils/api';

const UserStateContext = createContext();
const UserActionsContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const history = useHistory();

  const login = (payload) => {
    try {
      apiLogin(payload)
        .then((res) => {
          setUser(res.data.user);
          Cookies.set('jsb-session-id', res.data.user._id, { expires: 0.1 });
        })
        .finally(() => history.push('/'));
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser({});
    Cookies.remove('jsb-session-id');
  };

  const userActions = useMemo(() => [login, logout], []);

  useEffect(() => {
    const sessionId = Cookies.get('jsb-session-id');

    if (sessionId && !user._id) {
      try {
        apiGetUser(sessionId)
          .then((res) => setUser(res.data))
          .finally(() => history.push('/'));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <UserStateContext.Provider value={user}>
      <UserActionsContext.Provider value={userActions}>
        {children}
      </UserActionsContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const user = useContext(UserStateContext);

  if (!user) {
    throw new Error('Cannot use User State unless the component is wrapped in the UserProvider');
  }

  return user;
}

function useUserActions() {
  const userActions = useContext(UserActionsContext);

  if (!userActions) {
    throw new Error('Cannot use User Actions unless the component is wrapped in the UserProvider');
  }

  return userActions;
}

const useUser = () => [useUserState(), useUserActions()];

export {
  UserProvider, useUserState, useUserActions, useUser,
};
