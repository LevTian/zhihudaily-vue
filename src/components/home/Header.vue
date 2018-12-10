<template>
    <div class="header">
        <div class="header-menu">
            <span class="iconfont menu-icon">&#xeaf1;</span>
        </div>
        <div class="header-title">{{ title }}</div>
        <div class="header-right">
            <span class="iconfont message-icon">&#xeb43;</span>
            <span class="iconfont set-icon">&#xe6b9;</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeHeader",
    props: {
        title: String,
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
        color: #ffffff
        background: #0099CC
        .header-menu
            float: left
            margin-left: .25rem
            .menu-icon
                font-size: .48rem
        .header-title
            flex: 1
            margin-left: 1rem
            text-align: left 
            font-size: .34rem
        .header-right
            float: right 
            .message-icon
                font-size: .48rem
                margin-right: .3rem
                display: inline-block
            .set-icon
                font-size: .48rem
                margin-right: .25rem

</style>
