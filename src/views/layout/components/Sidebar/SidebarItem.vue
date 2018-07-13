<template>
  <div class="menu-wrapper">
    <!-- <template v-for="item in routes" >
      <template v-for="child in item.children" v-if="item.children  && item.children.length > 0">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
          <router-link v-else :to="item.id" :key="child.name">
            <el-menu-item :index="item.id">
              <span  slot="title">{{child.name}}</span>
            </el-menu-item>
          </router-link>
      </template>
      <el-submenu  :index="item.href" :key="item.name" v-else>
        <template slot="title">
          <span  slot="title">{{item.name}}</span>
        </template>
      </el-submenu>
    </template> -->
    <div v-for="item in routes" :key="item.name">
      <el-submenu :index="item.id" v-if="item.children  && item.children.length > 0">
          <template slot="title">
              <i class="el-icon-caret-right"></i>
              <span>{{ item.name }}</span>
          </template>
          <sidebar-item :routes="item.children"></sidebar-item>
      </el-submenu>
      <el-menu-item :index="item.href" v-else>
              <template slot="title">
              <i class="el-icon-caret-right"></i>
              <span>{{ item.name}}</span>
          </template>
      </el-menu-item>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    }
  }
}
</script>
