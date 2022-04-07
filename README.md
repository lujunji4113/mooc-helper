<p align="center">
  <a href="https://github.com/lujunji-xiaolu/mooc-helper" rel="noopener" target="_blank"><img width="150" src="./public/logo.svg" alt="mooc helper logo"></a>
</p>

<h1 align="center">mooc helper</h1>

查询**中国大学 MOOC 慕课课程**的**单元测验**、**单元作业**的答案

## 静态网站地址

[mooc helper](https://mooc-helper.web.cloudendpoint.cn/)

## 用法

### 前置条件

查询前需要 [添加课程](#addCourse) 或 [设置 mob-token](#setMobToken)

> SPOC 学校专有课程无法添加，除非设置 mob-token。设置 mob-token 后，课程信息自动导入，不再需要添加课程

### 选择对应课程

![选择课程](./docs/images/选择课程.png)

### 选择章节

![选择章节](./docs/images/选择章节.png)

### 点击查询

![点击查询](./docs/images/点击查询.png)

## 问题

### 1、如何添加课程?<a name="addCourse"></a>

![课程 id](./docs/images/课程id.png)

添加课程需要课程的 ID，这个 ID 就是`tid`字段对应的值

![添加课程](./docs/images/添加课程.png)

### 2、设置 mob-token<a name="setMobToken"></a>

#### 1、获取 mob-token

##### 步骤一

在手机上安装抓包软件，比如 [HttpCanary for Android - APK Download (apkpure.com)](https://apkpure.com/httpcanary-—-http-sniffer-capture-analysis/com.guoshi.httpcanary)

##### 步骤二

打开抓包软件，这里以 HttpCanary 为例

打开设置界面

![打开设置界面](./docs/images/httpcanary-setting.png)

##### 步骤三

开启 只抓取 http/https

![开启 只抓取 http/https](./docs/images/httpcanary-only-http.png)

##### 步骤四

将 中国大学 MOOC APP 添加进目标应用，点击 开始抓包

##### 步骤五

打开 中国大学 MOOC APP，切换至 学习 模块，等待该页面加载完成

![打开 中国大学MOOC慕课 APP，切换至 学习 模块](./docs/images/mooc-learn-module.png)

##### 步骤六

回到 HttpCanary 应用界面，对 getAllMyCourseList 关键字进行搜索

![对 getAllMyCourseList 关键字进行搜索](./docs/images/httpcanary-search.png)

![对 getAllMyCourseList 关键字进行搜索](./docs/images/httpcanary-search-getAllMyCourselist.png)

##### 步骤七

选取任意一条记录，进入查看，选择 请求 选项卡，再选择 预览，然后我们就得到了 mob-token

#### 2、设置 mob-token

![设置mob-token](./docs/images/设置mob-token.png)

### 3、为什么我查不到参考答案？

- 原因一：你查找的课程未添加，需要先添加课程
- 其它未知原因

### 4、注意事项

- 题目排列顺序、答案排列顺序可能存在差异
- 对于设置了 mob-token 的用户，请明确查询的单元测验是否有时间限制。如果测验是定时的，请查询答案后在时间截至前提交一次，保证一次有效成绩，因为查询操作会开启一次测验。
