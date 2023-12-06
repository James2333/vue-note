<script setup lang='ts'>
import { useListStore } from '@/stores/noteList'
import { ref } from 'vue'
import { showSuccessToast } from 'vant'
import { useRouter } from 'vue-router'

const store = useListStore()
const state = ref({
    note: {
        content: '',
        dates: ''
    }
})
const date = new Date()
const router = useRouter()
const doAddNotes = () => {
    state.value.note.dates = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    store.addNoteList(state.value.note).then((res) => {
        if (res) {
            showSuccessToast('添加成功')
            router.push('/list')
        } else {
            alert('添加失败！')
        }
    })
}
</script>
<template>
    <div class='add-note-box'>
        <van-nav-bar left-arrow>
            <template #right>
                <van-icon name='success' size='18' @click='doAddNotes'></van-icon>
            </template>
        </van-nav-bar>
        <van-field class='field' rows='1' autosize type='textarea' placeholder='输入内容' v-model='state.note.content'>

        </van-field>
    </div>
</template>

<style lang='scss' scoped>
.add-note-box {
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1;
    background-color: #ffffff;

    .field {
        font-size: 0.22rem;
    }
}
</style>
