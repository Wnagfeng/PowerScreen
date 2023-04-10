import { createApp } from "vue";
import "normalize.css";
import "default-passive-events";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
