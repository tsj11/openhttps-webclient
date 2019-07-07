// import mockjs from 'mockjs';

const domains = [
  {
    certificateURL: "https://acme-v01.api.letsencrypt.org/acme/cert/0365be864ca899a48fd42389899456b5f6c1",
    challengeToken: "5R7U5KOB8Z79qMMurxMn2iAFY1YatWSIoFHNLsunbA0",
    challengeURI: "https://acme-v01.api.letsencrypt.org/acme/challenge/LoFrKX9o4ZCYTREsT2PWnCwTWsQjPu8wfm1cdaFHGHU/1390282468",
    cname: "64d58152-fd31-413c-8052-1ee86ab64eb0.cdn.openhttps.com",
    domain: "cdn.openhttps.com",
    id: 1,
    sequence: 19,
    status: 21,
    targetIP: "8.8.8.9",
    targetPort: 80,
    targetType: 0,
    httpsForward: {
      // hsts: 0 代表禁用，1代表当前域，2代表当前域名及其子域名
      hsts: 1,
      browserHook: true,
      // thirdPartyRes: 0 代表禁用，1代表集中，2代表强制Https
      thirdPartyRes: 1,
    },
    waf: {
      cookieShadowing: true,
      sqlInjection: true,
      xss: true,
      csrf: true,
      responseSplitting: true,
    },
  },
  {
    certificateURL: "https://acme-v01.api.letsencrypt.org/acme/cert/0365be864ca899a48fd42389899456b5f6c1",
    challengeToken: "5R7U5KOB8Z79qMMurxMn2iAFY1YatWSIoFHNLsunbA0",
    challengeURI: "https://acme-v01.api.letsencrypt.org/acme/challenge/LoFrKX9o4ZCYTREsT2PWnCwTWsQjPu8wfm1cdaFHGHU/1390282468",
    cname: "64d58152-fd31-413c-8052-1ee86ab64eb0.cdn.openhttps.com",
    domain: "cdn.openhttps.com2",
    id: 2,
    sequence: 19,
    status: 21,
    targetIP: "8.8.8.99",
    targetPort: 80,
    targetType: 0,
    httpsForward: {
      // hsts: 0 代表禁用，1代表当前域，2代表当前域名及其子域名
      hsts: 1,
      browserHook: true,
      // thirdPartyRes: 0 代表禁用，1代表集中，2代表强制Https
      thirdPartyRes: 1,
    },
    waf: {
      cookieShadowing: true,
      sqlInjection: true,
      xss: true,
      csrf: true,
      responseSplitting: true,
    },
  },
];

let prepareDomain = {
  domain: null,
  id: null,
};

export default {

  // 获取用户管理的所有domain
  'POST /domain/list': (req, res) => {
    setTimeout(() => {
      res.json(domains);
    }, 500);
  },

  // 删除域
  'POST /domain/delete': (req, res) => {
    let index = -1;
    domains.forEach((item, i) => {
      if (item.domainId === req.body.domainId) {
        index = i;
      }
    });
    if (index === -1) {
      setTimeout(() => {
        res.json({
          success: false,
        });
      }, 500);
    } else {
      domains.splice(index, 1);
      setTimeout(() => {
        res.json({
          success: true,
        });
      }, 500);

    }
  },

  // 部署证书
  'POST /domain/deployCertificate': (req, res) => {
    // 为指定域名部署证书
    let index = -1;
    domains.forEach((item, i) => {
      if (item.domainId === req.body.domainId) {
        index = i;
      }
    });
    if (index === -1) {
      res.send({
        deployHttpsCertif: 'error',
      });
    } else {
      domains[index] = {
        ...domains[index],
        https: '已部署',
      };
      res.send({
        deployHttpsCertif: 'success',
      });
    }
  },

  // 部署证书
  'POST /domain/revokeCertificate': (req, res) => {
    // 撤销指定域名证书
    let index = -1;
    domains.forEach((item, i) => {
      if (item.domainId === req.body.domainId) {
        index = i;
      }
    });
    if (index === -1) {
      res.send({
        deployHttpsCertif: 'error',
      });
    } else {
      domains[index] = {
        ...domains[index],
        https: '已撤销',
      };
      res.send({
        deployHttpsCertif: 'success',
      });
    }
  },

  'POST /domain/setDomainWafConfig': (req, res) => {
    let index = -1;
    domains.forEach((item, i) => {
      if (item.domainId === req.body.domainId) {
        index = i;
      }
    });
    if (index === -1) {
      res.send({
        status: 'OK',
        updateDomain: 'error',
      });
    } else {
      domains[index] = {
        ...domains[index],
        ...req.body.data,
      };
      setTimeout(() => {
        res.send({
          updateDomain: 'success',
        });
      }, 500);
    }
  },

  // 验证用户输入的域名是否可用
  'POST /domain/prepareDomain': (req, res) => {
    const tet = {
      certificateURL: "https://acme-v01.api.letsencrypt.org/acme/cert/0365be864ca899a48fd42389899456b5f6c1",
      challengeToken: "5R7U5KOB8Z79qMMurxMn2iAFY1YatWSIoFHNLsunbA0",
      challengeURI: "https://acme-v01.api.letsencrypt.org/acme/challenge/LoFrKX9o4ZCYTREsT2PWnCwTWsQjPu8wfm1cdaFHGHU/1390282468",
      cname: "64d58152-fd31-413c-8052-1ee86ab64eb0.cdn.openhttps.com",
      domain: "cdn.openhttps.com",
      id: 27,
      sequence: 19,
      status: 21,
      targetIP: "8.8.8.9",
      targetPort: 80,
      targetType: 0,
      httpsForward: {
        // hsts: 0 代表禁用，1代表当前域，2代表当前域名及其子域名
        hsts: 1,
        browserHook: true,
        // thirdPartyRes: 0 代表禁用，1代表集中，2代表强制Https
        thirdPartyRes: 1,
      },
      waf: {
        cookieShadowing: true,
        sqlInjection: true,
        xss: true,
        csrf: true,
        responseSplitting: true,
      },
    };
    prepareDomain = {
      domain: req.body.domain,
      cdnCNAME: null,
      cdnIP: "202.112.50.59",
      challengeCdnDomain: "1277366a-149e-4401-b588-5882df5c0c0f.abc.tangshujun.cn",
      challengeCdnTXT: "11ab95c9-b042-4f9f-a87c-92ccbd5efbd5",
      id: 27,
      status: 0,
    };
    tet.domain = req.body.domain;
    domains.push(tet);
    setTimeout(() => {
      res.json(prepareDomain);
    }, 500);
  },

  // 验证DNS是否已正确解析
  'POST /domain/verifyDomainDNS': (req, res) => {
    prepareDomain = {
      domain: req.body.domain,
      cdnCNAME: null,
      cdnIP: "202.112.50.59",
      challengeCdnDomain: "1277366a-149e-4401-b588-5882df5c0c0f.abc.tangshujun.cn",
      challengeCdnTXT: "11ab95c9-b042-4f9f-a87c-92ccbd5efbd5",
      id: 27,
      status: 1,
    };
    setTimeout(() => {
      res.json(prepareDomain);
    }, 500);
  },

  'POST /domain/setOrigin': (req, res) => {
    let index = -1;
    console.log('POST /domain/setOrigin', req.body);
    domains.forEach((item, i) => {
      if (item.id === req.body.id) {
        index = i;
      }
    });
    if (index === -1) {
      setTimeout(() => {
        res.json({
          success: false,
        });
      }, 500);
    } else {
      domains[index] = {
        ...domains[index],
        targetIP: req.body.targetIP,
        targetPort: req.body.targetPort,
      };
      console.log('add domain', domains[index]);
      setTimeout(() => {
        res.json({
          success: true,
        });
      }, 500);
    }
  },

  'POST /domain/get': (req, res) => {
    const result = domains.filter(domain => domain.id === req.body.id);
    setTimeout(() => {
      res.json(result[0]);
    }, 500);
  },
};
