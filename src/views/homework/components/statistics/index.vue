<template>
  <div>
    <el-dialog title="提交统计" :width="isMobile ? '95%' : '50%'" :visible.sync="visible">
      <el-select v-model="status" placeholder="请选择" @change="handleSelect">
        <el-option label="全部" value="-1"></el-option>
        <el-option label="已提交" value="1"></el-option>
        <el-option label="未提交" value="0"></el-option>
      </el-select>
      &nbsp;
<!--      <el-button-->
<!--          type="primary">上报</el-button>-->
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
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      isMobile: this.isMobile(),
      status: -1,
    }
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
