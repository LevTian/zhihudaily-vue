<template>
    <div class="wrapper">
        <swiper :options="swiperOption">
            <swiper-slide v-for="obj in top_stories" :key="obj.id">
                <router-link tag="div" :to="/detail/ + obj.id">
                    <img class="swiper-img" :src="obj.image">
                    <p class="img-info">{{ obj.title }}</p>
                </router-link>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <!-- <swiper :options="swiperOption">
            <swiper-slide v-for="item in top_stories" :key="item.id">
                <img class="swiper-img" :src="item.image" />
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper> -->
    </div>
</template>

<script>
    
export default {
    name: "HomeSwiper",
    data() {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                // pagination: {el: '.swiper-pagination'},  //这样写导致没有分页器
                loop: true,
                autoplay: 3000,
            },
        }
    },
    props: {
        top_stories: Array,
    } 
}
</script>

<style lang="stylus" scoped>
    .wrapper >>> .swiper-container
        height: 100%
    .wrapper >>> .swiper-pagination-bullet
        background: #999999
        opacity: 1
    .wrapper >>> .swiper-pagination-bullet-active
        background: #ffffff
    
    .wrapper
        position: relative
        overflow: hidden
        width: 100%
        height: 5rem
        .swiper-img
            width: 100%
            height: 100%
        .img-info
            position: absolute
            left: 0
            right: 0
            bottom: .5rem
            margin: 0 .4rem
            color: #ffffff
            font-size: .32rem


</style>
