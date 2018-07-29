import Vue from "vue";
import Field from "./Field.vue";
import Form from "./Form.vue";

const Components = {
  Field,
  Form
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
