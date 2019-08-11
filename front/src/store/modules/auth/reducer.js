const DEFAULT_STATE = {
  loading: false,
  loggedIn: false,
  token: null,
};

export default function auth(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case '@auth/LOGIN_LOADING':
      return {
        ...state,
        loading: action.loading,
      };

    case '@auth/LOGIN_SUCCESS':
      return {
        loading: false,
        loggedIn: true,
        token: action.payload.token,
      };

    case '@auth/LOGIN_FAILURE':
      return {
        loading: false,
        loggedIn: false,
        token: null,
      };

    case '@auth/LOGOUT':
      return {
        loading: false,
        loggedIn: false,
        token: null,
      };

    default:
      return state;
  }
}
