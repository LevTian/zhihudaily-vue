<template>
    <div>
        <HomeHeader></HomeHeader>
        <HomeSwiper :top_stories="top_stories"></HomeSwiper>
        <HomeNewsList :stories="stories"></HomeNewsList>
    </div>
</template>

<script>
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
        }
    },
    methods: {
        getImg() {
            this.$axios.get("/api/news/latest")
            .then(this.getImgSucc)
            .catch(error => {
                console.log(error);
            })
        },
        getImgSucc(res) {
            if (res.data) {
                res = res.data;
                this.top_stories = res.top_stories;
                this.stories = res.stories;
            }  
        }
    },
    mounted() {
        this.getImg();
    }
}
</script>

<style lang="stylus" scoped>

</style>
