import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "redirect": "/user/login",
    "exact": true
  },
  {
    "path": "/",
    "redirect": "/dashboard/analysis",
    "exact": true
  },
  {
    "path": "/user",
    "component": dynamic({ loader: () => import('../../layouts/UserLayout'), loading: require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/components/PageLoading/index').default  }),
    "routes": [
      {
        "path": "/user/login",
        "component": dynamic({ loader: () => import('../User/Login'), loading: require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "path": "/user/register",
        "component": dynamic({ loader: () => import('../User/Register'), loading: require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "component": dynamic({ loader: () => import('../User/RegisterResult'), loading: require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import('../../layouts/BasicLayout'), loading: require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/components/PageLoading/index').default  }),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user"
    ],
    "routes": [
      {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "routes": [
          {
            "path": "/dashboard/analysis",
            "name": "analysis",
            "component": dynamic({ loader: () => import('../Dashboard/Analysis'), loading: require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/order",
        "name": "order",
        "icon": "profile",
        "routes": [
          {
            "path": "/order/orderManage",
            "name": "orderManage",
            "component": dynamic({ loader: () => import('../Order/OrderManage'), loading: require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/order/orderExport",
            "name": "orderExport",
            "component": dynamic({ loader: () => import('../Order/OrderExport'), loading: require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/feedback",
        "name": "feedback",
        "icon": "warning",
        "routes": [
          {
            "path": "/feedback/feedbackManage",
            "name": "feedbackManage",
            "component": dynamic({ loader: () => import('../Feedback/FeedbackManage'), loading: require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import('../404'), loading: require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];

export default function() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
