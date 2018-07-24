<template>
  <div class="app-wrapper" :class="classObj">
    <tab-header class="app-header">
        <el-row type="flex" class="row-bg" style="height:100%;" justify="space-between">
          <el-col :span="8">
            <div class="logo">
            </div>
          </el-col>
          <el-col :span="8">
            <div class="nameBox" style="height:100%;color:#fff">
                <div class="name">{{ name }}</div>
                <el-dropdown>
                  <span class="el-dropdown-link" style="color:#fff">
                      {{ curRole }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(item,index) in roles " :key="item.id" ><div @click.prevent="roleChange($event, index, item)">{{item.name}}</div></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown class="avatar-container" trigger="click">
                  <div class="avatar-wrapper">
                    <img class="userImg" :src="photo">
                    <i class="el-icon-caret-bottom"></i>
                  </div>
                  <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <el-dropdown-item><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </div>
          </el-col>
        </el-row>
    </tab-header>
    <div class="app-content">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
        <sidebar class="sidebar-container"></sidebar>
         <div class="main-container">
            <navbar></navbar>
            <app-main></app-main>
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain, TabHeader } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import imgFile from '@/api/commonFile.js'
import defauImg from '@/assets/default.png'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TabHeader
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ]),
    photo () {
      let url = this.defauImg
      if(this.avatar){
        url = imgFile.getCommonShowUrl(this.avatar)
      }
      return url
    }
  },
  data () {
    return {
      curRole:'',
      defauImg:defauImg
    }
  },
  mounted () {
    this.curRole = this.roles[0].name
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    roleChange (event, index, item) {
      this.$store.dispatch('ChangeRole',{roleid: item.id}).then(res =>{
        this.curRole = res.name
      })
    },
    logout () {
      this.$confirm('是否确定退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>{
          this.$store.dispatch('LogOut').then(() =>{
            this.$router.push('login')
          })
        }).catch(() =>{
          console.log('222')
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction:column;
  }
  .app-content{
    flex:1;
    background:#eee;
    display:flex;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .userImg{
    width:50px;
    height:50px;
    border-radius:50%;
  }

  // 头部右侧样式
  .nameBox{
     display:flex;
     align-items:center;
     justify-content:flex-end;
     padding-right:30px;
     .name{
       padding-right:5px;
     }
  }
</style>
