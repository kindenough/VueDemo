<template>
    <div>
        哈哈，我是Vue渲染出来的。<br>
        <input v-model="value"/><br>
        {{value}}
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value: 0
            }
        }
    }
</script>
<style scoped></style>
