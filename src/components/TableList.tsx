import React from 'react'
import { FILTERS } from '../utils/constant'
import { Button, Modal, Form, Input, Select } from 'antd'

const { Option } = Select

interface filters {
  name: string
  filter: string
}

const CollectionCreateForm: any = Form.create({ name: 'form_in_modal' })(
  class extends React.Component <any, any>{

    constructor (props: any) {
      super(props)
      this.state = {
        templateType: 'input'
      }
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      }
      return (
        <Modal
          visible={visible}
          title='列表选项配置'
          okText='确定'
          cancelText='取消'
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form {...formItemLayout}>
            <Form.Item label='key值'>
              {getFieldDecorator('prop', {
                rules: [{ required: true, message: '必须输入字段key' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label='列名称'>
              {getFieldDecorator('label', {
                rules: [{ required: true, message: '必须输入列名称' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label='数据处理'>
              {getFieldDecorator('filter')(
                <Select mode='multiple' style={{ width: 400 }}>
                {
                  FILTERS.map((item: filters) => (
                    <Option
                      value={item.filter}
                      key={item.filter}
                    >
                      {item.name}
                    </Option>))
                }
              </Select>
              )}
            </Form.Item>
            <Form.Item label='样式'>
              {getFieldDecorator('style')(<Input />)}
            </Form.Item>
            <Form.Item label='默认值'>
              {getFieldDecorator('default')(<Input />)}
            </Form.Item>
            <Form.Item label='删除地址'>
              {getFieldDecorator('delUrl')(<Input />)}
            </Form.Item>
            <Form.Item label='编辑地址'>
              {getFieldDecorator('editUrl')(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      )
    }
  }
)

class WrappedTableList extends React.Component <any, any>{
  formRef: any

  state = {
    visible: false,
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  handleCreate = () => {
    const { form } = this.formRef.props
    form.validateFields((err: any, values: any) => {
      if (err) { return }
      form.resetFields()
      this.setState({ visible: false })
      this.props.handleTable(values)
    })
  }

  saveFormRef = (formRef: any) => {
    this.formRef = formRef
  }

  render() {
    return (
      <div>
        <Button type='primary' onClick={this.showModal}>配置</Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}

export default WrappedTableList