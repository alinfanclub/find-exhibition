export default {
  SET_SPACE(state, data) {
    state.spaceData = data;
  },
  SET_M_SPACE(state, data) {
    state.markersSpace = data;
    state.isOK = !state.isOK;
  },
};
