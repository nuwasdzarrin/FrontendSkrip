import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';

import Create from '../components/Create.vue';
import Edit from '../components/Edit.vue';
import Index from '../components/Index.vue';
import ViewPDF from '../components/ViewPDF.vue';
import UploadPDF from '../components/UploadPDF.vue';

import Login from '../pages/logins/loogin';
import Profile from '../pages/profiles/Profile';
import signPic from '../pages/profiles/SignPic';
import checking from '../pages/profiles/Checking';

import landingIssuer from '../pages/issuers/LandingIssuer';
import signIssuer from '../pages/issuers/SignIssuer';
import signIssuerId from '../pages/issuers/SignIssuerId';
import certIssuer from '../pages/issuers/CertIssuer';

import landingValidator from '../pages/validators/LandingValidator';
import signValidator from '../pages/validators/SignValidator';

import landingRequestor from '../pages/requestors/LandingRequestor';
import reqSign from '../pages/requestors/ReqSign';
import SignNReq from '../pages/requestors/SignNReq';
import detailReq from '../pages/requestors/DetailReq';


Vue.use(VueRouter);

const routes = [
    {
      name: 'Profile',
      path: '/profile',
      component: Profile
    },
    {
      name: 'SignPic',
      path: '/signpic',
      component: signPic
    },
    {
      name: 'Checking',
      path: '/check',
      component: checking
    },
    {
      name: 'Create',
      path: '/create',
      component: Create
    },
    {
      name: 'Edit',
      path: '/edit',
      component: Edit
    },
    {
      name: 'Index',
      path: '/index',
      component: Index
    },
    {
      name: 'ViewPDF',
      path: '/viewpdf',
      component: ViewPDF
    },
    {
      name: 'UploadPDF',
      path: '/uploadpdf',
      component: UploadPDF
    },
    {
      name: 'Login',
      path: '/',
      component: Login
    },
    {
      name: 'LandingIssuer',
      path: '/issuer',
      component: landingIssuer,
      meta: {
        requiresAuth  : true,
        issuerAuth    : true,
        validatorAuth : false,
        requestorAuth : false
      }
    },
    {
      name: 'SignIssuer',
      path: '/issuer/sign',
      component: signIssuer,
      meta: {
        requiresAuth  : true,
        issuerAuth    : true,
        validatorAuth : false,
        requestorAuth : false
      }
    },
    {
      name: 'SignIssuerId',
      path: '/issuer/sign/:id',
      component: signIssuerId,
      meta: {
        requiresAuth  : true,
        issuerAuth    : true,
        validatorAuth : false,
        requestorAuth : false
      }
    },
    {
      name: 'Cert',
      path: '/cert',
      component: certIssuer
    },
    {
      name: 'LandingValidator',
      path: '/validator',
      component: landingValidator,
      meta: {
        requiresAuth  : true,
        issuerAuth    : false,
        validatorAuth : true,
        requestorAuth : false
      }
    },
    {
      name: 'SignValidator',
      path: '/validator/approve/:id',
      component: signValidator,
      meta: {
        requiresAuth  : true,
        issuerAuth    : false,
        validatorAuth : true,
        requestorAuth : false
      }
    },
    {
      name: 'LandingRequestor',
      path: '/requestor',
      component: landingRequestor,
      meta: {
        requiresAuth  : true,
        issuerAuth    : false,
        validatorAuth : false,
        requestorAuth : true
      }
    },
    {
      name: 'ReqSign',
      path: '/requestor/upload',
      component: reqSign,
      meta: {
        requiresAuth  : true,
        issuerAuth    : false,
        validatorAuth : false,
        requestorAuth : true
      }
    },
    {
      name: 'SignNReq',
      path: '/requestor/req-sign',
      component: SignNReq,
      meta: {
        requiresAuth  : true,
        issuerAuth    : false,
        validatorAuth : false,
        requestorAuth : true
      }
    },
    {
      name: 'DetailRequest',
      path: '/requestor/detail/:id',
      component: detailReq,
      meta: {
        requiresAuth  : true,
        issuerAuth    : false,
        validatorAuth : false,
        requestorAuth : true
      }
    },
  ];
  
  const router = new VueRouter({ mode: 'history', routes: routes });

  router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start()
    }
    if (to.meta.requiresAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
      if (!authUser || !authUser.data.access_token) {
        next({ name: 'Login' })
      }
      else if (to.meta.issuerAuth) {
        const authUser = JSON.parse(window.localStorage.getItem('lbUser'));
        const rolee = JSON.parse(authUser.data.role);
        if (rolee[0] == 'Issuer') {
          next()
        } else if (rolee[0] == 'Validator'){
          next('/validator')
        } else if (rolee[0] == 'Requestor'){
          next('/requestor')
        }
      } else if (to.meta.validatorAuth) {
        const authUser = JSON.parse(window.localStorage.getItem('lbUser'));
        const rolee = JSON.parse(authUser.data.role);
        if (rolee[0] == 'Validator') {
          next()
        } else if (rolee[0] == 'Issuer'){
          next('/issuer')
        } else if (rolee[0] == 'Requestor'){
          next('/requestor')
        }
      } else if (to.meta.requestorAuth) {
        const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
        const rolee = JSON.parse(authUser.data.role);
        if (rolee[0] == 'Requestor') {
          next()
        } else if (rolee[0] == 'Issuer'){
          next('/issuer')
        } else if (rolee[0] == 'Validator'){
          next('/validator')
        }
      }
    } else {
      next()
    }
  });

  router.afterEach(() => {
    NProgress.done()
  });

  export default router;