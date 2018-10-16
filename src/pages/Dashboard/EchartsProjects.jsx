import React from 'react';
import ReactEcharts from 'echarts-for-react';


const EchartsProjects = (props) => (
    <ReactEcharts
        option={props.data}
        style={{height: '212px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default EchartsProjects;
