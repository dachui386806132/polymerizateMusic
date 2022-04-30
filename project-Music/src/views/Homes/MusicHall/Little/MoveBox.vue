<template>
  <div class="move-box-container" ref="moveMain">
    <i class="iconfont left_btn" ref="leftBtn" @click="sideChangePge(-1)" v-if="page!==1">&#xe645;</i>
    <i class="iconfont right_btn"  ref="rightBtn" @click="sideChangePge(+1)"  v-if="page!==1">&#xe646;</i>
    <!--标题-->
    <div class="move-title" :title="title" ref="moveTitle"></div>
    <!--标题导航栏-->
    <slot name="titleBtn"></slot>
    <!--中间内容信息-->
    <div class="move_center" ref="center">
      <div  class="move_center_son" ref="centerSon">
        <slot name="center"></slot>
      </div>
    </div>
    <!--底部选择按钮-->
    <div class="move_bottom" ref="moveBottom">

    </div>

  </div>
</template>

<script>

export default {
  props: {
    title:{
      type:String,
      default: ''
    },
    page:{
      type:Number,
      default: 1
    },
    type:{
      type:Number,
      default: 0
    },
    pageType:{
      type:String,
      default: ''
    }

  },
  name:'MoveBox',
  data(){
    return{
      // 现在的页数
      myPage:1
    }
  },
  created() {
  },
  mounted() {
    this.setBackGroundPosition()
    if (this.page!==1){
      this.setTop()
      this.setBottomBtn()
    }
  },
  methods:{
    // 根据主盒子高度,设置左右切换按钮的top值高度
    setTop(){
      setTimeout(()=>{
        let h = this.$refs.moveMain.offsetHeight
        let lh = this.$refs.leftBtn.offsetHeight
        let rh = this.$refs.rightBtn.offsetHeight
        this.$refs.leftBtn.style.top = (h - lh)/2 + 'px'
        this.$refs.rightBtn.style.top = (h - rh)/2 + 'px'
      },1000)
    },
    setBackGroundPosition(){
      this.$refs.moveTitle.style.backgroundPosition=`0 -${(this.type-1)*50}px`
    },
    // 根据父组件传过来的页数,设置底部按钮的个数。绑定事件
    setBottomBtn(){
      let bottom = this.$refs.moveBottom
      while(bottom.hasChildNodes()) //当table下还存在子节点时 循环继续
      {
        bottom.removeChild(bottom.firstChild);
      }
      bottom.style.width = this.page * 32 +'px'
      for (let i = 0; i < this.page; i++) {
        let btn = document.createElement('div')
        let btnFather = document.createElement('div')
        btnFather.className = 'bottom_btn_item_box'+this.type
        btnFather.style.padding = '5px 12px 30px 12px'
        btnFather.style.cursor = 'pointer'
        btnFather.addEventListener('mouseover',()=>{
          btn.style.backgroundColor = '#AFAFAF'
        })
        btnFather.addEventListener('mouseout',() =>{
          if (btn.getAttribute('id')!=='click'+this.type){
            btn.style.backgroundColor = '#E1E1E1'
          }

        })
        btnFather.addEventListener('click',(e)=>{
          this.myPage = i+1
          this.$refs.centerSon.style.marginLeft =- (i * this.$refs.center.offsetWidth) +'px'
          let item = document.querySelectorAll(`.bottom_btn_item${this.type}`)
          for (let j = 0; j < item.length; j++) {
            item[j].setAttribute('id','')
            item[j].style.backgroundColor = '#E1E1E1'
          }
          this.$nextTick(()=>{
            if ( e.target.querySelector(`.bottom_btn_item${this.type}`)){
              e.target.querySelector(`.bottom_btn_item${this.type}`).style.backgroundColor = '#AFAFAF'
              e.target.querySelector(`.bottom_btn_item${this.type}`).setAttribute('id','click'+this.type)
            }else {
              e.target.style.backgroundColor = '#AFAFAF'
              e.target.setAttribute('id','click'+this.type)
            }

          })
        })
        btn.className = 'bottom_btn_item'+this.type
        btn.style.width = '8px'
        btn.style.height = '8px'
        btn.style.backgroundColor = '#E1E1E1'
        btn.style.borderRadius = '100%'
        btnFather.appendChild(btn)
        bottom.appendChild(btnFather)
        this.$nextTick(()=>{
          if (i===0){
            btnFather.click()
          }
        })
      }
    },
    // 给左右两边按钮设置点击事件
    sideChangePge(num){
      let btns = document.querySelectorAll(`.bottom_btn_item_box${this.type}`)
      this.myPage += num
      if (this.myPage<1)this.myPage = this.page
      if (this.myPage>this.page)this.myPage = 1
      btns[this.myPage-1].click()
    },
    // 切换页数
    changePage(page){
      let btns = document.querySelectorAll(`.bottom_btn_item_box${this.type}`)
      btns[page-1].click()
    }
  },
  watch:{
    pageType:{
      handler(newVal,oldVal){
        if (newVal!==oldVal&&this.page!==1){
          this.changePage(1)
        }
      }
    },
    page:{
      handler(newVal,oldVal){
        if (newVal!==oldVal){
          this.setBottomBtn()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.leftRight(){
  position: absolute;
  display: block;
  height: 120px;
  width: 80px;
  line-height: 120px;
  text-align: center;
  font-size: 70px!important;
  cursor: pointer;
  color: #333333;
  background-color: #EEEEEE;
  transition: all .5s ease;
  user-select: none;
  &:hover{
    background-color: #E1E1E1;
  }
}
.move-box-container{
  padding-top: 40px;
  background: linear-gradient(#F2F2F2,#FAFAFA);
  .move-title{
    display: block;
    margin:0 auto 20px auto;
    width: 196px;
    height: 40px;
    font-size: 30px;
    font-weight: 600;
    background-image: url("../../../../assets/img/index_tit.png");
    background-size: 100% ;
  }
  .move_center{
    width: 1200px;
    margin: auto;
    overflow: hidden;
    .move_center_son{
      transition: all .4s ease;
    }
  }
  .move_bottom{
    display: flex;
    margin:20px auto 5px auto;
  }
}
.move-box-container{
  position: relative;
  .left_btn{
    .leftRight();
    left: -80px;
  }
  .right_btn{
    .leftRight();
    right: -80px;

  }
  &:hover{
    .left_btn{
      left: 0;
    }
    .right_btn{
      right:0;
    }
  }
}



</style>
