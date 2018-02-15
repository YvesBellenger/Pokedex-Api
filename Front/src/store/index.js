import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import {timeout} from '../utils';
import {sortBy} from 'lodash';
import jwtDecode from 'jwt-decode';



Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    userConnected: false,
    pokemonList: [],
    userInfos: null,
    userPokemons: [],
    search: '',
    fetching: false,
  },
  getters: {
    filteredPokemons(state) {
      let list = state.pokemonList.filter(element => {
        let index = element.Name.toLowerCase().indexOf(state.search.toLowerCase());
        return index > -1;
      })
      return sortBy(list, o => o.Number);
    },
    getPokemon(state) {
      return number => state.pokemonList.find(element => element.Number === number);
    }
  },
  mutations: {
    connectUser(state, userInfos) {
      state.userInfos = userInfos;
      state.userConnected = true;
    },
    disconnectUser(state) {
      state.userConnected = false;
    },
    updateListPokemons(state, list) {
      state.pokemonList = list;
    }
  },
  actions: {
    async fetchPokemons(context) {
      context.state.fetching = true;
      let {data} = await axios.get('http://localhost:3000/pokemons');
      context.commit('updateListPokemons', data);
      console.log(data);
      context.state.fetching = false;
      
    },
    async connexionRequest(context, formData) {
      let {data} = await axios.post('http://localhost:3000/users/connexion', formData);
      console.log(data);
      if (data) {
        let jwt = await jwt_decode(data.jwt)
        context.commit('connectUser', data.userInfos);
        return true;
      }
      return false;
    },
    async submitRequest(context, formData) {
      let {data} = await axios.post('http://localhost:3000/users', formData);
      console.log(data);
      if (data) {
        return true;
      }
      return false;
    }
  },
})