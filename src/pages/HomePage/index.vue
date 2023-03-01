<template>
    <div>
        <HeaderPage :titleHeader="titleHeader"/>
        <ContainerPage />
    </div>
</template>

<script>
import HeaderPage from '../../components/Header.vue'
import ContainerPage from '../../components/ContainerPage.vue'
export default {
    name: "HomePage",
    components: {
        HeaderPage,
        ContainerPage
    },
    data() {
        return {
            titleHeader: "Nguyễn ngọc sơn"
        }
    }
}
</script>

<style lang="scss" scoped></style>