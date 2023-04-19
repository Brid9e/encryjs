// 数据压缩加密
const pako = require('pako');

const json = {
  syncPhone: '1',
  passwordRule: 'Aa/Num/#/leng_6-18',
  loginSecretKey: '60832972c0155948ee7dcb545e9f973e',
  apiFlag: '0',
  amap: '{"url":"https://restapi.amap.com/v3/geocode/regeo","output":"JSON","key":"52059bfec34fae3b9fa5cab3b5e0baa0","radius":"1000","extensions":"all"}',
  signingSupport: '11',
  accAppClickable: '["VirtualCardBill"]',
  paySettings: '101',
  refundIsAudit: '1',
  bankList: '[{"name":"中国工商银行","code":"ICBC"}]',
  refundFeeitemId: '666',
  authentication:
    '[{"name": "学工号验证","key": "sno","encryption":"keyboard"},{"name": "扫码验证","key": "scan"},{"name": "人脸识别","key": "faceRecognition"}, {"name": "身份证验证","key": "id","encryption":"keyboard"},{"name": "手机号验证","key": "verificationCode"},{"name": "校园卡验证","key": "card"},{"name": "账号验证","key": "card","label":"accountAuth“,"isEnter":true}]',
  addBankFlag: '11',
  selfService: 'http://192.168.3.170:3060/',
  logoutFlag: '{"wechat-mina":1,"wechat-work":1,"wechat-mp":1,"app":1,"h5":1}',
  line: '111',
  codeRefreshTime: '30',
  changePasswordFlag: '33',
  unauthorizedCode: '4030, 4037, 4038, 4011',
  bankCardPayCode: '1',
  payCodeSocket: '0',
  paycodeSize: '150',
  setCardStyle: '1',
  loginPrompt: '1',
  firstLogin: '1',
  screenshotLimit: '5',
  mercInfo: '{"posid":"666","merccode":"1000017"}',
  unlockFlag: '0',
  applications: 'https://synjones.natapp4.cc/applications/',
  addBank: '0',
  withdrawFlag: '111',
  cardCodeFlag: 'true',
  bankPay:
    '{"urlPortal":"https://b2c.icbc.com.cn","urlListMain":"https://gw.open.icbc.com.cn","wxAppId":"wxb1150da1fd698e8b","urlSchemes":"ecampus.icbc.pay","universalLink":"" }',
  appSchemeType: 'true',
  payResult: 'https://synjones.natapp4.cc/plat/payResult',
  wechatMpAppId: 'wx73b6c5a711550f71',
  delayTime: '30',
  smsVercode: '1',
  publicResource: 'https://synjones.natapp4.cc/minio/',
  offlineCode: '1',
  websocket: 'ws://192.168.3.229/websocket/',
  plat: 'https://synjones.natapp4.cc/plat/',
  campusCard: 'https://synjones.natapp4.cc/campus-card/',
  payment: 'https://synjones.natapp4.cc/payment/',
  merchant: 'https://synjones.natapp4.cc/merchant/',
  scan: '407',
  recharge: '401',
  resource: 'https://synjones.natapp4.cc/minio/theme',
  version: '0',
  casUrl:
    'http://esynjones.natapp4.cc/berserker-auth-d/cas/redirect/supwisdom?targetUrl=https://synjones.natapp4.cc/plat?name=loginTransit&amp;source=app',
  loginTitle: '欢迎登录移动服务平台',
  loginType:
    '[{"name":"用户名登录","key":"username","encryption":"md5","platformType":"h5,app,wechat-mina"},{"name":"姓名登录","value":"身份证号码","key":"idNumberAndName","platformType":"wechat-mp","encryption":"crypto"},{"name":"统一身份认证","key":"sso"},{"name":"学号登录","key":"sno","encryption":"keyboard"},{"name":"学号登录new","key":"snoNew"},{"name":"身份证登录","key":"id","encryption":"keyboard"},{"name":"南航统一身份认证","key":"sso","url":"http://synjones.natapp4.cc/berserker-auth-d/cas/redirect/supwisdom?targetUrl=http://synjones.natapp4.cc/plat?source=app"},{"name":"手机号登录","key":"phone","value":"一卡通查询密码"},{"name":"卡号登录","key":"card","value":"卡号密码"},{"name":"手机验证码登录","key":"verificationCode","codeLength":6},{"name":"北大统一身份认证","key":"sso","url":"https://yktdt-cs.utsz.edu.cn/berserker-auth/cas/redirect/pku","title":"北京大学校园卡","icon":"https://synjones.natapp4.cc/minio/public/logo/PKU.png","platformType":"wechat-mina,app"},{"name":"清华统一身份认证","key":"sso","url":"https://synjones.natapp4.cc/berserker-auth/cas/redirect/tsinghua?targetUrl=https://synjones.natapp4.cc/plat?name=loginTransit","icon":"https://synjones.natapp4.cc/minio/public/logo/THU.png"},{"name":"哈工大统一身份认证","key":"sso","url":"https://synjones.natapp4.cc/berserker-auth/cas/redirect/hit?targetUrl=https://synjones.natapp4.cc/plat?name=loginTransit","title":"哈尔滨工业大学校园卡"},{"name":"校外人员","key":"openId"}]',
  specialversion: '0',
};

const json_gzip = pako.gzip(encodeURIComponent(JSON.stringify(json)), {
  to: 'string',
});
console.log('加密压缩', json_gzip);

const json_ungzio = pako.ungzip(json_gzip, { to: 'string' });

console.log('解压', JSON.parse(decodeURIComponent(json_ungzio)));
