import React from 'react';
import { FooterLinks, copyright } from '../../config/footer';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';


export default class Footer extends React.Component {
    render() {
        return (
            <GlobalFooter links={FooterLinks} copyright={copyright} />
        )
    }
}