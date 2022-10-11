<p align="center">
  <a href="https://github.com/lujunji-xiaolu/mooc-helper" rel="noopener" target="_blank"><img width="150" src="./docs/media/logo.svg" alt="mooc helper logo"></a>
</p>

<h1 align="center">mooc helper</h1>

查询**中国大学 MOOC(慕课)课程**的**单元测验**、**单元作业**、**期中/期末测试**的答案

## 网站地址

[mooc helper (mooc-helper.vercel.app)](https://mooc-helper.vercel.app/)

建议国内用户尝试如下方式使用：
- 使用[桌面端应用程序](https://github.com/xiaolu-lujunji/mooc-helper/releases)（目前仅支持 Windows）
- 手机端访问
- 本地启动该项目

## 使用步骤

1. 下载 Android 端抓包工具 [HttpCanary for Android - APK Download (apkpure.com)](https://apkpure.com/httpcanary-—-http-sniffer-capture-analysis/com.guoshi.httpcanary)
1. 通过 HttpCanary 抓包工具获取你的 `mob-token`

https://user-images.githubusercontent.com/95520590/170272233-b43614b8-e3bb-4111-a5c7-d54df0209d4e.mp4

2. 点击[网站](https://mooc-helper.vercel.app/)右上角**设置按钮**，将获取的`mob-token`粘贴到**MOB_TOKEN 输入框**中。然后关闭设置，等待片刻。

## 注意事项

- ❗❗❗ 请明确查询对象是否有时间限制。如果是，请查询后 **在时间截至前** 提交一次，保证一次有效成绩，因为查询操作会开启一次测验。[详情请看 issue13](https://github.com/xiaolu-lujunji/mooc-helper/issues/13)
- 题目排列顺序、答案排列顺序可能存在差异
