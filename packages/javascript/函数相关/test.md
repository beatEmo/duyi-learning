### 函数相关-参数结构

> 根据下面的调用示例，完成函数 getDatas
>
> - getDatas();  // 输出：获取第1页的数据，每页显示10条，查询关键字为空
> - getDatas({page:2});  // 输出：获取第2页的数据，每页显示10条，查询关键字为空

```js
const getDatas = ({ page = 1, limit = 10, keyword = "" } = {}) => {
  console.log(
    `获取第${page}页的数据，每页显示${limit}条，查询关键字为${keyword}`
  );
};
```

> 如此：解决了 `geDatas()` 可能不传参的情况



### 函数防抖
