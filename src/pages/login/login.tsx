import { Card, Layout, Space, Form,Input, Checkbox, Button, Flex, Alert } from "antd"
import {LockFilled, UserOutlined, LockOutlined} from "@ant-design/icons";
import { Logo } from "../../components/icons/Logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Credentials } from "../../types";
import { login, self, logout } from "../../http/api";
import { useAuthStore } from "../../store";
import { usePermission } from "../../hooks/usePermission";

const loginUser  = async (credentials:Credentials) => {
  //server calling 
  console.log(credentials);
  const {data} = await login(credentials);
};

const getSelf = async () => {
  const { data } = await self();
  return data;
};


const LoginPage = () => {

  const {isAllowed} = usePermission();

  const {setUser, logout: logoutFromStore} = useAuthStore();

  //self
  const {refetch} = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: false
  })

  //logout
  const {mutate: logoutMutate} = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: async () => {
      logoutFromStore();
      return;
    }
  })


//login
  const {mutate, isPending, isError, error} = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: async () => {

      const selftDataPromise = await refetch();

      if(!isAllowed(selftDataPromise.data)){
        logoutMutate();
        console.log('login return -> not amdin or manager');
        return;
      }

      setUser(selftDataPromise.data);
      console.log('-> selfdata : ', selftDataPromise.data);
      console.log('login success...');

    }
   })


  return (

    <Layout  style={{height:'100vh', display:'grid', placeItems:'center'}} >
      
      <Space direction="vertical" align="center" size="large">
      <Layout.Content style={{display:'flex', justifyContent: 'center', alignContent: 'center'}}>
      <Logo/>
      </Layout.Content>
    
      <Card  
      bordered={false}
      style={{width:300}}
      title={
        <Space style={{width:'100%', fontSize:16, justifyContent:'center'}} >
          <LockFilled />
          Sign in
        </Space>
      }>

      <Form initialValues={{remember:true}}  onFinish={ (values) => {
        mutate({email: values.username, password: values.password})
      } } >

        {isError && <Alert style={{marginBottom:24}} type="error" message={error.message} />}

        <Form.Item  name="username" rules={[{required:true, message:'Please input your username'}, {type:'email', message: 'Email is not valid'}]}>
          <Input  prefix={<UserOutlined />} placeholder="Username"/>
        </Form.Item>
        <Form.Item  name="password"   rules={[{required:true, message:'Please input your password'}]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password"/>
        </Form.Item>
        <Flex justify="space-between">

        <Form.Item  name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
          <a href="#" id="login-form-forgot">Forgot password</a>
        </Flex>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{width:'100%'}}  loading={isPending} >
            Log in
          </Button>
        </Form.Item>
      </Form>


          
      </Card>
      </Space>
    </Layout>
  )
}

export default LoginPage