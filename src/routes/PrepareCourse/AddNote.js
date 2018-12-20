import React from 'react';
import PageHeaderLayout from '../../layout/PageHeaderLayout';
import qs from 'query-string';
import ButtonGroup from 'antd/lib/button/button-group';
import { Button } from 'antd';
import DrawerTree from './components/Drawer';
import Editor from './components/Editor';
import { connect } from 'dva';

// 备课详情 目录树
class AddNote extends React.Component {

    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { type, name, key } = qs.parse(window.location.search);
        const { visible } = this.state;
        return (
            <PageHeaderLayout
                title={(
                    <>
                        <span>编辑课程：</span>
                        <a style={{ marginLeft: 10 }} >{name}</a>
                    </>
                )}
                action={(
                    <ButtonGroup>
                        <Button type='primary'>保存</Button>
                        <Button type='default'>发布</Button>
                        <Button onClick={this.showDrawer} >我的文件目录</Button>
                    </ButtonGroup>
                )}
            >
                <DrawerTree
                    name={name}
                    visible={visible}
                    onClose={this.onClose.bind(this)}
                />
                <Editor />
            </PageHeaderLayout>
        )
    }
}

function mapStateToProps(state) {
    return { ...state.courseNode }
}

export default connect(mapStateToProps)(AddNote);