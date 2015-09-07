import request from 'request';
import assert from 'assert';

let HOST = {
  v0: 'http://v0.api.upyun.com/', //自动判断最优线路
  v1: 'http://v1.api.upyun.com/', //电信线路
  v2: 'http://v2.api.upyun.com/', //联通（网通）线路
  v3: 'http://v3.api.upyun.com/' //移动（铁通）线路
};

let keys = ['bucket', 'operator', 'password'];


class Upyun {

  /**
   *
   * @param name
   * @param pass
   */
  constructor(opt) {

    keys.forEach(function (key) {
      assert(opt[key], `The value of ${key} is required, please checked your config.`);
    });

    opt['endpoint'] = opt['endpoint'] || 'v0';
    opt['apiVersion'] = opt['apiVersion'] || 'legacy';

    this.config = opt;
  }

  /**
   *
   * @param part
   * @param path
   * @returns {Promise}
   */
  upload(part, path, ops) {

    return new Promise((reslove, reject)=> {

      part.pipe(request({
        url: `${HOST[this.config.endpoint]}${this.config.bucket}/${path}`,
        method: 'PUT',
        auth: {
          'user': this.config.operator,
          'pass': this.config.password
        }
      }, function (err, response, body) {

        if (err) {
          return reject(err);
        }

        return reslove({
          body: body,
          response: response
        });
      }));
    })
  }
}

export default Upyun;

