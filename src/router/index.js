import Vue from 'vue';
import VueRouter from 'vue-router';
import api from '../components/api/requestApi';

import showProjects from './../components/ShowProjects.vue';

import ProjectDashBoard from '../components/ProjectDashBoard.vue';
import Overview from '../components/dashBoardComponent/OverView.vue';
import Survey from '../components/dashBoardComponent/Survey.vue';
import Design from '../components/dashBoardComponent/Design.vue';
import Quotation from '../components/dashBoardComponent/Quotation.vue';
import Contract from '../components/dashBoardComponent/Contract.vue';
import Construction from '../components/dashBoardComponent/Construction.vue';
import Install from '../components/dashBoardComponent/Install.vue';
import Maintenance from '../components/dashBoardComponent/Maintenance';
import Login from '../components/Login.vue';

Vue.use(VueRouter);
var dataProjectDb = ProjectDashBoard.data()
// console.log(data.projects);

const router = new VueRouter ({
    routes: [
      // {
      //   path:'/',
      //   component: Login
      // },
			{
				path:'/login',
        component: Login,
        name:'login'
      },
      {
        path:'/',
        component: showProjects,
        name:'show-projects',
        meta: { requiresAuth: true }
      },
      {
				path: '/projects/:id',
				name:'projects',
        component: ProjectDashBoard,
        meta: { requiresAuth: true },
        children: [
          {
						path:'over-view',
						name:'over-view',
            component: Overview,
            meta: { requiresAuth: true }
          },
          {
						path:'survey',
						name:'survey',
            component: Survey,
            props: () => ({
              projectId: dataProjectDb.projectId
            }),
            meta: { requiresAuth: true }
          },
          {
						path:'design',
						name:'design',
            component: Design,
            meta: { requiresAuth: true }
          },
          {
						path:'quotation',
						name:'quotation',
            component: Quotation,
            meta: { requiresAuth: true }
          },
          {
						path:'contract',
						name:'contract',
            component: Contract,
            meta: { requiresAuth: true }
          },
          {
						path:'construction',
						name:'construction',
            component: Construction,
            meta: { requiresAuth: true }
          },
          {
						path:'install',
						name:'install',
            component: Install,
            meta: { requiresAuth: true }
          },
          {
						path:'maintaince',
						name:'maintaince',
            component: Maintenance,
            meta: { requiresAuth: true }
          },
        ]
      }
    ]
  })
  
  router.beforeEach( async (to, from, next) => {
    const currentUser = await api.verifyLogin();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    // console.log('currentUser', currentUser);
    // console.log('required', requiresAuth);
    if (requiresAuth && !currentUser) {
      const loginpath = window.location.pathname;
      next({ name: 'login', query: { from: loginpath } });
    } else 
        if (!requiresAuth && currentUser){
          next({name:'show-projects'})
        }
        else next();
  });
export default router