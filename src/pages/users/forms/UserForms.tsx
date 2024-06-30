import { Card, Col, Form, Input, Row } from "antd";

function UserForms() {
  return (
    <Row>
      <Col span={24}>
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
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default UserForms;
