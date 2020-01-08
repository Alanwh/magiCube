import React from 'react'
import Goods from '../pages/goods'
import App from '../pages/list/App'
import Detail from '../pages/detail'
import Condition from '../pages/condition'
import { PageTYPE } from '../utils/enum/enum'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'

import './index.css'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

class PageLayout extends React.Component {
  state = {
    collapsed: false,
    contentPage: PageTYPE.LIST
  }

  onCollapse = (collapsed: any) => {
    this.setState({ collapsed })
  }

  changePageRouter = (e: any) => {
    this.setState({
      contentPage: e.key
    })
  }

  renderContent () {
    const { contentPage } = this.state

    switch (contentPage) {
      case PageTYPE.LIST:
        return(<App />)
      case PageTYPE.SEARCH_FILLTER:
        return(<Condition />)
      case PageTYPE.DETAIL:
        return(<Detail />)
      case PageTYPE.GOODS:
        return (<Goods />) 
      default:
        return(<App />)
    }
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>clio 页面配置</span>
                </span>
              }
            >
              <Menu.Item key={PageTYPE.LIST} onClick={this.changePageRouter}>列表页配置</Menu.Item>
              <Menu.Item key={PageTYPE.DETAIL} onClick={this.changePageRouter}>详情页配置</Menu.Item>
              <Menu.Item key={PageTYPE.GOODS} onClick={this.changePageRouter}>商品页配置</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>api 配置</span>
                </span>
              }
            >
              <Menu.Item key={PageTYPE.SEARCH_FILLTER} onClick={this.changePageRouter}>查询条件配置</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>clio 页面配置</Breadcrumb.Item>
              <Breadcrumb.Item>api 配置</Breadcrumb.Item>
            </Breadcrumb>
            {
              this.renderContent()
            }
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default PageLayout;