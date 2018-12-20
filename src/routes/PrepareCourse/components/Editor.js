import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { connect } from 'dva';

class Editor extends React.Component {

    state = {
        editorState: null
    }

    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        // const result = await saveEditorContent(htmlContent)
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }

    render() {
        const { editorState } = this.state
        return (
            <div style={{ backgroundColor: "#fff" }} >
                <BraftEditor
                    value={editorState}
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