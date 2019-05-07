/* eslint-disable */
// initial state
// shape: [{ id, quantity }]
const state = {
    commonCenterData: {},
};


// actions
const actions = {

};

// mutations
const mutations = {

    setCenterData(state, data) {
        console.log(data);
        state.commonCenterData = data;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
