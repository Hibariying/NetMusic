<template>
  <div>
    <van-search shape="round" v-model="value" placeholder="请输入搜索关键词" @input="inputFn"/>
    <div class="search_wrap" v-if="resultList.length===0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <span class="hot_item" v-for="(item,index) in hotList" :key="index" @click="fn(item.first)">{{item.first}}</span>
      </div>

    </div>
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <SongItem v-for="obj in resultList"
      :key="obj.id"
      :name="obj.name"
      :author="obj.ar[0].name"
      :id="obj.id"
      ></SongItem>
</van-list>
    </div>
  </div>
</template>

<script>
import {hotItemAPI,searchResultListAPI} from '@/api'
import SongItem from '@/components/SongItem'
export default {
  components:{
    SongItem
  },
  data(){
    return{
      value:'',
      hotList:[],
      resultList:[],
      loading:false,//只有为false时，才会自动触发onload方法
      finished:false,//如果设置为true，则底部不会执行onload，代表全部加载完成
      page:1,
      timer:null
    }
  },
  async created() {
     const res = await hotItemAPI()
     this.hotList=res.data.result.hots
  },
  methods:{
    async fn(val){
      this.page=1
      this.finished=false
      // async 修饰的函数->默认返回一个全新的promise对象
      this.value = val
      const res = await this.getListFn()
      this.resultList = res.data.result.songs
      this.loading=false
    },
    async getListFn(){
      return await searchResultListAPI({
        keywords:this.value,
        limit:20,
        offset:(this.page-1)*20//固定公式
      })
    },
    async inputFn(){
      if(this.timer)
      this.timer = setTimeout(async()=>{
        this.page=1
      this.finished=false

      if(this.value.length===0){
        this.resultList=[]
        return
      }
      const res = await this.getListFn()
      if(res.data.result.songs===undefined){
        this.resultList=[]
        return
      }
      this.resultList = res.data.result.songs
      this.loading=false
      },200)


    },
    async onLoad(){//加载下一页，内部自动将loading改为true
        this.page++
        const res = await this.getListFn()
        if(res.data.result.songs===undefined){
          this.loading=false
          this.finished=true
          return
      }
        this.resultList = [...this.resultList,...res.data.result.songs]
        this.loading = false
    }
  },

}
</script>

<style scoped>
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
van-search{
  border-bottom: 1px solid lightgray;
}
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>