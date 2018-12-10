<template>
    <div class="header">
        <router-link tag="div" to="/" class="back-icon iconfont">&#xe684;</router-link>
        <div class="header-right">
            <div class="iconfont share-icon">&#xe60b;</div>
            <div class="iconfont save-icon">&#xe639;</div>
            <div class="iconfont comment-icon">&#xe609; {{ comments }}</div>
            <div class="iconfont praise-icon">&#xe64b; {{ star }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailHeader",
    props: {
        comments: Number,
        star: Number,
        share: String,
    },
    mounted() {
        console.log(this.comments, this.star)
    }
}
</script>

<style lang="stylus" scoped>
    .header
        display: flex
        z-index: 10
        position: fixed
        top: 0
        left: 0
        right: 0
        height: .86rem
        line-height : .86rem
        margin-top: .86rem
        color: #ffffff
        background: #0099CC
        .back-icon
            float: left
            margin: 0 .25rem
            font-size: .6rem
            font-weight: bold
        .header-right
            flex: 1
            display: flex
            margin-left: 2rem
            .share-icon
                flex: 1
                font-size: .48rem
            .save-icon
                flex: 1
                font-size: .48rem
            .comment-icon
                flex: 1
                font-size: .48rem
            .praise-icon
                flex: 1
                font-size: .48rem
</style>
