import React from 'react';
import PageHeaderLayout from '../../layout/PageHeaderLayout';
import qs from 'query-string';
import ButtonGroup from 'antd/lib/button/button-group';
import { Button, Spin } from 'antd';
import DrawerTree from './components/Drawer';
import Editor from './components/Editor';
import { connect } from 'dva';
import BraftEditor from 'braft-editor';

// 备课详情 目录树
class AddNote extends React.Component {

    state = {
        editorSpinning: false,
        visible: false,
        editorState: null
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    /**
     * 更新编辑器实例
     * @params {string | object} payload
     */
    updateEditorState = (payload) => {
        if (typeof payload === 'string') {
            this.setState({
                editorState: BraftEditor.createEditorState(payload),
                editorSpinning: false
            })
        } else {
            this.setState({ editorState: payload, editorSpinning: false })
        }
    }

    enableEditorSpinning = () => this.setState({ editorSpinning: true })

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { type, name, key } = qs.parse(window.location.search);
        const { visible, editorState, editorSpinning } = this.state;
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
                    enableEditorSpinning={this.enableEditorSpinning.bind(this)}
                    updateEditorState={content => this.updateEditorState(content)}
                    name={name}
                    visible={visible}
                    onClose={this.onClose.bind(this)}
                />
                <Spin spinning={editorSpinning} >
                    <Editor
                        updateEditorState={editorState => this.updateEditorState(editorState)}
                        editorState={editorState}
                    />
                </Spin>
            </PageHeaderLayout>
        )
    }
}

function mapStateToProps(state) {
    return { ...state.courseNode }
}

export default connect(mapStateToProps)(AddNote);