import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  Spin,
  Table,
  theme,
  Typography,
} from "antd";
import {
  RightOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getusers } from "../../http/api";
import { CreateUserData, FieldData, User } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilter from "./UsersFilter";
import { useState } from "react";
import UserForms from "./forms/UserForms";
import { PER_PAGE } from "../../constants";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (_text: string, record: User) => {
      return (
        <div>
          {record.firstName} {record.lastName}
        </div>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: () => {
      return (
        <div>
          <Link to="/users/edit">Edit</Link>
        </div>
      );
    },
  },
];

const Users = () => {
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();

  const queryClient = useQueryClient();

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    data: users,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => {
      // console.log("raw query params -> ", queryParams);
      //using object.entires so our values will be like [ [key,value],[key,value],]
      //checking if value on index 1 is fals do not take it (undefined, false, null)
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
      );

      //it will make query params -> perPage=2&currentPage=1
      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();

      // console.log(queryString);
      return getusers(queryString).then((res) => res.data);
    },
  });

  const { mutate: userMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: CreateUserData) =>
      createUser(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onHandleSubmit = async () => {
    await form.validateFields();
    console.log("form values", form.getFieldsValue());
    await userMutate(form.getFieldsValue());
    form.resetFields();
    setDrawerOpen(false);
  };

  const { user } = useAuthStore();

  const onFilterchange = (changedFields: FieldData[]) => {
    const changedFilterFields = changedFields
      .map((item) => {
        return {
          [item.name[0]]: item.value,
        };
      })
      .reduce((acc, item) => ({ ...acc, ...item }), {});
    //all onchanged values setting in the usestate
    setQueryParams((prev) => ({ ...prev, ...changedFilterFields }));
  };

  if (user?.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Flex justify="space-between">
          <Breadcrumb
            separator={<RightOutlined />}
            items={[
              { title: <Link to="/">Dashboard</Link> },
              { title: <Link to="/users">Users</Link> },
            ]}
          />

          {isFetching && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            ></Spin>
          )}
          {isError && (
            <Typography.Text type="danger">{error.message}</Typography.Text>
          )}
        </Flex>

        <Form form={filterForm} onFieldsChange={onFilterchange}>
          <UsersFilter>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setDrawerOpen(true);
              }}
            >
              Add User
            </Button>
          </UsersFilter>
        </Form>

        <Table
          columns={columns}
          dataSource={users?.data}
          rowKey="id"
          pagination={{
            total: users?.total,
            pageSize: queryParams.perPage,
            current: queryParams.currentPage,

            onChange: (page, pageSize) => {
              setQueryParams((prev) => {
                return {
                  ...prev,
                  currentPage: page,
                };
              });
            },
          }}
        />

        <Drawer
          title="Create user"
          width={730}
          destroyOnClose={true}
          open={drawerOpen}
          styles={{ body: { backgroundColor: colorBgLayout } }}
          onClose={() => {
            form.resetFields();
            setDrawerOpen(false);
          }}
          extra={
            <Space>
              <Button
                onClick={() => {
                  form.resetFields();
                  setDrawerOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={onHandleSubmit}>
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" form={form}>
            <UserForms />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Users;
