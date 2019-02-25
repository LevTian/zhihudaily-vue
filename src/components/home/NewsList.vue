<template>
    <div class="wrapper">
        
        <div class="list-item">
            <div v-for="(items, index) of stories" :key="index">
                <div class="list-title" :id="items.date">{{ items.date | dateConvert(index) }}</div>
                <router-link tag="div" :to="/detail/ + obj.id" class="new-content" v-for="obj of items.stories" :key="obj.id">
                    <p class="new-title">{{ obj.title }}</p>
                    <div class="new-img">
                        <img class="img" :src="obj.images[0]" alt="">
                    </div>
                </router-link>
            </div>
        </div>
        
    </div>
</template>

<script>
    const DAYLIST = ["日", "一", "二", "三", "四", "五", "六"];     //星期日为第一天
export default {
    name: "HomeNewsList",
    data() {
        return {
            topTitle: "今日热文",
        }
    },
    props: {
        stories: Array
    },
    filters: {
        dateConvert(value, index) {
            let res;
            if (0 === index) {
                res =  "今日热文";
            } else {
                let date = new Date();
                date.setFullYear(value.substring(0, 4), value.substring(4, 6), value.substring(6));
                let day = date.getDay();
                day = DAYLIST[day];     //getDay(),星期几，返回的是0-6
                
                res = value.substring(4, 6) + "月" + value.substring(6) + "日" + " 星期" + day;
            }

            return res;
        }
    }
}
</script>

<style lang="stylus" scoped>
    .wrapper
        background: #eeeeee
        .list-title
            height: .7rem
            line-height: .7rem
            margin-left: .25rem
            text-align: left 
        .list-item
            height: 100%
            width: 100%
            text-align: center
            .new-content
                display: flex
                height: 2rem
                width: 95%
                margin: .15rem auto 
                padding: .25rem
                background: #ffffff
                border-radius: .1rem
                box-sizing: border-box
                box-shadow: .01rem .02rem .01rem #cccccc
                .new-title
                    flex: 1
                    text-align: left
                    line-height: .45rem
                    font-size: .34rem
                    margin: 0 !important
                .new-img
                    float: right 
                    width: 1.6rem
                    height: 1.6rem
                    margin-left: .15rem
                    .img
                        width: 100%
                        height: 100%


        

</style>
