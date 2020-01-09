import React from 'react'
import { Button, Modal, Form, Input, Radio, Select } from 'antd'

const { Option } = Select

function InputTemplate (getFieldDecorator: Function) {
  return(
    <>
      <Form.Item label='key值'>
        {getFieldDecorator('key', {
          rules: [{ required: true, message: '必须输入字段key' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label='关联文案'>
        {getFieldDecorator('label', {
          rules: [{ required: true, message: '必须输入关联文案' }],
        })(<Input type='textarea' />)}
      </Form.Item>
      <Form.Item label='占位符'>
        {getFieldDecorator('placeholder')(<Input />)}
      </Form.Item>
      <Form.Item label='样式'>
        {getFieldDecorator('style')(<Input />)}
      </Form.Item>
      <Form.Item label='默认值'>
        {getFieldDecorator('default')(<Input />)}
      </Form.Item>
    </>
  )
}

function ButtonTemplate (getFieldDecorator: Function) {
  return(
    <>
      <Form.Item label='按钮类型'>
        {getFieldDecorator('buttonType', {
          initialValue: 'primary'
        })(
          <Radio.Group name='buttonType'>
            <Radio value='primary'>primary</Radio>
            <Radio value='warning'>warning</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item label='关联文案'>
        {getFieldDecorator('label', {
          rules: [{ required: true, message: '必须输入关联文案' }],
        })(<Input type='textarea' />)}
      </Form.Item>
      <Form.Item label='请求地址'>
        {getFieldDecorator('url')(<Input />)}
      </Form.Item>
      <Form.Item label='功能'>
        {getFieldDecorator('effect', {
          initialValue: 'search'
        })(
          <Radio.Group name='buttonEffect'>
            <Radio value='search'>搜索</Radio>
            <Radio value='clear'>重置</Radio>
            <Radio value='add'>新增</Radio>
          </Radio.Group>
        )}
      </Form.Item>
    </>
  )
}

function SelectTemplate (getFieldDecorator: Function) {
  return(
    <>
      <Form.Item label='key值'>
        {getFieldDecorator('key', {
          rules: [{ required: true, message: '必须输入字段key' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label='关联文案'>
        {getFieldDecorator('label', {
          rules: [{ required: true, message: '必须输入关联文案' }],
        })(<Input type='textarea' />)}
      </Form.Item>
      <Form.Item label='url'>
        {getFieldDecorator('url')(<Input />)}
      </Form.Item>
      <Form.Item label='下拉选项'>
        {getFieldDecorator('options')(<Input type='textarea'/>)}
      </Form.Item>
      <Form.Item label='占位符'>
        {getFieldDecorator('placeholder')(<Input />)}
      </Form.Item>
      <Form.Item label='样式'>
        {getFieldDecorator('style')(<Input />)}
      </Form.Item>
      <Form.Item label='默认值'>
        {getFieldDecorator('default')(<Input />)}
      </Form.Item>
    </>
  )
}

function TimeTemplate (getFieldDecorator: Function) {
  return(
    <>
      <Form.Item label='日历类型'>
        {getFieldDecorator('date', {
          initialValue: 'option1'
        })(
          <Select
            style={{ width: 200 }}
            placeholder='请选择日历类型'
          >
            <Option value='option1' key='option1'>单日历不带时间</Option>
            <Option value='option2' key='option2'>单日历带时间</Option>
            <Option value='option3' key='option3'>双日历不带时间</Option>
            <Option value='option4' key='option4'>双日历带时间</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label='key值'>
        {getFieldDecorator('key', {
          rules: [{ required: true, message: '必须输入字段key' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label='关联文案'>
        {getFieldDecorator('label', {
          rules: [{ required: true, message: '必须输入关联文案' }],
        })(<Input type='textarea' />)}
      </Form.Item>
      <Form.Item label='占位符'>
        {getFieldDecorator('placeholder')(<Input />)}
      </Form.Item>
      <Form.Item label='样式'>
        {getFieldDecorator('style')(<Input />)}
      </Form.Item>
      <Form.Item label='默认值'>
        {getFieldDecorator('default')(<Input />)}
      </Form.Item>
    </>
  )
}

const CollectionCreateForm: any = Form.create({ name: 'form_in_modal' })(
  class extends React.Component<any, any> {
    render() {
      const { templateType } = this.props
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
          title='新增选项配置'
          okText='确定'
          cancelText='取消'
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form {...formItemLayout}>
            <Form.Item className='collection-create-form_last-form-item'>
              {getFieldDecorator('type', {
                initialValue: 'input',
              })(
                <Radio.Group onChange={this.handleRadioChange} name='inputType'>
                  <Radio value='input'>输入框</Radio>
                  <Radio value='select'>下拉列表</Radio>
                  <Radio value='dateSelect'>时间选择器</Radio>
                  <Radio value='button'>按钮</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            { templateType === 'input' &&  InputTemplate(getFieldDecorator) }
            { templateType === 'dateSelect' &&  TimeTemplate(getFieldDecorator) }
            { templateType === 'select' &&  SelectTemplate(getFieldDecorator) }
            { templateType === 'button' &&  ButtonTemplate(getFieldDecorator) }
          </Form>
        </Modal>
      )
    }

    handleRadioChange = (e: any) => {
      this.props.changeTemplateType(e.target.value)
    }
  }
)

class CreateActivity extends React.Component <any, any>{
  formRef: any

  state = {
    visible: false,
    templateType: 'input'
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
      this.setState({ visible: false, templateType: 'input' })
      this.props.handleCreateActivity(values)
    })
  }

  changeTemplateType = (val: String) => {
    this.setState({ templateType: val })
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
          templateType={this.state.templateType}
          changeTemplateType={this.changeTemplateType}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}

export default CreateActivity