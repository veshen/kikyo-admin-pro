import React from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

const EchartsViews = (props) => (
    <ReactEcharts
        option={props.data}
        style={{height: '350px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default EchartsViews;
