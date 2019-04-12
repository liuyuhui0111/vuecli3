/* eslint-disable */
// initial state
// shape: [{ id, quantity }]
const state = {
    items: [],
};

// getters
const getters = {
    getItems: (state, getters, rootState) => state.items,
};

// actions
const actions = {
    checkout({ commit, state }, items) {
    // empty cart
        commit('setItems', { items });
    },
};

// mutations
const mutations = {

    setItems(state, { items }) {
        state.items = items;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
