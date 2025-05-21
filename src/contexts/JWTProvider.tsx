import { ReactNode, useEffect, useReducer } from 'react';
import useDeviceManagement from '../hooks/useDeviceMangement';
import useSidebar from '../hooks/useSidebar';
import { ActionMap } from '../types/actions';
import { AuthState, AuthUser, Device } from '../types/auth';
import { isValidToken, setSession } from '../utils/jwt';
import { clearCookiesByPattern, clearLocalStorageByPattern, clearLocalStorageItems } from '../utils/storageUtils';
import AuthContext from './JWTContext';
// Import mock data
import { mockLogin, mockGetUserInfo, mockUser } from '../mocks/userData';

const INITIALIZE = 'INITIALIZE';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const SIGN_UP = 'SIGN_UP';
const GETUSERINFO = 'GETUSERINFO';

type AuthActionTypes = {
  [INITIALIZE]: {
    isAuthenticated: boolean;
    user: AuthUser | null;
  };
  [SIGN_IN]: {
    user: AuthUser | null;
  };
  [SIGN_OUT]: undefined;
  [SIGN_UP]: {
    user: AuthUser | null;
  };
  [GETUSERINFO]: {
    user: AuthUser | null;
  };
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  smsInjectionDone: false,
};

const JWTReducer = (state: AuthState, action: ActionMap<AuthActionTypes>[keyof ActionMap<AuthActionTypes>]) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
        smsInjectionDone: true,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        smsInjectionDone: false,
      };

    case SIGN_UP:
      return {
        ...state,
        user: action.payload.user,
      };

    case GETUSERINFO:
      return {
        ...state,
        user: action.payload.user,
        smsInjectionDone: true,
      };

    default:
      return state;
  }
};

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  const { injectDevicesIntoSMS, resetSidebar } = useSidebar();
  const { getConversationByDeviceId } = useDeviceManagement();

  useEffect(() => {
    const initialize = async () => {
      try {
        if (state.isAuthenticated && state.smsInjectionDone) {
          return;
        }

        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          
          // Use mock data instead of API call
          const userInfo = await mockGetUserInfo();
          const { document } = userInfo;
          const devices = document.Devices as Device[];
          await getDevices(devices);

          if (!state.smsInjectionDone) {
            await resetSidebar();
            // injectDevicesIntoSMS(document);
          }

          dispatch({ type: INITIALIZE, payload: { isAuthenticated: true, user: document } });
        } else {
          dispatch({ type: INITIALIZE, payload: { isAuthenticated: false, user: null } });
        }
      } catch (err) {
        dispatch({ type: INITIALIZE, payload: { isAuthenticated: false, user: null } });
      }
    };

    initialize();
  }, [state.isAuthenticated, state.smsInjectionDone]);

  const signIn = async (username: string, password: string) => {
    try {
      // Use mock login instead of API call
      const token = await mockLogin(username, password);
      const { document } = token;

      setSession(document.AccessToken);

      // Use mock data for user info
      const userInfoResponse = await mockGetUserInfo();
      const devices = userInfoResponse.document.Devices as Device[];
      await getDevices(devices);
      dispatch({ type: SIGN_IN, payload: { user: userInfoResponse.document } });
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    setSession(null);
    clearLocalStorageItems(['accessToken']);
    clearLocalStorageByPattern('okta');
    clearCookiesByPattern('okta');

    dispatch({ type: SIGN_OUT });
  };

  const signUp = async (username: string, email: string, password: string, firstName: string, lastName: string) => {
    // Mock signup - in a real app this would create a new user
    console.log('Mock signup', { username, email, password, firstName, lastName });
    return Promise.resolve();
  };

  const getDevices = async (devices: Device[]) => {
    devices.forEach(d => {
      getConversationByDeviceId(d.Id, 'RESET');
    });
  };

  const getUserinfo = async () => {
    let userInfo;

    if (!state.user) {
      // Use mock data instead of API call
      userInfo = await mockGetUserInfo();
      dispatch({ type: GETUSERINFO, payload: { user: userInfo.document } });
    }

    if (!state.smsInjectionDone && userInfo) {
      // injectDevicesIntoSMS(userInfo.document);
      dispatch({ type: INITIALIZE, payload: { isAuthenticated: state.isAuthenticated, user: state.user } });
    }
  };

  const resetPassword = (email: string) => console.log('Mock reset password for:', email);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        signIn,
        signOut,
        signUp,
        resetPassword,
        getUserinfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
