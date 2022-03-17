// 编写规则
const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5-10个字符或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入用户密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,}$/,
      message: '密码不能少于5位',
      trigger: 'blur'
    }
  ]
}

export default rules
