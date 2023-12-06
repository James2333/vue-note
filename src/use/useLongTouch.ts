// @ts-ignore
import { onMounted, onUnmounted, Ref } from 'vue'

export default function(arr: Ref<null | HTMLElement>[], callbacks: Function) {
    const timer: any = null
    let isMoving = false
    const touchStart = (e: any) => {
        const id = e.targetTouches[0].targets.id
        setTimeout(() => {
            if (!isMoving) {
                callbacks(id)
            }
        }, 1000)
    }
    const touchEnd = () => {
        clearTimeout(timer)
        isMoving = false
    }
    const touchMove = () => {
        isMoving = true
    }

    onMounted(() => {
        arr.forEach(item => {
            item.value?.addEventListener('touchstart', touchStart)
            item.value?.addEventListener('touchend', touchEnd)
            item.value?.addEventListener('touchmove', touchMove)
        })
    })
    onUnmounted(() => {
        arr.forEach(item => {
            item.value?.removeEventListener('touchstart', touchStart)
            item.value?.removeEventListener('touchend', touchEnd)
            item.value?.removeEventListener('touchmove', touchMove)
        })
    })
}