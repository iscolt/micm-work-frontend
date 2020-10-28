<template>
  <div>
    <el-dialog title="提交统计" :width="isMobile ? '95%' : '50%'" :visible.sync="visible">
      <el-tabs v-model="activeName" style="margin-top: -20px">
        <el-tab-pane label="提交列表" name="first">
          <el-select v-model="status" :value-key="status" placeholder="请选择" @change="handleSelect">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="已提交" value="1"></el-option>
            <el-option label="未提交" value="0"></el-option>
          </el-select> &nbsp;
          <el-button type="primary">上报</el-button>
          <el-table
              :data="data">
            <el-table-column label="学号" width="150">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.student.number }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" width="150" v-if="!isMobile">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.student.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="附件名" width="300" v-if="!isMobile">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.resource }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="150">
              <template slot-scope="scope">
                <el-tag
                    :type="scope.row.status === 0 ? 'danger' : 'success'"
                    @click="handleChangeStatus(scope.row)">{{scope.row.status === 0 ? '未提交' : '已提交'}}</el-tag>
                <span style="margin-left: 10px">{{  }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="作业统计" name="second">
          <div id="myChart1" :style="{ height: '300px'}">.
            <img src="./11.png" width="90%"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts';


export default {
  name: "index",
  data() {
    return {
      isMobile: this.isMobile(),
      status: '',
      activeName: 'first',
    }
  },
  updated() {
    let myChart = echarts.init(document.getElementById("myChart"));
    console.log(myChart,this.updateTimes)
    myChart.setOption({
      title: {
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        top: 'bottom',
        data: ['已提交', '未提交']
      },
      toolbox: {
        show: true,
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
          magicType: {
            show: true,
            type: ['pie', 'funnel']
          },
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      series: [
        {
          name: '作业提交统计',
          type: 'pie',
          radius: [30, 110],
          center: ['50%', '50%'],
          roseType: 'area',
          data: [
            {value: 10, name: '已提交'},
            {value: 5, name: '未提交'},
          ]
        }
      ]
    })
  },
  methods: {
    handleChangeStatus(data) {
      this.changeStatus(data)
    },
    handleSelect(val) {
      this.changeData(this.homework, val)
    }
  },
  props: {
    visible: Boolean,
    data: Array,
    homework: Object,
    changeStatus: Function,
    changeData: Function
  }
}
</script>

<style scoped>

</style>
