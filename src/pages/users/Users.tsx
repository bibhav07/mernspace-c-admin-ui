import { Breadcrumb } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          { title: <Link to="/">Dashboard</Link> },
          { title: <Link to="/users">Users</Link> },
        ]}
      />
    </>
  );
};

export default Users;
