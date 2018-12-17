import React from 'react';
import { Route, Switch, routerRedux, Link } from 'dva/router'
import { Button } from 'antd';
import LoginPage from './routes/Login';
import RegisterFormPage from './routes/Register';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import ClassRoomPage from './routes/Classroom';
import { getRouterData } from './config/router_v2';
import Authorized from 'ant-design-pro/lib/Authorized';
import Exception from 'ant-design-pro/lib/Exception';
import MePage from './routes/Me';
const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const BasicLayout = routerData['/'].component;
  const noMatch = (
    <Exception
      type="403"
      desc='您尚未登录，暂无权查看'
      actions={(
        <div><Button type="primary"><Link to='/signin'>去登录</Link></Button></div>
      )}
    />);

  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          {/* <Authorized path='/' noMatch={noMatch}
            children={(
              <BasicLayout>
                <ClassRoomPage />
              </BasicLayout>
            )}
          /> */}
          <BasicLayout>
            <Route path='/classroom' component={ClassRoomPage}/>
            <Route path='/me' component={MePage}/>
          </BasicLayout>
          <Route path="/login" exact component={LoginPage} />
          <Route path='/register' exact component={RegisterFormPage} />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
