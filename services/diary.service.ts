import { DiaryEntry, NonSensitiveInfoDiaryEntry, NewDiaryEntry } from '../types'
import diaryData from '../utils/data/diaries.json'

const diaries: DiaryEntry[] = <DiaryEntry[]>diaryData

class DiariesService {

  getEntries = (): DiaryEntry[] => diaries

  findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id)
    if (entry != null) {
      const { comment, ...restOfDiary } = entry
      return restOfDiary
    }
    return undefined
  }

  getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => {
      return { id, date, weather, visibility }
    })
  }

  addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
    const newDiary = {
      id: Math.max(...diaries.map(d => d.id)) + 1,
      ...newDiaryEntry,
    }
    diaries.push(newDiary)
    return newDiary
  }

  updateById = (id: number, newDiaryEntry: NewDiaryEntry): NewDiaryEntry | undefined => {
    const entry = diaries.find(data => data.id === id)

    if (entry != null) {
      entry.id = id
      entry.weather = newDiaryEntry.weather
      entry.date = newDiaryEntry.date
      entry.visibility = newDiaryEntry.visibility
      entry.comment = newDiaryEntry.comment
      return entry
    }
    return undefined
  }

  deleteById = (id: number): DiaryEntry[] | undefined => {
    const objWithIdIndex = diaries.findIndex((obj) => obj.id === id);
    const entry = diaries.find(data => data.id === id)

    if (objWithIdIndex > -1) {
      diaries.splice(objWithIdIndex, 1)
    } else if (entry === null || entry === undefined) {
      return undefined
    }
    return diaries
  }
}

export default DiariesService
