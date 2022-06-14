<template>
  <div class="app-container" style="background: #fff">
    <div style="padding: 12px">
      <!-- 搜索表单 -->
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item>
          <el-button type="success" size="mini" :icon="Plus" @click="handleAdd"
            >新增</el-button
          >
          <el-button
            type="danger"
            size="mini"
            :icon="Delete"
            :disabled="multiple"
            @click="handleDelete"
            >删除</el-button
          >
        </el-form-item>

        <!-- 数据表格 -->
        <el-table
          v-loading="loading"
          :data="clientList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="序号"
            type="index"
            width="55"
            prop="id"
            v-if="false"
            hidden="hidden"
            align="center"
          />
          <el-table-column label="资产编号" prop="assetNum" width="180" />
          <el-table-column label="机器IP" prop="ip" width="120" />
          <el-table-column label="机器状态" prop="status" width="100">
            <template #default="scope">
              <el-tag
                :type="scope.row.status === 1 ? 'success' : 'error'"
                close-transition
                >{{ scope.row.status === 1 ? '在线' : '离线' }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="监控" width="100">
            <template #default="scope">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="查看监控"
                placement="bottom-start"
              >
                <el-icon
                  class="ims-monitor-icon"
                  @click.stop="showDetailMonitor(scope.row)"
                  ><Histogram
                /></el-icon>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="所属机房" prop="machineRoom" width="150" />
          <el-table-column
            label="所属机柜"
            prop="cabinet"
            align="center"
            width="100"
          />
          <el-table-column label="CPU" prop="cpu" width="150">
            <template #default="scope">
              {{ scope.row.usedCpu + '/' + scope.row.totalCpu }}
            </template>
          </el-table-column>
          <el-table-column label="内存" prop="mem" width="150">
            <template #default="scope">
              {{ scope.row.usedMem + '/' + scope.row.totalMem }}
            </template>
          </el-table-column>
          <el-table-column label="标签" prop="tags">
            <template #default="scope">
              <el-tag
                class="labelTag"
                v-for="(value, index) in scope.row.tags"
                :key="index"
                >{{ `${value}` }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template #default="scope">
              <el-button
                type="primary"
                :icon="Edit"
                circle
                plain
                @click.stop="handleUpdate(scope.row)"
              />
              <el-button
                type="danger"
                :icon="Delete"
                circle
                plain
                @click.stop="handleDelete(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页工具条 -->
        <div class="pagination-container">
          <el-pagination
            small
            :hide-on-single-page="total > 0"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            v-model:currentPage="queryParams.pageNum"
            v-model:page-size="queryParams.pageSize"
            @size-change="handleQuery"
            @current-change="handleQuery"
            @prev-click="handleQuery"
            @next-click="handleQuery"
          />
        </div>
      </el-form>
    </div>

    <div class="ims-drawer-div">
      <el-drawer
        custom-class="ims-drawer"
        v-model="state.drawer"
        :show-close="false"
        size="50%"
        :modal="false"
        modal-class="ims-drawer-modal"
        :lock-scroll="false"
      >
        <template #header="{ close }">
          <!-- 机器资产名称和tag-->
          <div>
            <div style="font-size: 16px; font-weight: 600; color: #184e7f">
              {{ state.drawerRow.assetNum }}
              <div
                style="
                  position: absolute;
                  top: 10px;
                  right: 10px;
                  line-height: 30px;
                  cursor: pointer;
                "
              >
                <el-icon @click="close"><Close /></el-icon>
                <el-button class="ims-monitor-setting-btn">设置告警</el-button>
                <el-button class="ims-key-setmonitor-btn" type="primary"
                  >一键告警</el-button
                >
              </div>
            </div>
            <div style="margin-top: 4px; font-size: 12px">
              {{ state.drawerRow.ip }}
              <el-tag
                class="labelTag"
                v-for="(value, index) in state.drawerRow.tags"
                :key="index"
                >{{ `${value}` }}</el-tag
              >
            </div>
            <el-divider />
          </div>
        </template>

        This is drawer content.
      </el-drawer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElForm } from 'element-plus'
import { onMounted, reactive, ref, toRefs } from 'vue'
import {
  Search,
  Plus,
  Edit,
  Refresh,
  Delete,
  Histogram
} from '@element-plus/icons-vue'
import { Host } from '@/types/index'
import { ElButton, ElDrawer } from 'element-plus'
import { listMachineWithPage } from '@/service/resource/hosts'

const queryFormRef = ref(ElForm)

// const drawer = ref(false)

const state = reactive({
  // 总条数
  total: 0,
  // 选中数组
  ids: [],
  // 非单个禁用
  single: true,
  // 非多个禁用
  multiple: true,
  // 遮罩层
  loading: true,

  drawerRow: {} as Host,

  drawer: false,

  clientList: [],
  queryParams: {
    pageNum: 1,
    pageSize: 10
  }
})

const { total, loading, clientList, multiple, queryParams } = toRefs(state)

function handleAdd() {}

function handleDelete(row: { [key: string]: any }) {}

function handleUpdate(row: { [key: string]: any }) {}

function handleQuery() {
  state.loading = true
  console.log(state.queryParams)
  listMachineWithPage(state.queryParams).then((response) => {
    const { data, total } = response as any
    state.clientList = data
    state.total = total
    state.loading = false
  })
}

function handleSelectionChange(selection: any) {
  state.ids = selection.map((item: any) => item.id)
  state.single = selection.length !== 1
  state.multiple = !selection.length
}

const handleClose = (done: () => void) => {
  done()
}

const showDetailMonitor = (row: any) => {
  state.drawer = false
  state.drawerRow = row
  state.drawer = true
  // 获取机器的基础监控指标和关联的服务指标
}

onMounted(() => {
  handleQuery()
  //点击其他元素 关闭drawer
  document.addEventListener('click', (e) => {
    state.drawer = false
  })
})
</script>

<style lang="less" scoped>
.labelTag {
  margin-right: 6px;
  margin-top: 2px;
  margin-bottom: 2px;
}

.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}

.ims-monitor-icon {
  cursor: pointer;
}

.ims-monitor-icon :hover {
  color: #409eff;
}
.ims-monitor-setting-btn {
  background-color: #ffffff;
  position: fixed;
  right: 40px;
  height: 30px;
  top: 0px;
  display: block;
  margin-top: 7px;
  font-size: 12px;
}

.ims-key-setmonitor-btn {
  display: block;
  position: fixed;
  right: 130px;
  height: 30px;
  top: 0px;
  margin-top: 7px;
  font-size: 12px;
}

.ims-drawer-div {
  border-left: 1px solid #ddd;
  box-shadow: -3px 0 3px 0 #4949571f;
}

/deep/ .ims-drawer-modal {
  position: relative !important;
  z-index: 0;
}

/deep/ .ims-drawer {
  width: 50%;
  z-index: 3010;
  position: fixed;
}

/deep/ .el-drawer__header {
  margin-bottom: 0px;
}
</style>
