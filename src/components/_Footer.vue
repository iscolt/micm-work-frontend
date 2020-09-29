<template>
    <div class="footer">
        <el-divider><a target="_blank" href="https://www.github.com/iscolt/micm-work">关于本站</a></el-divider>
        <div><strong>© </strong>2020</div>
        <div><strong>@Author：</strong>Colt</div>
        <div>-----</div>
    </div>
</template>

<script>
    export default {
        name: "Footer",
    }
</script>

<style scoped>
    .footer {
        display: flex;
        width: 98%;
        background-color: white;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        margin: 10px;
    }
</style>
