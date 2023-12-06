<script setup lang='ts'>
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import type { Note, NoteList, NoteListState } from '@/types'
import { useListStore } from '@/stores/noteList'
import { debounce } from '@/utils/debounce'
import { useRouter } from 'vue-router'

const noteValue = ref([] as NoteList)
const items = ref([] as HTMLElement[])
const store = useListStore()
const noteListState: NoteListState = {
    leftList: [],
    rightList: []
}
const state = reactive(noteListState)
const initLRList = () => {
    let leftHeightSum = 0
    let rightHeightSum = 0
    let leftArr: Note[] = []
    let rightArr: Note[] = []
    nextTick(() => {
        // console.log(items.value)
        items.value!.forEach((item, index) => {
            if (leftHeightSum <= rightHeightSum) {
                //哪边高度低就放那边
                leftArr.push(noteValue.value[index])
                leftHeightSum += item.clientHeight
            } else {
                rightArr.push(noteValue.value[index])
                rightHeightSum += item.clientHeight
            }
        })
        state.leftList = leftArr.reverse()
        state.rightList = rightArr.reverse()
    })
    console.log(state)
}
const intiList = () => {
    store.getNotesList().then((res) => (noteValue.value = res))
}


onMounted(() => {
    intiList()

})
watch(noteValue, () => {
    initLRList()
})
const stateV = ref({
    searchValue: ''
})
const handleSearch = () => {
    if (!stateV.value.searchValue.trim()) {
        handleClear()
    } else {
        store.getNotesListSearch(stateV.value.searchValue).then((res) => {
            // console.log(res)
            items.value = []
            noteValue.value = res
        })
    }
}
const handleClear = () => {
    store.getNotesList().then((res) => {
        items.value = []
        noteValue.value = res
    })
}
const router = useRouter()
const handleAdd = () => {
    router.push('/add')
}

//长按删除功能


watch(() => stateV.value.searchValue, debounce(handleSearch, 1000))
</script>

<template>
    <div>
        <div class='note-box'>
            <van-search
                placeholder='搜索'
                input-align='center'
                v-model='stateV.searchValue'
                @search='handleSearch'
                @clear='handleClear'
            ></van-search>
            <div class='list-box'>
                <div class='init-list'>
                    <div class='list-item' v-for='item in noteListState.leftList'
                         :key="item['_id']">
                        <div class='item-content'>
                            <p class='item-text'>
                                {{ item.content }}
                            </p>
                        </div>
                        <div class='item-content'>
                            <p class='item-text'>
                                {{ item.dates }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class='init-list'>
                    <div class='list-item' v-for='item in noteListState.rightList'
                         :key="item['_id']">
                        <div class='item-content'>
                            <p class='item-text'>
                                {{ item.content }}
                            </p>
                        </div>
                        <div class='item-content'>
                            <p class='item-text'>
                                {{ item.dates }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class='init-list'>
                    <div class='list-item' v-for='item in noteValue'
                         :key="item['_id']"
                         :ref='(el) =>{
                             if (el !=null){
                                 items.push(el as HTMLElement)
                             }
                         }'
                    >
                        <div class='item-content'>
                            <p class='item-text'>
                                {{ item.content }}
                            </p>
                        </div>
                        <div class='item-content'>
                            <p class='item-text'>
                                {{ item.dates }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <van-button round icon='plus' class='button' type='primary' @click='handleAdd'></van-button>
        </div>
    </div>
</template>

<style>
.note-box {

.button {
    position: fixed;
    bottom: 0.2rem;
    right: 0.2rem;
}

}

</style>