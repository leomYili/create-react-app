# axis-decorator

重新封装的装饰器函数

## 💡Decorators:

- [@decorateFunc](#decorateFunc)
- [@nonenumerable](#nonenumerable)
- [@override](#override)
- [@persistence](persistence)

### decorateFunc(Methods)

可使用外部辅助计算函数对 class 方法进行包装

```js
import { decorateFunc } from 'axis-decorators';
import { memoize } from 'lodash';

class Task {
  @decorateFunc(memoize)
  doSomethingExpensive(data) {
    count++;
    // something expensive;
    return data;
  }
}
```

### nonenumerable(Property)

将属性标记为不可枚举

```js
import { nonenumerable } from 'axis-decorators';

class Test {
  name = 'test';

  @nonenumerable
  count = 10;
}
```

### override(Methods)

检查标记的方法是否确实覆盖原型链上某处具有相同签名的函数

```js
import { override } from 'axis-decorators';

class Parent {
  speak(first, second) {}
}

class Child extends Parent {
  @override
  speak() {}
  // SyntaxError: Child#speak() does not properly override Parent#speak(first, second)
}
```

### persistence(Property)

持久化属性,用于收集所有需要进行持久化保存的属性,可传参:singlePage or global

```js
import { persistence } from 'axis-decorators';

export default class store extends BaseStore {
  @observable
  step = 100;

  @observable
  @persistence()
  markLineList = [];
}
```
