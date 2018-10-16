import React, {Component} from 'react';
import {connect} from 'dva';
import {formatMessage, FormattedMessage} from 'umi/locale';
import {
  Row,
  Col,
  Icon,
  Card,
  DatePicker,
  Tooltip,
  Form,
  Input,
  Button,
  Select,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Yuan from '@/utils/Yuan';
import {getTimeDistance} from '@/utils/utils';
import styles from './style.less';
import moment from 'moment';
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
  exportXls(){
      this.props.form.validateFields((err, values) => {
          if (!err) {
              console.log(values);
              return;
              values.bookDate = values.bookDate ? values.bookDate.format('YYYY-MM-DD') : null;
              values.orderDate = values.orderDate ? values.orderDate.format('YYYY-MM-DD') : null;
              this.props.dispatch({type: 'order/exportOrderQueryInterval',data:{...values}})
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
    return (<PageHeaderWrapper>
      <Card title="订单查询" className={styles.card} bordered={false}>
        <Form layout="vertical">
          <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="开始时间">
                  {
                    getFieldDecorator('beginDate', {
                      initialValue: moment(currentDate, dateFormat),
                      format: dateFormat
                    })(<DatePicker style={{
                        width: '100%'
                      }}/>)
                  }
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="结束时间">
                  {
                    getFieldDecorator('endDate', {
                      initialValue: moment(currentDate, dateFormat),
                      format: dateFormat
                    })(<DatePicker style={{
                        width: '100%'
                      }}/>)
                  }
                </Form.Item>
              </Col>
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
                  <Form.Item label="日期类型：">
                  {getFieldDecorator('dateType', {
                      initialValue : 1
                  })(
                      <Select
                        >
                          <Option key={1} value={1}>下单日期</Option>
                          <Option key={2} value={2}>预定日期日期</Option>
                       </Select>
                  )}
              </Form.Item>
              </Col>
          </Row>
          <Row gutter={16}>
              <Col span={6}>
                  <Form.Item  label='&nbsp;'>
                      <Button type="primary" onClick={this.exportXls.bind(this)}>导出</Button>
                  </Form.Item>
              </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>);
  }
}

export default Index;
