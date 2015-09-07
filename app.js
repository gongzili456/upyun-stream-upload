import koa from 'koa';
import request from 'request';
import parse from 'co-busboy';
import Router from 'koa-router';
import Upyun from './upyun';
import uuid from 'uuid';
import path from 'path';

let app = koa();

/**
 * 测试请替换
 */

var config = {
  bucket: 'bangzhu',
  operator: 'iampm',
  password: 'woshi2015'
};

let upyun = new Upyun(config);
let router = new Router();

router.put('/upload', function*() {

  var parts = parse(this);
  var part;

  var files = [];
  var res = '';
  while (part = yield parts) {

    let filename = `aaa/${uuid.v4()}${path.extname(part.filename)}`;
    res = yield upyun.upload(part, filename);


    files.push(`http://bangzhu.b0.upaiyun.com/${filename}`);
  }

  this.body = {
    url: files,
    response: res
  };

});

app.use(router.routes());

app.listen(9000, ()=> {
  console.log('started');
});
