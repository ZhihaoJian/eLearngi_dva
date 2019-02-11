import React from 'react';
import { Button } from 'antd';
import PageHeaderLayout from '../../layout/PageHeaderLayout';
import CardList from './components/CardList';

class ExamPage extends React.Component {
    render() {
        return (
            <PageHeaderLayout
                title='商业软件1班'
                action={(<Button type='primary' >新建测评</Button>)}
            >
                <CardList dataSource />
            </PageHeaderLayout>
        )
    }
}

export default ExamPage;