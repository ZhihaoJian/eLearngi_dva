export default {
    [`GET /grade/getGradePage`]: (req, res) => {
        const response = {
            "msg": "string",
            "status": 200,
            "success": true,
            "results": {
                content: [
                    {
                        name: '商业软件1班',
                        navLink: '/classroom/room?roomid=123&name=商业软件1班',
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                        description: 'This is the description'
                    },
                    {
                        name: '商业软件2班',
                        navLink: '/classroom/room?roomid=123&name=商业软件2班',
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                        description: 'This is the description'
                    }
                    , {
                        name: '商业软件3班',
                        navLink: '/classroom/room?roomid=123&name=商业软件3班',
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                        description: 'This is the description'
                    }, {
                        name: '数媒一班',
                        navLink: '/classroom/room?roomid=123&name=数媒一班',
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                        description: 'This is the description'
                    }, {
                        name: '数媒二班',
                        navLink: '/classroom/room?roomid=123&name=数媒二班',
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                        description: 'This is the description'
                    },
                    {
                        name: '网工一班',
                        navLink: '/classroom/room?roomid=123&name=网工一班',
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                        description: 'This is the description'
                    },
                    {
                        name: '网工一班',
                        navLink: '/classroom/room?roomid=123&name=网工一班',
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                        description: 'This is the description'
                    }, {
                        name: '网工一班',
                        navLink: '/classroom/room?roomid=123&name=网工一班',
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                        description: 'This is the description'
                    }, {
                        name: '网工一班',
                        navLink: '/classroom/room?roomid=123&name=网工一班',
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                        description: 'This is the description'
                    },
                    {
                        name: '网工一班',
                        navLink: '/classroom/room?roomid=123&name=网工一班',
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                        description: 'This is the description'
                    }, {
                        name: '网工一班',
                        navLink: '/classroom/room?roomid=123&name=网工一班',
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                        description: 'This is the description'
                    }, {
                        name: '网工一班',
                        navLink: '/classroom/room?roomid=123&name=网工一班',
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                        description: 'This is the description'
                    }, {
                        name: '网工一班',
                        navLink: '/classroom/room?roomid=123&name=网工一班',
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                        description: 'This is the description'
                    }
                ]
            },
        }
        res.send(response);
    }
}