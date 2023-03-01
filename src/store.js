import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
    data: localStorage.getItem("data")
};

const mutations = {
    editData(data) {
        const list = data
        localStorage.setItem('data', list)
    }
};

const actions = {
    editData(context, data) {
        context.commit("editData", data);
      }
};

const getters = {
    getData(state) {
        return state.data;
    }
};


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
