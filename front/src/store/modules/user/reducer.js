const DEFAULT_STATE = {
  profile: null,
};

export default function user(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case '@auth/LOGIN_SUCCESS':
      return {
        profile: action.payload.user,
      };

    default:
      return state;
  }
}
