import express from 'express'
import DiariesService from '../services/diary.service'
import { toNewDiaryEntry, toUpdateDiaryEntry } from '../utils/helpers/helper_functions'

const router = express.Router()
const service = new DiariesService()

router.get('/',(_req, res) => res.json(service.getEntriesWithoutSensitiveInfo()))

router.get('/:id',
  (req, res) => {
    const { id } = req.params;
    const diary = service.findById(+id)
    diary ? 
      res.status(200).json(diary) 
      : 
      res.status(404).json({message: 'ID not found'})
  }
)

router.put('/:id',
  (req, res) => {
    const { id } = req.params
    const updatedDiaryEntry = toUpdateDiaryEntry(req.body)
    const updatedRecord = service.updateById(+id, updatedDiaryEntry)
    updatedRecord ? 
      res.status(200).json(updatedRecord) 
      : 
      res.status(404).json({message: 'ID not found'})
  }
)

router.post('/',
  (req, res) => {
    const newDiaryEntry = toNewDiaryEntry(req.body)
    const addedDiaryEntry = service.addDiary(newDiaryEntry)
    res.json(addedDiaryEntry)
  }
)

router.delete('/:id',
  (req, res) => {
    const { id } = req.params
    const diary = service.deleteById(+id)
    diary ? 
      res.status(200).json({message: 'ID deleted'}) 
      :
      res.status(404).json({message: 'ID not found'})
  }
)

export default router
