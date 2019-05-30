const got = require('got');
const FormData = require('form-data');

module.exports = async function(file) {
  const ctoken = ``;
  const session = ``;
  const body = new FormData();
  body.append('file', require('fs').createReadStream(file));
  body.append('_input_charset', 'utf-8');
  const res = await got(`https://www.yuque.com/api/upload/attach?type=image&ctoken=${ctoken}`, {
    method: 'POST',
    headers: {
      'Cookie': `ctoken=${ctoken}; _yuque_session=${session};`,
    },
    body,
  });
  if (res.statusCode !== 200) {
    throw new Error('Request failed, may be ctoken is outdated.');
  }
  return JSON.parse(res.body).data.url;
}


// 以上是全部代码，填上自己的 ctoken 和 session 即可。
// 可以写一个简单的 test 文件验证下，

const yuque = require('./yuque');

try {
  (async () => {
    const url = await yuque(`/Users/chencheng/Desktop/a.png`);
    console.log(url);
  })();
} catch (e) {
  console.log(`Upload to yuque failed: ${e}`);
}