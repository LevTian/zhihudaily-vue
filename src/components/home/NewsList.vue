<template>
    <div class="wrapper">
        
        <div class="list-item">
            <div v-for="(items, index) of stories" :key="index">
                <div class="list-title">{{ items.date }}</div>
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
    
export default {
    name: "HomeNewsList",
    data() {
        return {
            
        }
    },
    props: {
        stories: Array
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
