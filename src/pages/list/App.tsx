import React from 'react';
import axios from 'axios';
import SearchFillter from '../../components/SearchFillter';
import WrappedTableList from '../../components/TableList';
import Pagination from '../../components/Pagination';
import CreateActivity from '../../components/CreacteActivity'

import { 
  Checkbox, 
  Input,
  Button,
  message,
  Select,
  DatePicker,
  Popconfirm,
  Icon
} from 'antd';

import './App.css';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const modules = ['搜索', '新增', '列表', '分页'];

const DeleteOption =  ({ item, removeColumn, module }: any) => {
  return(
    <Popconfirm
      title='确定要删除本项吗？'
      okText='确定'
      cancelText='取消'
      onConfirm={() => removeColumn(item, module)}
      icon={<Icon type='question-circle-o' style={{ color: 'red' }} />}
    >
      {item.label + ' : '}
    </Popconfirm>
  )
}

class App extends React.Component <any, any>{
  constructor(props: any) {
    super(props);

    this.state = {
      selectedModules: ['搜索', '新增', '列表', '分页'],
      visible: false,
      search: {},
      filters: [],
      table: [],
      addData: [],
      pageOptions: {
        hasPagination: true,
        pageIndex: 1,
        pageSize: 10
      }
    }
  }

  onChange = (selectedModules: any) => {
    const { pageOptions } = this.state;

    this.setState({
      selectedModules,
      pageOptions: Object.assign(pageOptions, 
        { hasPagination: selectedModules.some((item: string) => item === '分页') }
      )
    });
  };

  handleOk = () => {
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleSearch = (data: any) => {
    const { filters } = this.state;

    if (data.type === 'select' && data.options) {
      data.options = JSON.parse(data.options)
    }
    filters.splice(filters.length, 0, data);
    this.setState({ filters })
  }

  handleCreateActivity = (data: any) => {
    const { addData } = this.state
    addData.push(data)
    this.setState({
      addData
    })
  }

  handleTable = (data: any) => {
    const { table } = this.state;

    table.splice(table.length, 0, data);
    this.setState({ table })
  }

  handlePage = (data: any) => {
    const { pageOptions } = this.state;

    this.setState({ pageOptions: Object.assign(pageOptions, data) })
  }

  saveConfig = () => {
    const { filters, pageOptions, table, addData } = this.state;

    const json = {
      search: {
        filters: filters.filter((item: any) => item.type !== 'button'),
        buttons: filters.filter((item: any) => item.type === 'button')
      },
      addData,
      pageOptions,
      table
    }
    axios.post('/api/saveConfig', json).then(() => message.success('保存成功'))
  }

  removeTableColumn (item: any) {
    const { table } = this.state

    table.forEach((i: any, index: number) => { 
      if (i.label === item.label) {
        table.splice(index, 1)
        this.setState({
          table: [...table]
        })
      }
    })
  }

  removeColumn (module: string, item: any) {
    const { filters, addData } = this.state
    let removeData = module === 'filters' ? filters : addData
    
    removeData.forEach((i: any, index: number) => {
      if (i.label === item.label) {
        removeData.splice(index, 1)
        this.setState({
          removeData: [...removeData]
        })
      }
    })
  }

  renderTemplate (data: any, module: string) {
    return data.map((item: any, index: number) => {
      switch (item.type) {
        case 'input':
          return (
            <span key={item.label}>
              <DeleteOption item={item} removeColumn={this.removeColumn.bind(this, module)}/>
              <Input placeholder={item.placeholder} />
            </span>
          )
        case 'button':
          return(
            <span key={item.label}>
              <DeleteOption item={item} removeColumn={this.removeColumn.bind(this, module)}/>
              <Button type={item.buttonType}>{item.label}</Button>
            </span>
          )
        case 'select':
          return(
            <span key={'selectBox' + item.label}>
              <DeleteOption item={item} removeColumn={this.removeColumn.bind(this, module)}/>
              <Select
                style={{ width: 200 }}
                key={'select' + item.label}
                placeholder={item.placeholder}
              >
                <Option value='option1' key='option1'>option1</Option>
                <Option value='option2' key='option2'>option2</Option>
                <Option value='option3' key='option3'>option3</Option>
              </Select>
            </span>
          )
        default:
          return(
            <span key={'datapicker' + item.label}>
              <DeleteOption item={item} removeColumn={this.removeColumn.bind(this, module)}/>
              <DatePicker placeholder={item.placeholder} />
            </span>
          )
      }
    })
  }

  render () {
    const { filters, table, pageOptions, addData } = this.state
    return (
      <>
        <div className='box'>
          <div className='mob-title'>模块选择</div>
          <div className='mob-box'>
            <CheckboxGroup options={modules} value={this.state.selectedModules } onChange={this.onChange}/>
          </div>
        </div>

        {/* 搜索模块 */}
        <div className='mob-containner'>
          <div className='box'>
            <div className='mob-title'>搜索模块配置</div>
            <div className='mob-box'>
              <SearchFillter handleSearch={this.handleSearch}/>
              <div className='search-box'>
                {
                  this.renderTemplate(filters, 'filters')
                }
              </div>
            </div>
          </div>
        </div>

        {/* 新增模块 */}
        <div className="mob-containner">
          <div className="box">
            <div className='mob-title'>新增模块配置</div>
            <div className="mob-box">
              <CreateActivity handleCreateActivity={this.handleCreateActivity}/>
              <div className='search-box'>
                {
                  this.renderTemplate(addData, 'add')
                }
              </div>
            </div>
          </div>
        </div>
        
        {/* 列表模块 */}
        <div className='mob-containner'>
          <div className='box'>
            <div className='mob-title'>列表模块配置</div>
            <div className='mob-box'>
              <WrappedTableList handleTable={this.handleTable}/>
              <div className='table-box'>
                <table className='table-model'>
                  <thead>
                    <tr>
                    {
                      table.map((item: any) => {
                        return(
                          <Popconfirm
                            key={'table' + item.label}
                            title='确定要删除本项吗？'
                            okText='确定'
                            cancelText='取消'
                            onConfirm={() => this.removeTableColumn(item)}
                            icon={<Icon type='question-circle-o' style={{ color: 'red' }} />}
                          >
                            <td>{item.label}</td>
                          </Popconfirm>
                        )
                      })
                    }
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* 分页模块 */}
        <div className='mob-containner'>
          <div className='box'>
            <div className='mob-title'>分页模块配置</div>
            <div className='mob-box'>
              <Pagination handlePage={this.handlePage}/>
              <div className='table-box'>
                {
                  pageOptions.pageIndex && pageOptions.pageSize && '从第' + pageOptions.pageIndex + '页开始查询，每页' + pageOptions.pageSize + '条'
                }
              </div>
            </div>
          </div>
        </div>
        <div className='fixed-footer' onClick={this.saveConfig}>
          保存配置
        </div>
      </>
    )
  }
}

export default App;