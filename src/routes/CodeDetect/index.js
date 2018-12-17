import React from "react";
import PageHeaderLayout from '../../layout/PageHeaderLayout';
import { Select, Card, Steps, Upload, Button, Icon } from "antd";
import { STATUS_CODES, STATUS_TITLE } from './_var';
import TestResult from './TestResult';
import { connect } from "dva";

const Step = Steps.Step;
const styles = {
    marginTop: 10,
    display: 'block',
};

class CodeDetective extends React.Component {

    state = {
        detectLevel: { key: 'l' },
    }
    /**
    * 渲染step处理图标
    */
    renderProcessStep = () => {
        const { status } = this.props;
        if (status === STATUS_CODES.DEFAULT || status === STATUS_CODES.SUCCESS) {
            return null;
        } else if (status === STATUS_CODES.PENDING || status === STATUS_CODES.PROGRESS) {
            return (<Icon type='loading' />)
        }
    }

    /**
     * 条件渲染step的检测title
     */
    renderProcessStepTitle = (status) => {
        this.props.dispatch({
            type: 'code/renderProcessStepTitle',
            status
        })
    }

    /**
     * 渲染loading时候的描述
     */
    renderLoadingDesc = (queryStatusPercentage) => {
        const { status } = this.props;
        if (status === STATUS_CODES.PENDING) {
            return '正在提交任务';
        } else if (status === STATUS_CODES.PROGRESS) {
            return <small>已检测  {queryStatusPercentage} %</small>
        } else {
            return '';
        }
    }

    handleUpload = (e) => {
        e.stopPropagation();
        this.props.dispatch({
            type: 'code/uploadFile',
            payload: { level: this.state.detectLevel.key }
        })
    }

    /**
     * 轮询任务队列
     */
    fetchProcessStatus = (url) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'code/fetchProcessQueryStatus',
            payload: { url }
        })
    }

    render() {
        const { detectLevel } = this.state;
        const { fileList, current, stepsStatus, data, title } = this.props;
        const { current: currentWorks, total: totalWorks } = data || {};
        const queryStatusPercentage = Number.parseFloat(currentWorks / totalWorks * 100).toFixed(0);

        //上传配置
        const uploadProps = {
            name: 'files',
            multiple: true,
            action: '/upload',
            fileList,
            showUploadList: false,
            beforeUpload: (file) => {
                this.props.dispatch({
                    type: 'code/addFileToList',
                    payload: { file }
                })
                return false;
            },
            onRemove: (file) => {
                this.props.dispatch({
                    type: 'code/removeFileFromList',
                    payload: { file }
                })
            }
        };
        //steps配置
        const steps = [{
            title: '上传源代码',
            description: (
                <Upload {...uploadProps}>
                    <small style={styles} >目前只支持 C、Python、Java文件检测</small>
                    <a style={styles} >点击上传 </a>
                    <small>(已选择{fileList.length}个文件)</small>
                    {fileList.length ? <Button type='primary' style={{ marginTop: 10 }} size='small' onClick={this.handleUpload}>开始检测</Button> : null}
                </Upload>
            )
        }, {
            title,
            icon: this.renderProcessStep(),
            description: this.renderLoadingDesc(queryStatusPercentage)
        }, {
            title: STATUS_TITLE.SUCCESS_TITLE
        }];

        return (
            <PageHeaderLayout
                title='代码相似度检测'
                action={(
                    <>
                        查重等级：
                        <Select
                            labelInValue
                            placeholder='查重等级'
                            defaultValue={detectLevel}
                            onChange={(detectLevel) => this.setState({ detectLevel })}
                        >
                            <Select.Option value="l">初级查重</Select.Option>
                            <Select.Option value="h">高级查重</Select.Option>
                        </Select>
                    </>
                )}
            >
                <Card title='检测进度' >
                    <Steps current={current} status={stepsStatus} >
                        {steps.map(item => <Step key={item.title} {...item} />)}
                    </Steps>
                </Card>
                {data && data.result ? <TestResult dataSource={data.result} /> : null}
            </PageHeaderLayout>
        )
    }
}

function mapStateToProps(state) {
    return { ...state.code }
}

export default connect(mapStateToProps)(CodeDetective);