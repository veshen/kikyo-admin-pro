import React, {Component} from 'react';
import {connect} from 'dva';
import {formatMessage, FormattedMessage} from 'umi/locale';
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
  Form,
  Input,
  Select,
  Button
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Yuan from '@/utils/Yuan';
import {getTimeDistance} from '@/utils/utils';
import styles from './style.less';
import moment from 'moment';

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;
const Option = Select.Option;

@connect(({ order, loading }) => ({
  order,
  queryOrderListLoading : loading.effects['order/queryOrderList'],
}))@Form.create()

class Index extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  handleSubmit = (e) => {
      e.preventDefault();
      this.queryOrderList();
  };
  queryOrderList(page=1){
      this.props.form.validateFields((err, values) => {
          if (!err) {
              const { fetchData, siteId } = this.props;
              values.bookDate = values.bookDate ? values.bookDate.format('YYYY-MM-DD') : null;
              values.orderDate = values.orderDate ? values.orderDate.format('YYYY-MM-DD') : null;
              this.props.dispatch({type: 'order/queryOrderList',data:{...values,page:page,pageSize:30}})
          }
      });
  }
  exportXls(){
      this.props.form.validateFields((err, values) => {
          if (!err) {
              const { fetchData } = this.props;
              values.bookDate = values.bookDate ? values.bookDate.format('YYYY-MM-DD') : null;
              values.orderDate = values.orderDate ? values.orderDate.format('YYYY-MM-DD') : null;
              this.props.dispatch({type: 'order/exportOrderQueryList',data:{...values}})
              // fetchData({funcName: 'exportOrderQueryList',params:{...values}});
          }
      });
  }
  componentDidMount() {}
  render() {
    const {form: {
        getFieldDecorator
      }, submitting} = this.props;
    const dateFormat = 'YYYY/MM/DD';
    var myDate = new Date(); //获取系统当前时间
    const currentDate = myDate.getFullYear() + '/' + (
    myDate.getMonth() + 1) + '/' + myDate.getDate();
    const columns = [
        {
            title: '序号',
            dataIndex: 'customerOrderId',
            key: 'customerOrderId',
            align : 'center'
        },
        {
            title: '单号',
            dataIndex: 'orderId',
            key: 'orderId',
            align : 'center'
        },
        {
            title: '状态',
            dataIndex: 'orderStatusStr',
            key: 'orderStatusStr',
            align : 'center'
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
            align : 'center'
        },
        {
            title: '到店日期',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
            align : 'center'
        },
        {
            title: '下单日期',
            dataIndex: 'orderCreateDate',
            key: 'orderCreateDate',
            align : 'center'
        },
        {
            title: '到店人数',
            dataIndex: 'peerNumber',
            key: 'peerNumber',
            align : 'center'
        },
        {
            title: '实付金额',
            dataIndex: 'payAmount',
            key: 'payAmount',
            align : 'center'
        },
        {
            title: '支付单号',
            dataIndex: 'transactionID',
            key: 'transactionID',
            align : 'center'
        },
        {
            title: '改签状态',
            dataIndex: 'alterStatus',
            key: 'alterStatus',
            align : 'center'
        },
        {
            title: '入场凭证号',
            dataIndex: 'voucherNo',
            key: 'voucherNo',
            align : 'center'
        },
        {
            title: '入场时间',
            dataIndex: 'inTime',
            key: 'inTime',
            align : 'center'
        },
        {
            title: '离场时间',
            dataIndex: 'outTime',
            key: 'outTime',
            align : 'center'
        },

        {
            title: '操作',
            render : (status,record,index) => <div>
            </div>,
            align : 'center'
        },
    ];
    const pagination = {
      total:this.props.order.total,
      pageSize: 30,
      onChange :  (page) => {
          this.queryOrderList(page);
      }
    };
    return (<PageHeaderWrapper>
      <Card title="订单查询" className={styles.card} bordered={false}>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label='订单号'>
                {
                  getFieldDecorator('orderId', {
                      initialValue: '',
                  })(<Input placeholder="请输入订单号"/>)
                }
              </Form.Item>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label='手机号'>
                {
                  getFieldDecorator('mobile', {
                      initialValue: '',
                  })(<Input placeholder="请输入手机号"/>)
                }
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="到店日期">
                {
                  getFieldDecorator('bookDate', {
                    initialValue: moment(currentDate, dateFormat),
                    format: dateFormat
                  })(<DatePicker style={{
                      width: '100%'
                    }}/>)
                }
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="下单日期">
                {
                  getFieldDecorator('orderDate', {
                    initialValue: moment(currentDate, dateFormat),
                    format: dateFormat
                  })(<DatePicker style={{
                      width: '100%'
                    }}/>)
                }
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="订单状态">
                {getFieldDecorator('orderStatus', {
                    initialValue : [0]
                })(
                    <Select
                        mode="multiple"
                        placeholder="请选择订单状态"
                      >
                        {
                            this.props.order.queryStatusList.map((item)=><Option key={item.value} value={item.value}>{item.label}</Option>)
                        }
                     </Select>
                )}
                </Form.Item>
              </Col>
              <Col span={6}>
                  <Form.Item  label='&nbsp;'>
                      <Button type="primary" onClick={this.queryOrderList.bind(this,1)} loading={this.props.queryOrderListLoading} style={{marginRight:'15px'}}>查询</Button>
                      <Button type="primary" onClick={this.exportXls.bind(this)}>导出</Button>
                  </Form.Item>
              </Col>
          </Row>
        </Form>
        <Row>
            <Col>
                <Table
                    title={()=><div style={{display:'flex',justifyContent: 'space-between',alignItems: 'center'}}><h3>订单列表 <span style={{fontSize:'12px'}}>共有{this.props.order.total}条数据</span></h3></div>}
                    pagination={pagination}
                    bordered
                    columns={columns}
                    dataSource={this.props.order.orderList}
                    rowKey={record => record.orderId}
                    loading={this.props.queryOrderListLoading}
                    />
            </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>);
  }
}

export default Index;
