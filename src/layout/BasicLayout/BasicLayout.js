import React from 'react';
import { NavLink, withRouter } from 'dva/router';
import { Layout, Menu, Icon } from 'antd';
import Footer from '../../components/GlobalFooter/GlobalFooter';
import GlobalHeader from '../../components/GlobalHeader/index';
import { getMenuData } from '../../config/menu';
import styles from './index.less';
import 'ant-design-pro/dist/ant-design-pro.css';

const { Sider, Content } = Layout;
const MenuItem = Menu.Item;

class BasicLayout extends React.Component {

    state = {
        collapsed: false,
        DynamicComponent: null,
    };

    render() {
        const menuData = getMenuData();
        return (
            <Layout id={styles['basic-layout']} >
                <Sider
                    theme='light'
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div>
                        <a href='/classroom'>
                            <div className={styles["logo"]} ></div>
                        </a>
                    </div>
                    <Menu
                        theme="light"
                        mode="inline"
                        selectedKeys={[this.props.location.pathname]}
                    >
                        {
                            menuData.map(v => (
                                <MenuItem key={`${v.path}`} >
                                    <NavLink to={`${v.path + this.props.location.search}`} >
                                        <Icon type={v.icon} />
                                        <span>{v.name}</span>
                                    </NavLink>
                                </MenuItem>
                            ))}
                    </Menu>
                </Sider>
                <Layout>
                    <GlobalHeader
                        collapsed={this.state.collapsed}
                        toggle={collapsed => this.setState({ collapsed })}
                    />
                    <Content style={{ margin: '24px 24px 0px' }}>
                        {this.props.children}
                        <Footer />
                    </Content>
                </Layout>
            </Layout >
        );
    }
}

export default BasicLayout = withRouter(BasicLayout);