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
  Button,
  Popconfirm
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Yuan from '@/utils/Yuan';
import {getTimeDistance} from '@/utils/utils';
import styles from './style.less';
import moment from 'moment';

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;
const Option = Select.Option;

@connect(({ feedback, loading }) => ({
  feedback,
  getFeedbackListLoading : loading.effects['feedback/getFeedbackList'],
}))@Form.create()

class Index extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  getFeedbackList(page=1){
      this.props.form.validateFields((err, values) => {
          if (!err) {
              console.log(this.props);
              values.addDate = values.addDate ? values.addDate.format('YYYY-MM-DD') : null;
              this.props.dispatch({type: 'feedback/getFeedbackList',data:{...values,page:page,pageSize:30}})
          }
      });
  }
  updateEventStatus(id,status){
      const { fetchData } = this.props;
      this.props.dispatch({type: 'feedback/updateEventStatus',data:{id,status}})
      setTimeout(()=>{
          this.getFeedbackList()
      },1000)
  }
  deldteEventStatus(id){
      const { fetchData } = this.props;
      this.props.dispatch({type: 'feedback/deldteEventStatus',data:{id}})
      setTimeout(()=>{
          this.getFeedbackList()
      },1000)
  }
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
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
            align : 'center'
        },
        {
            title: '反馈类型',
            dataIndex: 'feedBackType',
            key: 'feedBackType',
            align : 'center',
            render : (status,record,index) => <div>
            {record.feedBackType===1?'意见反馈':'开票'}
            </div>,
        },
        {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
            align : 'center'
        },
        {
            title: '提交日期',
            dataIndex: 'addTime',
            key: 'addTime',
            align : 'center'
        },
        {
            title: '关联订单',
            dataIndex: 'contactNo5',
            key: 'contactNo5',
            align : 'center'
        },
        {
            title: '处理状态',
            dataIndex: 'statusStr',
            key: 'statusStr',
            align : 'center'
        },
        {
            title: '处理时间',
            dataIndex: 'contactNo3',
            key: 'contactNo3',
            align : 'center'
        },
        {
            title: '操作',
            render : (status,record,index) => <div>
                {
                    record.status===0? <div>
                     <Popconfirm title="再次确认更改状态为处理完成" onConfirm={this.updateEventStatus.bind(this,record.id,1)} okText="确认" cancelText="取消">
                        <a className="text-btn" href="javascript:;">处理完成</a>
                     </Popconfirm>
                     <Popconfirm title="是否删除?" onConfirm={this.deldteEventStatus.bind(this,record.id)} okText="确认" cancelText="取消">
                        <a className="text-btn" href="javascript:;">删除</a>
                     </Popconfirm>
                     </div>
                     : <div><Popconfirm title="是否删除?" onConfirm={this.deldteEventStatus.bind(this,record.id)} okText="确认" cancelText="取消">
                        <a className="text-btn" href="javascript:;">删除</a>
                     </Popconfirm>
                    </div>
                }
            </div>,
            align : 'center'
        },
    ];
    const pagination = {
      total:this.props.feedback.total,
      pageSize: 30,
      onChange :  (page) => {
          this.getFeedbackList(page);
      }
    };
    return (<PageHeaderWrapper>
      <Card title="反馈管理" className={styles.card} bordered={false}>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
                <Form.Item label="反馈类型">
                {getFieldDecorator('feedBackType', {
                    initialValue : -1
                })(
                    <Select
                      >
                        <Option key={1} value={-1}>全部</Option>
                        <Option key={2} value={1}>意见反馈</Option>
                        <Option key={3} value={2}>开票</Option>
                     </Select>
                )}
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
              <Form.Item label="处理状态">
                  {getFieldDecorator('status', {
                      initialValue : -1
                  })(
                      <Select
                        >
                          <Option key={1} value={-1}>全部</Option>
                          <Option key={2} value={1}>已处理</Option>
                          <Option key={3} value={0}>未处理</Option>
                       </Select>
                  )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="提交日期">
                {
                  getFieldDecorator('addDate', {
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
                  <Form.Item  label='&nbsp;'>
                      <Button type="primary" onClick={this.getFeedbackList.bind(this,1)} loading={this.props.getFeedbackListLoading} style={{marginRight:'15px'}}>查询</Button>
                  </Form.Item>
              </Col>
          </Row>
        </Form>
        <Row>
            <Col>
                <Table
                    title={()=><div style={{display:'flex',justifyContent: 'space-between',alignItems: 'center'}}><h3>订单列表 <span style={{fontSize:'12px'}}>共有{this.props.feedback.total}条数据</span></h3></div>}
                    pagination={pagination}
                    bordered
                    columns={columns}
                    dataSource={this.props.feedback.feedBackList}
                    rowKey={record => record.id}
                    loading={this.props.getFeedbackListLoading}
                    />
            </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>);
  }
}

export default Index;
