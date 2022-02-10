import TaskBoard from './tasks_board'
import TaskModel from './task_model'
import DeleteModel from './delete_model'

const boardElement = document.getElementsByClassName('board')[0]
const taskModelElement = document.getElementsByClassName('task_modal')[0]
const deleteModelElement = document.getElementsByClassName('delete_modal')[0]

const taskModel = new TaskModel(taskModelElement)
const deleteModel = new DeleteModel(deleteModelElement)
const board = new TaskBoard(boardElement, taskModel, deleteModel)
board.getTask()
taskModel.setBoardCallBack(board.getTask.bind(board))
