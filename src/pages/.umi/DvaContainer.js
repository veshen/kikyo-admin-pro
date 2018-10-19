import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());

app.model({ namespace: 'global', ...(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/models/login.js').default) });
app.model({ namespace: 'project', ...(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/models/user.js').default) });
app.model({ namespace: 'register', ...(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/pages/User/models/register.js').default) });
app.model({ namespace: 'activities', ...(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/pages/Dashboard/models/activities.js').default) });
app.model({ namespace: 'chart', ...(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/pages/Dashboard/models/chart.js').default) });
app.model({ namespace: 'monitor', ...(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/pages/Dashboard/models/monitor.js').default) });
app.model({ namespace: 'order', ...(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/pages/Order/models/order.js').default) });
app.model({ namespace: 'feedback', ...(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/pages/Feedback/models/feedback.js').default) });
app.model({ namespace: 'form', ...(require('/Users/wangwei/Documents/kikyo-project/kikyo-admin-pro/src/pages/Forms/models/form.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
