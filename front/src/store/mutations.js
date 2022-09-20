export default {
  SET_M_SPACE(state, data) {
    state.markersSpace = data;
    state.isOK = !state.isOK;
  },
};
