import Vue from "vue";
import AnalogueTimepiece from "./AnalogueTimepiece.vue";

const Components = {
  AnalogueTimepiece
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
