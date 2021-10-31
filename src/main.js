import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import "./plugins/vuetify";
import "./utils/sweetalert2";
import "./registerServiceWorker";
import "./utils/axios";
import "./utils/clipboard";
import SocialSharing from "vue-social-sharing";
import ShareButtons from "./components/ShareButtons.vue";
import VueI18n from "vue-i18n";

Vue.use(SocialSharing);
Vue.component("share-buttons", ShareButtons);
Vue.config.productionTip = false;
Vue.prototype.hostURL = window.location.protocol + "//" + window.location.host;
Vue.prototype.window = window;

Vue.use(VueI18n);
Vue.config.productionTip = false;
const i18n = new VueI18n({
  locale: localStorage.getItem("locale") || navigator.language || "en",
  fallbackLocale: "en"
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
