import React from 'react'
import axios from 'axios'
import { Select, Button, message } from 'antd';

const { Option } = Select;

class Condition extends React.Component<any, any> {

  constructor (props: any) {
    super(props)
    this.state = {
      tableName: '',
      conditionQueryField: '',
      tableList: [],
      tableInfo: [],
      updateColumns: ''
    }
  }

  loadTableList () {
    axios.post('/rp2/autoCodeController/getTableList', { method: 'POST'})
      .then(json => {
        this.setState({
          tableList: json.data.data
        })
      })
  }

  loadTableInfo (value: string) {
    axios.post('/rp2/autoCodeController/queryTableInfo', { tableName: value })
      .then(json => {
        this.setState({
          tableInfo: json.data.data
        })
      })
  }

  handleTableList = (value: any) => {
    this.loadTableInfo(value)
    this.setState({
      tableName: value,
      tableInfo: []
    })
  }

  handleTableInfo = (value: [string]) => {
    this.setState({
      conditionQueryField: String(value)
    })
  }

  save = () => {
    const params = {
      tableName: this.state.tableName,
      allColumnss: '[]',
      conditionQueryField: this.state.conditionQueryField,
      pid: "1",
      sqlCheck: -1,
      updateColumns: this.state.updateColumns
    }
    axios.post('/rp2/autoCodeController/saveOne', params)
      .then(json => {
        json.data.flag === 'S' && message.success('保存成功')
      })
  }

  handleUpdateTable = (val: String) => {
    this.setState({
      updateColumns: val
    })
  }

  render () {
    const { tableList, tableInfo } = this.state
    return(
      <div className='box'>
        <div className='mob-title'>查询条件配置</div> 
        <div className='mob-box'>
          <span style={{'marginRight': '20px'}}>  
            <span>选择数据库：</span>
              <Select style={{ width: 200 }} onChange={this.handleTableList}>
              {
                tableList.map((item: any) => (<Option value={item.tableName} key={item.tableName}>{item.tableName}</Option>))
              }
            </Select>
          </span>
          <span style={{'marginRight': '20px'}}>
            <span>选择查询字段：</span>
              <Select mode="multiple" style={{ width: 400 }} onChange={this.handleTableInfo}>
              {
                tableInfo.map((item: any, index: number) => (
                  <Option
                    value={item.column_name}
                    key={item.column_name + index}
                  >
                      {item.column_name + ' : ' + item.column_comment}
                  </Option>))
              }
            </Select>
          </span>
          <span style={{'marginRight': '20px'}}>
            <span>更新主键：</span>
              <Select style={{ width: 400 }} onChange={this.handleUpdateTable}>
              {
                tableInfo.map((item: any, index: number) => (
                  <Option
                    value={item.column_name}
                    key={item.column_name + index}
                  >
                      {item.column_name + ' : ' + item.column_comment}
                  </Option>))
              }
            </Select>
          </span>
          <span style={{'marginRight': '20px'}}>
            <Button type="primary" onClick={this.save}>提交</Button>
          </span>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.loadTableList()
  }
}

export default Condition;