<template>
    <div>
        <DetailHeader :comments="comments" :star="star" :share="share"></DetailHeader>
        <DetailImage :image="image" :title="title" :img_source="img_source"></DetailImage>
        <DetailContent :body="body"></DetailContent>
    </div>
</template>

<script>
    import DetailHeader from "./Header.vue"
    import DetailImage from "./Pictrue.vue"
    import DetailContent from "./Content.vue"
export default {
    name: "Detail",
    components: {
        DetailHeader,
        DetailImage,
        DetailContent
    },
    data() {
        return {
            id: "",
            comments: 0,
            long_comments: 0,
            star: 0,
            short_comments: 0,
            image: "",
            title: "",
            img_source: "",
            share: "",
            body: "",
        }
    },
    methods: {
        getNew() {
            this.$axios.get("/api/news/" + this.id)
            .then(this.getNewSucc)
            .catch(error => {console.log(error)})
        },
        getNewSucc(res) {
            if (res.status ==200 && res.data) {
                res = res.data;
                this.image = res.image;
                this.title = res.title;
                this.img_source = res.image_source;
                this.share = res.share_url;
                this.body = res.body;
            }
        },
        getNewExtra() {
            this.$axios.get("/api/story-extra/" + this.id)
            .then(this.getNewExtraSucc)
            .catch(error => {console.log(error)})
        },
        getNewExtraSucc(res) {
            if (res.status ==200 && res.data) {
                res = res.data;
                this.comments = res.comments;
                this.long_comments = res.long_comments;
                this.star = res.popularity;
                this.short_comments = res.short_comments;

            }
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        this.getNew();
        this.getNewExtra();
    }
    
}
</script>

<style lang="stylus" scoped>

</style>
