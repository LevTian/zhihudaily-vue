<template>
    <div>
        <HomeHeader :title="title"></HomeHeader>
        <div class="wrapper" ref="wrapper">
            <div class="bscroll-container">
                <p class="top-tip">松开刷新</p>
                    <HomeSwiper :top_stories="top_stories"></HomeSwiper>
                    <HomeNewsList :stories="stories"></HomeNewsList>
                <p class="tottom-tip">加载更多</p>
            </div>
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
        }
    },
    methods: {
        getStories() {
            console.log("axios");
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
                this.stories = res.stories;
            }  
        }
    },
    mounted() {
        this.getStories();
    },
    // created() {
    //     const that = this;
    //     this.$nextTick(() => {
    //         this.scroll = new BScroll(this.$refs.wrapper, {//初始化better-scroll
    //             probeType:1,   //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
    //             click: true   //是否派发click事件
    //         });
    //         // 滑动过程中事件
    //         this.scroll.on('scroll',(pos)=>{
    //             console.log(pos);
    //             if (pos.y > 30) {
    //                 this.pulldownMsg = '释放立即刷新'
    //             }
    //         });
    //         //滑动结束事件
    //         this.scroll.on("touchEnd", (pos) => {
    //             console.log("end",pos);
    //             if (pos > 30) { //up
    //                 setTimeout(() => {
    //                     that.getStories().then(() => {
    //                         that.pulldownMsg = "下拉刷新";
    //                     })
    //                 }, 2000)
    //             }
    //         })
    //     })
    // }
    created(){
        const that = this;
        this.$nextTick(() => {
            if (this.scroll) {
                this.scroll = new BScroll(this.$refs.wrapper,{       //初始化better-scroll
                                probeType:1,   //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
                                click: true   //是否派发click事件
                            });
            }
            
            // 滑动过程中事件
            this.scroll.on('scroll',(pos)=>{
                console.log(pos);
                if(pos.y > 30){
                    this.pulldownMsg = '释放立即刷新'
                }
            });
            //滑动结束松开事件
            this.scroll.on('touchEnd',(pos) =>{  //上拉刷新
            console.log(pos);
                if(pos.y > 30){
                    setTimeout(()=>{
                        that.getStories().then((res)=>{
                            //恢复刷新提示文本值
                            that.pulldownMsg = '下拉刷新'
                            //刷新列表后，重新计算滚动区域高度
                            that.scroll.refresh();
                        })
                    },2000)
                } 
                else if(pos.y<(this.scroll.maxScrollY - 30)){   //下拉加载
                    this.pullupMsg = '加载中。。。';
                    setTimeout(()=>{
                        that.getStories().then((res)=>{
                            //恢复文本值
                            that.pullupMsg = '加载更多';
                            that.scroll.refresh();
                        })
                    },2000)
                    
                }
            })      
        })
    }
}
</script>

<style lang="stylus" scoped>
    .top-tip
        height: .86rem
        line-height: .86rem
        text-align: center
        margin: 0 !important
</style>
