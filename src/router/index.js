import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import PendingPage from '../components/PendingPage.vue';
import CreateApplication from '../components/CreateApplication.vue';
import ApprovalPage from '../components/ApprovalPage.vue';
import SubmittedPage from '../components/SubmittedPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/pending', component: PendingPage },
  { path: '/create', component: CreateApplication },
  { path: '/approval/:applicationId', component: ApprovalPage, props: true },
  { path: '/submitted', component: SubmittedPage }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
