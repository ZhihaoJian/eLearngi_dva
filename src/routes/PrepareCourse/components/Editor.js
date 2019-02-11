import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { connect } from 'dva';

class Editor extends React.Component {

    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const { editorState, dispatch, selectedId } = this.props;
        const htmlContent = editorState.toHTML();
        dispatch({
            type: 'courseNode/updateFileContent',
            payload: {
                id: selectedId,
                content: htmlContent
            }
        })
        // const result = await saveEditorContent(htmlContent)
    }

    handleEditorChange = (editorState) => {
        this.props.updateEditorState(editorState)
    }

    render() {
        const { editorState } = this.props;
        return (
            <div style={{ backgroundColor: "#fff" }} >
                <BraftEditor
                    value={editorState}
                    placeholder='请输入文案'
                    onChange={this.handleEditorChange}
                    onSave={this.submitContent}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { ...state.courseNode }
}

export default connect(mapStateToProps)(Editor);