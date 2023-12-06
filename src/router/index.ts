import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import ListView from '../views/ListView.vue'
// @ts-ignore
import AddView from '../views/AddNoteView.vue'
// @ts-ignore
import NotFound from '../views/404.vue'

// @ts-ignore
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/list',
            name: 'list',
            component: ListView
        },
        {
            path: '/add',
            name: 'add',
            component: AddView
        },
        {
            path: '/:catchAll(.*)',
            name: '/404',
            component: NotFound
        }
    ]
})

// const router = createRouter({
//     history: createWebHistory(import.meta.env.BASE_URL),
//     routes
// })

export default router
