import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import EchartsProjects from './EchartsProjects';
import EchartsViews from './EchartsViews';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from '@/components/Charts';
import Trend from '@/components/Trend';
import NumberInfo from '@/components/NumberInfo';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Yuan from '@/utils/Yuan';
import { getTimeDistance } from '@/utils/utils';
import echarts from 'echarts';
import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

@connect(({ activities, loading }) => ({
  activities,
  loading: loading.effects['chart/fetch'],
  indexDetailListLoading : loading.effects['activities/fetchIndexDetailList'],
}))
class Analysis extends Component {
  constructor(props) {
    super(props);
    this.rankingListData = [];
    for (let i = 0; i < 7; i += 1) {
      this.rankingListData.push({
        title: formatMessage({ id: 'app.analysis.test' }, { no: i }),
        total: 323234,
      });
    }
    this.state = {
      salesType: 'all',
      currentTabKey: '',
      loading: true,
      rangePickerValue: getTimeDistance('year'),
    };
  }

  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
      this.props.dispatch({type: 'activities/fetchIndexDetailList'})//首页大盘 豆腐块
      this.props.dispatch({type: 'activities/getIndexSaleList'})//首页大盘 销售额
      this.props.dispatch({type: 'activities/getIndexOrderList'})//首页大盘 订单数
      // fetchData({funcName: 'getIndexDetailList'})//首页大盘 豆腐块
      // fetchData({funcName: 'getIndexSaleList'})//首页大盘 销售额
      // fetchData({funcName: 'getIndexOrderList'})//首页大盘 订单数
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  }

  render() {
    const { rangePickerValue, salesType, loading: propsLoding, currentTabKey } = this.state;
    console.log(this.props);
    const { dashBoard, saleListDate, saleListTurnover, orderListDate, orderListTurnover } = this.props.activities;
    const loading = propsLoding || stateLoading;
    const option = {
        title: {
            text: '近七日营业额',
            left: 'center',
            textStyle: {
                color: '#ccc',
                fontSize: 10
            }
        },
        backgroundColor: '#08263a',
        xAxis: [{
            show: true,
            data: saleListDate,
            axisLabel: {
                textStyle: {
                    color: '#ccc'
                }
            }
        }, {
            show: false,
            data: saleListDate
        }],
        tooltip: {},
        visualMap: {
            show: false,
            min: 0,
            max: 50,
            dimension: 0,
            inRange: {
                color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
            }
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#ccc'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#08263f'
                }
            },
            axisTick: {
                show: false
            }
        },
        series: [
            {
            name: 'Simulate Shadow',
            type: 'line',
            data: saleListTurnover,
            z: 2,
            showSymbol: false,
            animationDelay: 0,
            animationEasing: 'linear',
            animationDuration: 1200,
            lineStyle: {
                normal: {
                    color: 'transparent'
                }
            },
            areaStyle: {
                normal: {
                    color: '#08263a',
                    shadowBlur: 50,
                    shadowColor: '#000'
                }
            }
        }, {
            name: '营业额',
            type: 'bar',
            data: saleListTurnover,
            xAxisIndex: 1,
            z: 3,
            itemStyle: {
                normal: {
                    barBorderRadius: 5
                }
            }
        }],
        animationEasing: 'elasticOut',
        animationEasingUpdate: 'elasticOut',
        animationDelay: function (idx) {
            return idx * 20;
        },
        animationDelayUpdate: function (idx) {
            return idx * 20;
        }
    };
    const option2 = {
        title: {
            text: '最近7天用户访问量',
            left: '50%',
            show: false,
            textAlign: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            backgroundColor: 'rgba(255,255,255,1)',
            padding: [5, 10],
            textStyle: {
                color: '#7588E4',
            },
            extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
        },
        legend: {
            right: 20,
            orient: 'vertical',
        },
        xAxis: {
            type: 'category',
            data: orderListDate,
            boundaryGap: false,
            splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                    color: ['#D4DFF5']
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#609ee9'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 10
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: ['#D4DFF5']
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#609ee9'
                }
            },
            axisLabel: {
                margin: 0,
                textStyle: {
                    fontSize: 8
                }
            }
        },
        series: [{
            name: '',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: orderListTurnover,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(216, 244, 247,1)'
                    }, {
                        offset: 1,
                        color: 'rgba(216, 244, 247,1)'
                    }], false)
                }
            },
            itemStyle: {
                normal: {
                    color: '#58c8da'
                }
            },
            lineStyle: {
                normal: {
                    width: 3
                }
            }
        }]
    };
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <GridContent>
        <Row gutter={24}>
            {
                dashBoard.map((item,index)=>{
                    return(
                        <Col {...topColResponsiveProps} key={index}>
                          <ChartCard
                            bordered={false}
                            title={item.title}
                            action={
                              <Tooltip
                                title={
                                  <FormattedMessage id="app.analysis.introduce" defaultMessage="introduce" />
                                }
                              >
                                <Icon type="info-circle-o" />
                              </Tooltip>
                            }
                            loading={this.props.indexDetailListLoading}
                            total={() => <Yuan>{item.value}</Yuan>}
                            contentHeight={46}
                          >
                          </ChartCard>
                        </Col>
                    )
                })
            }
        </Row>
        <Row>
            <Col className="gutter-row">
                <div className="gutter-box">
                    <Card bordered={false} className={'no-padding'}>
                        <EchartsProjects data={option}/>
                    </Card>
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
            <Card bordered={false}>
                <div className="pb-m">
                    <small>近7日订单数</small>
                </div>
                <EchartsViews  data={option2}/>
            </Card>
            </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Analysis;
