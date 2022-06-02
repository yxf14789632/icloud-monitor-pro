import request from '@/utils/request'

/**
 * 获取角色列表
 *
 * @param queryParams
 */
export function listRoles(queryParams?: any) {
  return request({
    url: '/api/v1/roles',
    params: queryParams
  })
}

/**
 * 获取角色分页列表
 *
 * @param queryParams
 */
export function listRolesWithPage(queryParams: any) {
  return request({
    url: '/api/v1/roles/page',
    method: 'get',
    params: queryParams
  })
}

/**
 * 获取角色详情
 *
 * @param id
 */
export function getRoleDetail(id: any) {
  return request({
    url: '/api/v1/roles/' + id,
    method: 'get'
  })
}

/**
 * 添加角色
 *
 * @param data
 */
export function addRole(data: any) {
  return request({
    url: '/api/v1/roles',
    method: 'post',
    data: data
  })
}

/**
 * 更新角色
 *
 * @param id
 * @param data
 */
export function updateRole(id: number, data: any) {
  return request({
    url: '/api/v1/roles/' + id,
    method: 'put',
    data: data
  })
}

/**
 * 批量删除角色，多个以英文逗号(,)分割
 *
 * @param ids
 */
export function deleteRoles(ids: string) {
  return request({
    url: '/api/v1/roles/' + ids,
    method: 'delete'
  })
}

/**
 * 获取角色的菜单列表
 *
 * @param roleId
 */
export function listRoleMenuIds(roleId: number) {
  return request({
    url: '/api/v1/roles/' + roleId + '/menus',
    method: 'get'
  })
}

/**
 * 修改角色的菜单
 *
 * @param roleId
 * @param menuIds
 */
export function updateRoleMenu(roleId: number, menuIds: Array<number>) {
  return request({
    url: '/api/v1/roles/' + roleId + '/menus',
    method: 'put',
    data: { menuIds: menuIds }
  })
}

/**
 * 获取角色的权限列表
 *
 * @param roleId
 */
export function listRolePerms(roleId: number, menuId: number) {
  return request({
    url: '/api/v1/roles/' + roleId + '/permissions',
    method: 'get',
    params: { menuId: menuId }
  })
}

/**
 * 保存角色权限
 *
 * @param menuId 菜单ID，归类权限
 * @param roleId
 * @param permIds
 */
export function saveRolePerms(
  roleId: number,
  menuId: number,
  permIds: Array<number>
) {
  return request({
    url: '/api/v1/roles/' + roleId + '/permissions',
    method: 'put',
    data: { menuId: menuId, permissionIds: permIds }
  })
}
