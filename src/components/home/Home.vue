<template>
    <div>
        <HomeHeader :title="title"></HomeHeader>
        <div class="box" ref="wrapper">
            <div class="bscroll-container">
                <div class="top-tip" v-show="top">
                    <span class="refresh-hook">下拉刷新</span>
                </div>
                <div>
                    <HomeSwiper :top_stories="top_stories"></HomeSwiper>
                    <HomeNewsList :stories="stories"></HomeNewsList>
                </div>
                <!-- <div class="bottom-tip" v-show="bottom">
                    <span class="loading-hook">上拉加载</span>
                </div> -->
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
            touching: false,
            toDate: null,
            upThreshold: 70,
            downThreshold: -50,
            top: false,
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
    },
    watch: {
    },
    mounted() {
        let wrapper = document.querySelector(".box");
        let topTip = document.querySelector(".refresh-hook");
        this.scroll = new BScroll(wrapper, {
            click: true,
            scrollY: true,
            probeType: 1,
            //下拉刷新
            pullDownRefresh: {
                threshold: this.upThreshold,  //下拉超过30px触发pullingDown事件
                stop: 30,       //回弹停留在20px
            },
            //
            pullUpLoad: {
                threshold: this.downThreshold,  //上拉30px触发pullingUp事件
            }
        });
        this.$nextTick(() => {     
            this.scroll.on("scroll", (position) => {
                if (position.y < 5) {
                    this.top = false;
                } else {        //大于5显示提示语
                    this.top = true
                }
                if (position.y > this.upThreshold) {        //超过门槛值修改提示语
                    
                    topTip.innerText = "释放刷新";
                }
            });
            // this.scroll.on("touchend", (position) => {
            //     console.log(position);
            //     if (position.y > this.threshold) {
            //         this.getStories();      //获取数据
            //         topTip.innerText = "下拉刷新";
            //         this.scroll.refresh();
            //     }
            // });
            this.scroll.on("pullingDown", () => {
                console.log("pulldwon")
                
                this.getStories();
                this.scroll.finishPullDown();  // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
                
                setTimeout(() => {
                    topTip.innerText = "下拉刷新";      //完成后将提示语改回原值
                    this.scroll.refresh();
                }, 500);
            });
            this.scroll.on("pullingUp", () => {
                console.log("pullup");
                this.loadMore();
                this.scroll.finishPullUp();     //需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
                setTimeout(() => {
                    this.scroll.refresh();
                }, 500);
            });
            // this.scroll.refresh();
        });
    },
    created() {
        this.getStories();
        this.toDate = new Date();
    }
}
</script>

<style lang="stylus" scoped>
    .box
        position : fixed 
        top : .86rem
        left : 0
        right : 0
        bottom : 0
        overflow : hidden
        .bscroll-container
            overflow : hidden
            .top-tip
                text-align : center
            
</style>
