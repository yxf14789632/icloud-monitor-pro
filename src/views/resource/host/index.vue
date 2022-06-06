<template>
  <div class="app-container" style="background: #fff">
    <div style="padding: 12px">
      <!-- 搜索表单 -->
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item>
          <el-button type="success" :icon="Plus" @click="handleAdd"
            >新增</el-button
          >
          <el-button
            type="danger"
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
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="序号"
            type="index"
            width="55"
            align="center"
          />
          <el-table-column label="客户端ID" prop="clientId" width="200" />
          <el-table-column label="客户端密钥" prop="clientSecret" width="100" />
          <el-table-column label="域" width="100" prop="scope" />
          <el-table-column label="自动放行" prop="autoapprove" width="100" />
          <el-table-column label="授权方式" prop="authorizedGrantTypes" />
          <el-table-column
            label="认证令牌时效(单位：秒)"
            width="200"
            prop="accessTokenValidity"
          />
          <el-table-column
            label="刷新令牌时效(单位：秒)"
            width="200"
            prop="refreshTokenValidity"
          />
          <el-table-column label="操作" align="center" width="120">
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
        <pagination
          v-if="total > 0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="handleQuery"
        />
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElForm } from 'element-plus'
import { reactive, ref, toRefs } from 'vue'
import { Search, Plus, Edit, Refresh, Delete } from '@element-plus/icons-vue'

const queryFormRef = ref(ElForm)

const state = reactive({
  // 总条数
  total: 0,
  // 遮罩层
  loading: true,
  multiple: true,
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

function handleQuery() {}

function handleSelectionChange(row: { [key: string]: any }) {}
</script>
