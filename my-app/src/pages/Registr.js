import { Button, Form, Input, Select } from "antd";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const Registr = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });
      return await response.json();
    }
    postData("https://todo-redev.herokuapp.com/api/users/register", {
      username: values.nickname,
      email: values.email,
      password: values.password,
      gender: values.gender,
      age: values.age,
    })
      .then((data) => console.log(data))
      .catch((error) => error.message);

    console.log("Received values of form: ", values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="nickname"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="age"
        label="age"
        rules={[
          {
            required: true,
            message: "Please input your age!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Captcha"
        // extra="We must make sure that your are a human."
      >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        <Button type="primary" htmlType="submit">
          войдите если вы зарегистрированы
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Registr;
