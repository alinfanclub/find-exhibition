export default {
  SET_M_SPACE(state, data) {
    state.markersSpace = data;
    state.isOK = !state.isOK;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
};
