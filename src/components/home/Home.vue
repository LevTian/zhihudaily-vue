<template>
    <div>
        <HomeHeader :title="title"></HomeHeader>
        <div class="box" ref="wrapper"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @scroll.native="handleScroll">
            <!-- <div class="bscroll-container"> -->
                <p class="top-tip" v-show="notesShow">松开刷新</p>
                <HomeSwiper :top_stories="top_stories"></HomeSwiper>
                <HomeNewsList :stories="stories"></HomeNewsList>
                <div class="load iconfont" @click="loadMore">&#xe69c;</div>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll"
import HomeHeader from "./Header.vue"
import HomeSwiper from "./Swiper.vue"
import HomeNewsList from "./NewsList.vue"
export default {
    name: "Home",
    components: {
        HomeHeader,
        HomeSwiper,
        HomeNewsList
    },
    data() {
        return {
            top_stories: [],
            stories: [],
            title: "首页",
            pulldownMsg: "下拉刷新",
            tartY: 0,
            touching: false,
            top: 0,
            state: 0,
            notesShow: false,
            toDate: null,

        }
    },
    methods: {
        getStories() {
            this.$axios.get("/api/news/latest")
            .then(this.getStoriesSucc)
            .catch(error => {
                console.log(error);
            })
        },
        getStoriesSucc(res) {
            if (res.status == 200 && res.data) {
                res = res.data;
                this.top_stories = res.top_stories;
                // this.stories["today"] = res.stories;
                // this.$set(this.stories, "today", res.stories);
                if (this.stories) {     //如果有值替换第一个值splice(0, 1, res)，第一个参数删除的起始位置
                    this.stories.splice(0, 1, res);        //第二个参数，删除的个数，第三个插入的值
                } else {
                    this.stories.push(res);
                }
                
            }  
        },
        forTwo(num) {
            return num > 9 ? num : "0" + num;
        },
        loadMoreSucc(res) {
            if (res.status == 200 && res.data) {
                res = res.data;
                // this.stories[res.date] = res.stories;
                // this.$set(this.stories, res.date, res.stories);
                this.stories.push(res);     //需要用push不能直接用数组下标，vue无法监测到数组的变化
            } 
        },
        loadMore() {
            var year = this.toDate.getFullYear();
            var month = this.toDate.getMonth() + 1;  //月份从0开始计数
            // var day = this.forTwo(to.getDay());      //  getDay是星期
            var day = this.toDate.getDate();
            var str = year + "" + this.forTwo(month) + "" + this.forTwo(day);
            this.$axios.get("/api/news/before/" + str)
            .then(this.loadMoreSucc)
            .catch(error => {
                console.log(error);
            })
            // this.toDate = this.toDate.getTime() - 24*60*60*1000;     //第二次是毫秒值无法使用getTime
            // this.toDate = this.toDate.getDate() - 1;
            // this.toDate.setDate(this.toDate.getDate() - 1);
            this.toDate = this.toDate - 24*60*60*1000;      //由于api是获取前一天的消息，所以先使用了再减一
            this.toDate = new Date(this.toDate);
            // var to = new Date();
            // to.setTime(this.toDate);
            
        },
        handleTouchStart(e) {
            this.startY = e.targetTouches[0].pageY;
            this.touching = true;
        },
        handleTouchMove(e) {
            if (!this.touching) return;
            let diff = e.targetTouches[0].pageY - this.startY; 
            if (diff < 0) return;   //下滑不做判断
            this.top = Math.floor(Math.abs(diff)*0.5) + (this.state === 2 ? 40 : 0);
            if (this.top >= 40) {
                this.state = 1;   //代表正在拉取
            } else {
                this.state = 0;  // 代表初始转态
            }
        },
        handleTouchEnd(e) {
            this.touching = false;
            if (this.state === 2) {
                this.top = 40;
                return;
            }
            // 判断抬起时的高度，是大于40 就开启刷新
　　　　　　if (this.top >= 40) {
　　　　　　　　this.refresh();
　　　　　　} else {
　　　　　　　　this.state = 0;
　　　　　　　　this.top = 0;
　　　　　　}
        },
        handleScroll(e) {
            console.log("scroll")
            for (item in e) {
                console.log(item, e.item)
            }
        },
        refresh() {
            this.state = 2;
            this.top = 40;
            this.getStories();
            this.state = 0;
            this.top = 0;
            this.notesShow = false;
        }
    },
    watch: {
        top: function(val) {
            this.transform = "transform:translateY(" + val + "px)";
            if (this.top >= 40) {
                this.notesShow = true;
            }
        },
    },
    mounted() {
        this.getStories();
        this.toDate = new Date();
        this.$refs.wrapper.addEventListener("scroll", this.handleScroll, false);
    },
    
    // created(){
    //     const that = this;
    //     this.$nextTick(() => {
    //         if (!this.scroll) {
    //             this.scroll = new BScroll(this.$refs.wrapper,{       //初始化better-scroll
    //                 probeType:1,   //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
    //                 click: true,   //是否派发click事件
    //                 scrollY: true
    //             });
    //         } else {
    //             this.scroll.refresh();
    //         }
            
    //         // 滑动过程中事件
    //         this.scroll.on('scroll', (pos) => {
    //             console.log(that.scroll);
    //             if (pos.y > 30) {
    //                 this.pulldownMsg = '释放立即刷新';
    //             }
    //         });
    //         //滑动结束松开事件
    //         this.scroll.on('touchEnd',(pos) =>{  //上拉刷新
    //         console.log(pos);
    //             if(pos.y > 30){
    //                 setTimeout(()=>{
    //                     that.getStories().then((res)=>{
    //                         //恢复刷新提示文本值
    //                         that.pulldownMsg = '下拉刷新'
    //                         //刷新列表后，重新计算滚动区域高度
    //                         that.scroll.refresh();
    //                     })
    //                 },2000);
    //             } 
    //             else if(pos.y<(this.scroll.maxScrollY - 30)){   //下拉加载
    //                 this.pullupMsg = '加载中。。。';
    //                 setTimeout(()=>{
    //                     that.getStories().then((res)=>{
    //                         //恢复文本值
    //                         that.pullupMsg = '加载更多';
    //                         that.scroll.refresh();
    //                     });
    //                 },2000);
                    
    //             }
    //         });     
    //     });
    // }
}
</script>

<style lang="stylus" scoped>
    .box
        margin-top .86rem
    .top-tip
        height: .86rem
        line-height: .86rem
        text-align: center
        margin: 0 !important
    .load
        position: fixed
        bottom: .2rem
        right: .2rem
        font-size: .6rem
        width: .8rem
        height: .8rem
        line-height: .8rem
        text-align: center
        border-radius: .8rem
        color: #ffffff
        background: rgba(204, 204, 204, .8)
</style>
