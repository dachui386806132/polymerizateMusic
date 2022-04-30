<template>
  <footer class="footer-container">
    <div class="footer-w">
      <div class="top-link">
        <ul class="head-list">
          <li class="bottom-text">
            <p>下载QQ音乐客户端</p>
            <ul>
              <li><i class="iconfont">&#xe882;</i><span>PC版</span></li>
              <li><i class="iconfont">&#xe689;</i><span>MAC版</span></li>
              <li><i class="iconfont">&#xe669;</i><span>安卓版</span></li>
              <li><i class="iconfont">&#xe63d;</i><span>苹果版</span></li>
            </ul>

          </li>
          <li class="bottom-text">
            <p>特色产品</p>
            <ul>
              <li><i class="iconfont">&#xe626;</i><span>聚合物K歌</span></li>
              <li><i class="iconfont">&#xe633;</i><span>DC调</span></li>
              <li><i class="iconfont">&#xe6a2;</i><span>Rfq</span></li>
              <li><i class="iconfont">&#xe67d;</i><span>DC播</span></li>
            </ul>
          </li>
          <li class="bottom-link">
            <p>合作链接</p>
            <ul>
              <li><a>CJ ENM</a></li>
              <li><a>腾讯视频</a></li>
              <li><a>手机便间</a></li>
              <li><a>最新版便</a></li>
              <li><a>便讯社交广告</a></li>
              <li><a>电脑管家</a></li>
              <li><a>DC之浏览器</a></li>
              <li><a>DC之云</a></li>
              <li><a>DCFM</a></li>
              <li><a>智能电视网</a></li>
              <li><a>当贝市场</a></li>
              <li><a>酷我音乐</a></li>
              <li><a>酷狗听书</a></li>
            </ul>
          </li>
          <li class="bottom-link mar-top">
            <p>开放平台</p>
            <ul>
              <li><a>DC 聚合物开放平台</a></li>
              <li><a>DC音乐人</a></li>
              <li><a>音乐推</a></li>
            </ul>
          </li>
          <li class="bottom-link end-link mar-top">
            <p>DC集团</p>
            <ul>
              <li><a>聚合物音乐</a></li>
            </ul>
          </li>
        </ul>
        <div>

        </div>

      </div>
      <div>
        <div class="footer_copyright">
          <p><a href="http://www.tencent.com/" rel="noopener noreferrer" target="_blank" title="关于腾讯">关于聚合物</a>
            <!-- -->|<a href="http://www.tencent.com/index_e.shtml" rel="noopener noreferrer" target="_blank" title="About Tencent">About Tencent</a> <!-- -->|<a href="http://www.qq.com/contract.shtml" rel="noopener noreferrer" target="_blank" title="服务条款">服务条款</a> <!-- -->|<a href="http://y.qq.com/y/static/tips/service_tips.html" rel="noopener noreferrer" target="_blank" title="用户服务协议">用户服务协议</a>
            <!-- -->|<a href="https://y.qq.com/m/client/intro/privacy.html" rel="noopener noreferrer" target="_blank" title="隐私政策">隐私政策</a> <!-- -->|<a href="https://y.qq.com/vip/right_declare/index.html" rel="noopener noreferrer" target="_blank" title="权利声明">权利声明</a> <!-- -->|<a href="http://www.tencentmind.com/" rel="noopener noreferrer" target="_blank" title="广告服务">广告服务</a> <!-- -->|
            <a href="http://hr.tencent.com/" rel="noopener noreferrer" target="_blank" title="腾讯招聘">聚合物招聘</a> <!-- -->|<a href="https://y.qq.com/m/client/helper/pc.html" rel="noopener noreferrer" target="_blank" title="客服中心">客服中心</a> <!-- -->|
            <a href="http://www.qq.com/map/" rel="noopener noreferrer" target="_blank" title="网站导航">网站导航</a></p><p>Copyright © 1998 - <!-- -->2021<!-- --> Tencent.<!-- -->
          <a target="_blank" rel="noopener noreferrer" href="http://www.tencent.com/en-us/le/copyrightstatement.shtml" title="All Rights Reserved.">All Rights Reserved.</a></p><p>大便公司<!-- -->
          <a target="_blank" href="http://www.tencent.com/zh-cn/le/copyrightstatement.shtml" rel="noopener noreferrer" title="版权所有">版权所有</a>｜
          <a target="_blank" href="https://y.qq.com/music/common/upload/t_cm3_photo_publish/4055034.jpg" rel="noopener noreferrer" title="营业执照">营业执照</a>｜
          <!-- -->网络文化经营许可证：<a target="_blank" href="https://y.qq.com/music/common/upload/t_cm3_photo_publish/4043272.jpg" rel="noopener noreferrer" title="粤网文[2020]3396-195号">粤网文[2020]3396-195号</a></p>

        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name:'Footer',
  data(){
    return{

    }
  }
}
</script>

<style lang="less">
.footer-container{
  width:100%;
  background-color: #333333;
}
.bottom-text{
  color: rgb(153,153,153);
  p{
    font-size: 15px;
    margin-bottom: 35px;
  }
  ul{
    display: flex;

    li{
      cursor: pointer;
      margin-right: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      flex-direction: column;
      i{
        font-size: 45px;
      }
      span{
        font-size: 15px;
      }
    }
    li:hover>i{
      color: rgb(49,194,124);

    }
    li:hover>span{
      color: rgb(49,194,124);

    }
  }

}
.head-list{
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  &>li{
    display: inline-block;
    margin-right: 60px;

  }

}
.footer-w{
  margin: 0 auto;
  width: 80%;
  padding-top: 70px;
}
.bottom-link{
  margin-right: 0px!important;
  p{
    color: rgb(153,153,153);
  }
  ul{
    width: 340px;
    li{
      display: inline-block;
      margin-right: 20px;
      margin-top: 15px;
      a{
        color:rgb(153,153,153);
        cursor:pointer ;

      }
      a:hover{
        color: rgb(49,194,124);
      }
    }
  }

}
.end-link{
  margin-left: 91px;
}
.top-link{
  border-bottom: 1px solid rgb(53,53,53);
  padding-bottom: 45px;
  margin-bottom: 20px;
}
.mar-top{
  margin-top: 55px;
}
.footer_copyright{
  padding-bottom: 40px;
  p{
    text-align: center;
    color: rgb(127,127,127);
    font-size: 13px;
    margin-top: 10px;
  }
  a{
    font-size: 13px;
    text-decoration: none;
    color: rgb(127,127,127);
  }
  a:hover{
    color: rgb(49,195,124);

  }
}
</style>
