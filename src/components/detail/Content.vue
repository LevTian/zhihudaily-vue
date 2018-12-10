<template>
    <div class="detail-content" v-html="body"></div>
</template>

<script>
export default {
    name: "DetailContent",
    props: {
        body: String,
    },
    mounted() {
    }
}
</script>

<style lang="stylus" scoped>
    @import "../../../public/new-detail.css"
    p
      color: red
</style>
