import React from 'react';
import { Row, Col, Card, Icon, Divider, Tag, List, Avatar } from 'antd';
import styles from './index.less';

const listData = [];
for (let i = 0; i < 5; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

class MePage extends React.Component {

    state = {
        activeKey: 'article'
    }

    onTabChange = (key) => {
        this.setState({ activeKey: key })
    }

    render() {
        const tabListNoTitle = [{
            key: 'article',
            tab: '文章',
        }, {
            key: 'classroom',
            tab: '班级',
        }, {
            key: 'exam',
            tab: '考试',
        }];

        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );

        const contentListNoTitle = {
            article: (
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            ),
            classroom: <p>app content</p>,
            exam: <p>project content</p>,
        };

        return (
            <Row>
                <Col span={7} style={{ padding: '0 12px' }} >
                    <Card>
                        <div className={styles['me']}>
                            <div className={styles['me-avatar-holder']}>
                                <img src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png' alt='头像' />
                                <div className={styles['me-name']}>JianZhihao</div>
                            </div>
                            <div className={styles['me-detail']}>
                                <div><Icon type="user" /><p>前端开发工程师</p></div>
                                <div><Icon type="team" /><p>广州市汇美时尚股份有限公司</p></div>
                                <div><Icon type="environment" /><p>广东省广州市</p></div>
                            </div>
                            <Divider dashed />
                            <div className='me-tag' >
                                <div className={styles['me-tag-title']}>标签</div>
                                <Tag>大长腿</Tag>
                                <Tag>游戏玩家</Tag>
                                <Tag>PS4</Tag>
                                <Tag>程序员</Tag>
                                <Tag>广州人</Tag>
                                <Tag>单身狗</Tag>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col span={17} style={{ padding: '0 12px' }}>
                    <Card
                        style={{ width: '100%' }}
                        tabList={tabListNoTitle}
                        activeTabKey={this.state.activeKey}
                        onTabChange={key => this.onTabChange(key)}
                    >
                        {contentListNoTitle[this.state.activeKey]}
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default MePage;