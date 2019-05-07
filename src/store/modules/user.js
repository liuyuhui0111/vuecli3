/* eslint-disable */
// initial state
// shape: [{ id, quantity }]
const state = {
    commonUserData: JSON.parse(window.localStorage.getItem('commonUserData')) || null,
};


// actions
const actions = {

};

// mutations
const mutations = {

    setUsers(state, user) {
        window.localStorage.setItem('commonUserData',JSON.stringify(user))
        state.commonUserData = user;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
