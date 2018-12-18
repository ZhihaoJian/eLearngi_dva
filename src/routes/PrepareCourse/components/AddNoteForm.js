import React from 'react';
import { Modal, Form, Input, Alert, Upload, Icon } from 'antd';
import PropTypes from 'prop-types';
import { Button } from 'antd/lib/radio';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

//添加课程 弹窗
class AddNoteForm extends React.Component {

    onOk = () => {
        const data = this.props.form.getFieldsValue();
        this.props.onOk({ data });
    }

    onCancel = () => {
        this.setState({ fileList: [] })
        this.props.onCancel({ visible: false });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { uploadConfig } = this.props;
        return (
            <Modal
                title='添加课程信息'
                confirmLoading={this.props.confirmLoading}
                destroyOnClose={true}
                visible={this.props.visible}
                onOk={() => this.onOk()}
                onCancel={() => this.onCancel()}
            >
                <Alert
                    style={{ marginBottom: 12 }}
                    closable
                    closeText={'我知道了'}
                    message="课程名称一旦确定将不能修改! 点击确定前再三确认!"
                    banner
                />
                <Form layout='vertical'>
                    <FormItem label='课程名称'>
                        {getFieldDecorator('courseName', {
                            rules: [{ required: true, message: '课程名称是必填项' }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label='简介' >
                        {getFieldDecorator('description', {
                            rules: [{ required: false }]
                        })(
                            <TextArea />
                        )}
                    </FormItem>
                    <FormItem label='课程备注'>
                        {getFieldDecorator('remark', {
                            rules: [{ required: false }]
                        })(
                            <TextArea />
                        )}
                    </FormItem>
                    <FormItem label='封面' >
                        {getFieldDecorator('coverURL', {
                            rules: [{ required: false }]
                        })(
                            <Upload {...uploadConfig}>
                                <Button><Icon type='upload' />上传封面</Button></Upload>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

AddNoteForm.propTypes = {
    uploadConfig: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    confirmLoading: PropTypes.bool.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

AddNoteForm.defaultProps = {
    visible: false,
    confirmLoading: false
}

export default Form.create()(AddNoteForm);