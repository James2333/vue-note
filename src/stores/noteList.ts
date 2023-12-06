import { defineStore } from 'pinia'
import type { Note, NoteList } from '@/types'
import { addNotes, getNotes, getNotesByContent } from '@/api/note'

export const useListStore = defineStore('list', {
    state: () => {
        return {
            list: [] as Note[]
        }
    },
    actions: {
        async getNotesList() {
            const res = await getNotes<NoteList>(1, 10)
            this.list = res
            return res
        },
        async addNoteList(payload: Note) {
            return await addNotes<Note>(payload)
        },
        async getNotesListSearch(payload: string) {
            const res = await getNotesByContent<NoteList>(payload)
            this.list = res
            return res
        }
    }
})
