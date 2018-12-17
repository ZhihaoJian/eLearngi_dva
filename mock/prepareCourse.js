export default {
    [`GET /course/getCourseListByStatus`]: (req, res) => {

        const listData = [];
        for (let i = 0; i < 23; i++) {
            listData.push({
                id:i,
                name:'React高仿饿了吗',
                description: '学会了初步的JavaScript、HTML和CSS3，却不知道怎么进阶学习? 想使用三大框架却无从下手? 那么这门课就是为你打造的',
                remark: '此课程适合于应届毕业生，初级、中级前端开发者以及对前端感兴趣的同学们',
                type: '前端开发、React、NPM、NodeJS',
                createTime: Date.now(),
                isRelease: 0,
                coverURL: 'https://img1.sycdn.imooc.com/5c1251b50001505b18720632.jpg'
            });
        }

        const response = {
            "msg": "string",
            "status": 200,
            "success": true,
            "results": listData
        }
        res.send(response);
    },

    [`DELETE /course/delCourse/:id`]:(req,res)=>{
        const response = {
            "msg": "删除错过",
            "status": 200,
            "success": true,
            "results": {}
        }
        res.send(response);
    }
}