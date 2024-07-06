import { Card, Col, Form, Input, Row, Select, Space } from "antd";

function UserForms() {
  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size={30}>
          <Card title={"Basic info"} bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="First name" name="firstName">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last name" name="lastName">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title={"Security info"} bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Password" name="password">
                  <Input size="large" type="password" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title={"Role & resturant"} bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Role" name="role">
                  <Select>
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="manager">Manager</Select.Option>
                    <Select.Option value="customer">Customer</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Restaurant" name="tenandId">
                  <Select>
                    <Select.Option value="admin">Resto-1</Select.Option>
                    <Select.Option value="manager">Resto-2</Select.Option>
                    <Select.Option value="customer">Resto-3</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
}

export default UserForms;
