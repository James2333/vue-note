import noteService from '.'

export function getNotes<T>(page: number, size: number) {
    return noteService.get<T>('/api/note/page/' + page + '/' + size) as Promise<T>
}

export function addNotes<T>(note: T) {
    return noteService.post<T>('/api/note/add', note)
}

export function getNotesByContent<T>(note: string) {
    return noteService.get<T>('/api/note/search/' + note) as Promise<T>
}