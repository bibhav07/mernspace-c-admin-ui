import { Navigate, NavLink, Outlet } from "react-router-dom"
import { useAuthStore } from "../store"
import { Layout, Menu, theme  } from 'antd';
import { useState } from "react";
import { Logo } from "../components/icons/Logo";
import Icon from '@ant-design/icons';
import Home from "../components/icons/Home";
import UserIcon from "../components/icons/UserIcon";
import { foodIcon } from "../components/icons/FoodIcon";
import BasketIcon from "../components/icons/BasketIcon";
import GiftIcon from "../components/icons/GiftIcon";

const { Header, Content, Footer, Sider } = Layout;


const items = [
  {
    key: '/',
    icon: <Icon  component={Home} />,
    label: <NavLink to="/">Home</NavLink>
  },
  {
    key: '/users',
    icon:  <Icon component={UserIcon} />,
    label: <NavLink to="/users">Users</NavLink>
  },
  {
    key: '/restaurants',
    icon: <Icon component={foodIcon} />,
    label: <NavLink to="/restaurants">Restaurants</NavLink>
  },
  {
    key: '/products',
    icon: <Icon component={BasketIcon} />,
    label: <NavLink to="/products">Products</NavLink>
  },
  {
    key: '/promos',
    icon: <Icon component={GiftIcon} />,
    label: <NavLink to="/promos">Promos</NavLink>
  },
]

const Dashboard = () => {

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, },
  } = theme.useToken();

  const {user} = useAuthStore();

  if(user === null) {
    return <Navigate replace={true} to="/auth/login" />
  }

  return (
    <div>
       <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo">
          <Logo />
        </div>
        <Menu theme="light" defaultSelectedKeys={['/']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
  
            <Outlet/>
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
      
    </div>
  )
}

export default Dashboard