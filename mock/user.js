// 代码中会兼容本地 service mock 以及部署站点的静态数据

const user = {
  userId: '00000001',
  email: 'openhttps@example.net',
  phone: '18812345678',
};

export default {

  // 请求当前用户的邮箱和手机号
  'POST /api/user': (req, res) => {
    setTimeout(() => {
      res.json({
        user,
      });
    }, 500);
  },

  // 更新用户邮箱或手机
  'POST /api/updateUser': (req, res) => {
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    setTimeout(() => {
      res.send({
        updateUser: 'success',
      });
    }, 100);
  },

  // 更新用户密码
  'POST /api/updateUserPwd': (req, res) => {
    console.log('POST /api/updateUserPwd:', req.body);
    setTimeout(() => {
      res.send({
        updateUserPwd: 'success',
      });
    }, 100);
  },

  'POST /api/auth/login': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },

  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },

  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
