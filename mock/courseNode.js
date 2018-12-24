export default {
    //加载根节点
    [`POST /courseNode/findCourseNodeByIsRoot/true/:id`]: (req, res) => {
        const response = {
            "msg": "string",
            "results": [
                {
                    "content": "string",
                    "courseId": "1",
                    "createName": "string",
                    "createTime": 0,
                    "expired": true,
                    "id": "1",
                    "leaf": false,
                    "nodeKey": "0-0",
                    "parentKey": "0-0",
                    "remark": "",
                    "rootNode": true,
                    "savePath": "",
                    "status": 0,
                    "title": "React基本介绍",
                    "updateName": "",
                    "updateTime": 0,
                    "children": null
                },
                {
                    "content": "string",
                    "courseId": "1",
                    "createName": "string",
                    "createTime": 0,
                    "expired": true,
                    "id": "2",
                    "leaf": false,
                    "nodeKey": "0-1",
                    "parentKey": "0-1",
                    "remark": "",
                    "rootNode": true,
                    "savePath": "",
                    "status": 0,
                    "title": "搭建React开发环境",
                    "updateName": "",
                    "updateTime": 0,
                    "children": null
                }
            ],
            "status": 200,
            "success": true
        }
        res.send(response);
    },

    // 根据父节点，加载子节点
    [`POST /courseNode/findCourseNode/:key/:courseId`]: (req, res) => {
        let { key, courseId } = req.params;
        const data = {
            "0-0": [
                {
                    "content": "string",
                    "courseId": "1",
                    "createName": "string",
                    "createTime": 0,
                    "expired": true,
                    "id": "1",
                    "leaf": true,
                    "nodeKey": "0-0-0",
                    "parentKey": "0-0",
                    "remark": "",
                    "rootNode": false,
                    "savePath": "",
                    "status": 0,
                    "title": "前端的历史进程",
                    "updateName": "",
                    "updateTime": 0
                },
                {
                    "content": "string",
                    "courseId": "1",
                    "createName": "string",
                    "createTime": 0,
                    "expired": true,
                    "id": "2",
                    "leaf": true,
                    "nodeKey": "0-0-1",
                    "parentKey": "0-0",
                    "remark": "",
                    "rootNode": true,
                    "savePath": "",
                    "status": 0,
                    "title": "React和其余框架的对比",
                    "updateName": "",
                    "updateTime": 0
                },
            ],
            '0-1': [
                {
                    "content": "string",
                    "courseId": "1",
                    "createName": "string",
                    "createTime": 0,
                    "expired": true,
                    "id": "3",
                    "leaf": true,
                    "nodeKey": "0-1-0",
                    "parentKey": "0-1",
                    "remark": "",
                    "rootNode": false,
                    "savePath": "",
                    "status": 0,
                    "title": "安装NodeJS",
                    "updateName": "",
                    "updateTime": 0,
                },
                {
                    "content": "string",
                    "courseId": "1",
                    "createName": "string",
                    "createTime": 0,
                    "expired": true,
                    "id": "4",
                    "leaf": true,
                    "nodeKey": "0-1-1",
                    "parentKey": "0-1",
                    "remark": "",
                    "rootNode": false,
                    "savePath": "",
                    "status": 0,
                    "title": "使用NPM安装create-react-app",
                    "updateName": "",
                    "updateTime": 0,
                }
            ],
        };
        const response = {
            "msg": "string",
            "results": data[key],
            "status": 200,
            "success": true
        }
        res.send(response);
    },

    [`GET /courseNode/loadFile/:id`]: (req, res) => {
        const data = {
            '1':`
            Create React apps with no build configuration.

            Creating an App – How to create a new app.
            User Guide – How to develop apps bootstrapped with Create React App.
            Create React App works on macOS, Windows, and Linux.
            If something doesn’t work, please file an issue.
            `,
            '2':`
            Node.js是一个能够在服务器端运行JavaScript的开放源代码、跨平台JavaScript 运行环境。Node.js由Node.js基金会持有和维护，并与Linux基金会有合作关系
            `,
            '3':`
            React（有时叫React.js或ReactJS）是一个为数据提供渲染为HTML视图的开源JavaScript 库。React视图通常采用包含以自定义HTML标记规定的其他组件的组件渲染。React为程序员提供了一种子组件不能直接影响外层组件（"data flows down"）的模型，数据改变时对HTML文档的有效更新，和现代单页应用中组件之间干净的分离。

它由Facebook、Instagram和一个由个人开发者和企业组成的社群维护。[2][3][4]根据JavaScript分析服务Libscore，React目前正在被Netflix、Imgur、Bleacher Report、Feedly、Airbnb、SeatGeek、HelloSign等很多网站的主页使用。[5]

截至2015年1月，React和React Native在GitHub上的加星数量是Facebook位列第二的开源项目，[6]也是GitHub有史以来星标第九多的项目。[7]
            `,
            '4':`
            Angular 是基于 TypeScript 的 Javascript 框架。由 Google 进行开发和维护，它被描述为“超级厉害的 JavaScript MVW 框架”。Angular（也被称为 “Angular 2+”，“Angular 2” 或者 “ng2”）已被重写，是与 AngularJS（也被称为 “Angular.js” 或 “AngularJS 1.x”）不兼容的后续版本。当 AngularJS（旧版本）最初于2010年10月发布时，仍然在修复 bug，等等 —— 新的 Angular（sans JS）于 2016 年 9 月推出版本 2。最新的主版本是 4，因为版本 3 被跳过了。Google，Vine，Wix，Udemy，weather.com，healthcare.gov 和 Forbes 都使用 Angular（根据 madewithangular，stackshare 和 libscore.com 提供的数据）。
React 被描述为 “用于构建用户界面的 JavaScript 库”。React 最初于 2013 年 3 月发布，由 Facebook 进行开发和维护，Facebook 在多个页面上使用 React 组件（但不是作为单页应用程序）。根据 Chris Cordle 这篇文章的统计，React 在 Facebook 上的使用远远多于 Angular 在 Google 上的使用。React 还被 Airbnb，Uber，Netflix，Twitter，Pinterest，Reddit，Udemy，Wix，Paypal，Imgur，Feedly，Stripe，Tumblr，Walmart 等使用（根据 Facebook, stackshare 和 libscore.com 提供的数据）。
Facebook 正在开发 React Fiber。它会改变 React 的底层 - 渲染速度应该会更快 - 但是在变化之后，版本会向后兼容。Facebook 将会在 2017 年 4 月的开发者大会上讨论新变化，并发布一篇非官方的关于新架构的文章。React Fiber 可能与 React 16 一起发布。
Vue 是 2016 年发展最为迅速的 JS 框架之一。Vue 将自己描述为一款“用于构建直观，快速和组件化交互式界面的 MVVM 框架”。它于 2014 年 2 月首次由 Google 前员工 Evan You 发布（顺便说一句：尤雨溪那时候发表了一篇 vue 发布首周的营销活动和数据的博客文章）。尤其是考虑到 Vue 在没有大公司的支持的情况下，作为一个人开发的框架还能获得这么多的吸引力，这无疑是非常成功的。尤雨溪目前有一个包含数十名核心开发者的团队。2016 年，版本 2 发布。Vue 被阿里巴巴，百度，Expedia，任天堂，GitLab 使用 — 可以在 madewithvuejs.com 找到一些小型项目的列表。
Angular 和 Vue 都遵守 MIT license 许可，而 React 遵守 BSD3-license 许可证。在专利文件上有很多讨论。James Ide（前 Facebook 工程师）解释专利文件背后的原因和历史：Facebook 的专利授权是在保护自己免受专利诉讼的能力的同时分享其代码。专利文件被更新了一次，有些人声称，如果你的公司不打算起诉 Facebook，那么使用 React 是可以的。你可以在 Github 的这个 issue 上 查看讨论。我不是律师，所以如果 React 许可证对你或你的公司有问题，你应该自己决定。关于这个话题还有很多文章：Dennis Walsh 写到，你为什么不该害怕。Raúl Kripalani 警告：反对创业公司使用 React，他还写了一篇备忘录概览。此外，Facebook 上还有一个最新的声明：解释 React 的许可证。
            `
        }
        const response = {
            "msg": "string",
            "results": {
                content: data[req.params.id]
            },
            "status": 200,
            "success": true
        }
        res.send(response);
    }
}