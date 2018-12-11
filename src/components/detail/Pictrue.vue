<template>
    <div class="wrapper">
        <img class="swiper-img" :src="image">
        <p class="new-title">{{ title }}</p>
        <p class="img-source">{{ img_source }}</p>
    </div>
</template>

<script>
export default {
    name: "DetailImage",
    props: {
        image: String,
        title: String,
        img_source: String,
    }
}
</script>

<style lang="stylus" scoped>
    .wrapper
        position: relative
        overflow: hidden
        width: 100%
        height: 4.5rem
        margin-top: .86rem
        .swiper-img
            width: 100%
            height: 100%
        .new-title
            position: absolute
            left: 0
            right: 0
            bottom: .5rem
            margin: 0 .4rem !important
            color: #ffffff
            font-size: .32rem
            text-align: left 
            line-height: .4rem
        .img-source
            position: absolute
            right: 0
            bottom: .2rem
            margin: 0 .2rem 0 0 !important
            font-size: .16rem
            color: #cccccc
</style>
