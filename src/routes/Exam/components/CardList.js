import React from 'react';
import {Card} from 'antd';
import PropsTypes from 'prop-types';

class CardList extends React.Component{
    render(){
        return(
            <Card></Card>
        )
    }
}

CardList.propTypes = {
    dataSource:PropsTypes.object.isRequired
}

export default CardList;