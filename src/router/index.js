import Vue from 'vue';
import VueRouter from 'vue-router';
import showProjects from './../components/ShowProjects.vue';
import App from '../App.vue';
import ProjectDashBoard from '../components/ProjectDashBoard.vue';
import Overview from '../components/dashBoardComponent/OverView.vue';
import Survey from '../components/dashBoardComponent/Survey.vue';
import Design from '../components/dashBoardComponent/Design.vue';
import Quotation from '../components/dashBoardComponent/Quotation.vue';
import Contract from '../components/dashBoardComponent/Contract.vue';
import Construction from '../components/dashBoardComponent/Construction.vue';
import Install from '../components/dashBoardComponent/Install.vue';
import Maintenance from '../components/dashBoardComponent/Maintenance'

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
				path:'/',
				component: showProjects,
			},
      {
				path: '/projects/:id',
				name:'projects',
        component: ProjectDashBoard,
        children: [
          {
						path:'over-view',
						name:'over-view',
            component: Overview
          },
          {
						path:'survey',
						name:'survey',
            component: Survey,
            props: () => ({
              projectId: dataProjectDb.projectId
            })
          },
          {
						path:'design',
						name:'design',
            component: Design
          },
          {
						path:'quotation',
						name:'quotation',
            component: Quotation
          },
          {
						path:'contract',
						name:'contract',
            component: Contract
          },
          {
						path:'construction',
						name:'construction',
            component: Construction
          },
          {
						path:'install',
						name:'install',
            component: Install
          },
          {
						path:'maintaince',
						name:'maintaince',
            component: Maintenance
          },
        ]
      }
    ]
	})
export default router