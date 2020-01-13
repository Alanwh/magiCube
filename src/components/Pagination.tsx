import React from 'react';
import { Button, Modal, Form, Input } from 'antd';

const CollectionCreateForm: any = Form.create({ name: 'form_in_modal' })(
  class extends React.Component <any, any>{
    constructor (props: any) {
      super(props);
      this.state = {
        templateType: 'input'
      }
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      return (
        <Modal
          visible={visible}
          title="分页选项配置"
          okText="确定"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form {...formItemLayout}>
            <Form.Item label="开始页数">
              {getFieldDecorator('pageIndex', {
                initialValue: '1',
                rules: [{ required: true, message: '必须输入开始页数' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="每页条数">
              {getFieldDecorator('pageSize', {
                initialValue: '10',
                rules: [{ required: true, message: '必须输入每次条数' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="样式">
              {getFieldDecorator('style')(<Input />)}
            </Form.Item>
            <Form.Item label="默认值">
              {getFieldDecorator('default')(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class Pagination extends React.Component <any, any>{
  formRef: any

  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err: any, values: any) => {
      if (err) { return; }
      form.resetFields();
      this.setState({ visible: false });
      this.props.handlePage(values);
    });
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  render () {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>配置</Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default Pagination;