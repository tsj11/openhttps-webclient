// import mockjs from 'mockjs';
const sync = [
  {
    syncId: '1',
    logServer: 'ct1.digicert-ct.com/log',
    synchronized: '1113301',
    syncState: '同步异常：',
    saved: '1113301 (100.00%)',
    lastSyncTime: '2017-12-28 08:57:53',
    interval: '10分钟',
  },
  {
    syncId: '2',
    logServer: 'ct2.digicert-ct.com/log',
    synchronized: '1113301',
    syncState: '同步异常：',
    saved: '1113301 (100.00%)',
    lastSyncTime: '2017-12-28 08:57:53',
    interval: '10分钟',
  },
  {
    syncId: '3',
    logServer: 'ct3.digicert-ct.com/log',
    synchronized: '1113301',
    syncState: '同步异常：',
    saved: '1113301 (100.00%)',
    lastSyncTime: '2017-12-28 08:57:53',
    interval: '10分钟',
  },
  {
    syncId: '4',
    logServer: 'ct4.digicert-ct.com/log',
    synchronized: '1113301',
    syncState: '同步异常：',
    saved: '1113301 (100.00%)',
    lastSyncTime: '2017-12-28 08:57:53',
    interval: '10分钟',
  },
  {
    syncId: '5',
    logServer: 'ct5.digicert-ct.com/log',
    synchronized: '1113301',
    syncState: '同步异常：',
    saved: '1113301 (100.00%)',
    lastSyncTime: '2017-12-28 08:57:53',
    interval: '10分钟',
  },
  {
    syncId: '6',
    logServer: 'ct6.digicert-ct.com/log',
    synchronized: '1113301',
    syncState: '同步异常：',
    saved: '1113301 (100.00%)',
    lastSyncTime: '2017-12-28 08:57:53',
    interval: '10分钟',
  },
];

const edge = [
  {
    edgeId: '1',
    ip: '102.112.50.59',
    port: '443',
    comment: '无',
    state: 'unknown',
    syncTime: '2017-7-14 12:57',
    using: '是',
  },
  {
    edgeId: '2',
    ip: '202.112.50.59',
    port: '444',
    comment: '无',
    state: 'unknown',
    syncTime: '2017-7-14 12:57',
    using: '是',
  },
];

export default {

  // 同步管理
  'POST /api/querySync': (req, res) => {
    setTimeout(() => {
      res.json({ status: 'ok', sync });
    }, 500);
  },

  'POST /api/updateSync': (req, res) => {
    let index = -1;
    sync.forEach((item, i) => {
      if (item.syncId === req.body.syncId) {
        index = i;
      }
    });
    if (index === -1) {
      res.send({
        status: 'OK',
        updateSync: 'error',
      });
    } else {
      sync[index] = {
        ...sync[index],
        ...req.body.data,
      };
      res.send({
        updateSync: 'success',
      });
    }
  },

  // 节点管理
  'POST /api/queryEdge': (req, res) => {
    setTimeout(() => {
      res.json({ status: 'ok', edge });
    }, 500);
  },
};
