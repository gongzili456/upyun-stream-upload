# upyun-stream-upload




# Usage

```
import path from 'path';
import parse from 'co-busboy';

var config = {
  bucket: '{}',
  operator: '{}',
  password: '{}'
};

let upyun = new Upyun(config);

router.put('/upload', function*() {

  var parts = parse(this);
  var part;

  while (part = yield parts) {

    let filename = `${uuid.v4()}${path.extname(part.filename)}`;
    
    res = yield upyun.upload(part, filename);

  }

  this.body = {
    url: files,
    response: res
  };

});
```
