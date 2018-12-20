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
                    "children": [
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
                            "id": "1",
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
                    ]
                },
                {
                    "content": "string",
                    "courseId": "1",
                    "createName": "string",
                    "createTime": 0,
                    "expired": true,
                    "id": "2",
                    "leaf": true,
                    "nodeKey": "0-1",
                    "parentKey": "0-1",
                    "remark": "",
                    "rootNode": true,
                    "savePath": "",
                    "status": 0,
                    "title": "搭建React开发环境",
                    "updateName": "",
                    "updateTime": 0,
                    "children": [
                        {
                            "content": "string",
                            "courseId": "1",
                            "createName": "string",
                            "createTime": 0,
                            "expired": true,
                            "id": "2",
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
                            "id": "2",
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
                    ]
                }
            ],
            "status": 200,
            "success": true
        }
        res.send(response);
    },

    // 根据父节点，加载子节点
    [`POST /courseNode/findCourseNode/:key/:courseId`]: (req, res) => {
        const response = {
            "msg": "string",
            "results": {},
            "status": 0,
            "success": true
        }
        res.send(response);
    }
}