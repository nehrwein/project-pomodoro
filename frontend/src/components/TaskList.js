import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPen, faPlus } from "@fortawesome/free-solid-svg-icons"
import {
  showTasklist,
  updateTodo,
  deleteTodo,
  toggleIsComplete,
} from "../reducers/tasks"
import { timer } from "../reducers/timer"
import AddTask from "./AddTask"
import LoadingIndicator from "./LoadingIndicator"
import { Checkbox } from "../library/Checkbox"
// import PomodoroTimer from "./PomodoroTimer"

import styled from "styled-components/macro"

const TaskList = () => {
  const allTasks = useSelector((store) => store.tasks.items.tasks)
  /* const allOpenTasks = allTasks.filter(item => item.completed === false) */
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const loading = useSelector((store) => store.ui.loading)
  const error = useSelector((store) => store.tasks.error)
  console.log("Error: ", error)
  console.log(allTasks.tasks)
  console.log("AT: ", accessToken)
  console.log("userId: ", userId)
  console.log("allTasks: ", allTasks)

  const [pickedId, setPickedId] = useState("")
  const [updatedDescription, setUpdatedDescription] = useState("")


  const trashCanIcon = <FontAwesomeIcon icon={faTrash} />
  const penIcon = <FontAwesomeIcon icon={faPen} />
  const saveIcon = <FontAwesomeIcon icon={faPlus} />

  //TODO
  // We need to change the color of the task depending on if user is doing a pomodoro or having a break
  // We need to access information from PomodoroTimer.js

  // const red = "#592101"
  // const blue = "#202D48"
  // const taskColor = work ? red : blue

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showTasklist(accessToken, userId))
  }, [dispatch, accessToken, userId])

  const onUpdateTodo = (taskId, accessToken, updatedDescription, userId) => {
    dispatch(updateTodo(taskId, accessToken, updatedDescription, userId))
    setPickedId("")
    setUpdatedDescription("")
  }

  return (
    <>
      <TaskWrapper>
        {loading && <LoadingIndicator />}
        {allTasks && !loading && (
          <>
            {allTasks.tasks.map((item) => (
              <ItemContainer key={item._id} checked={item.completed}>
                <Item>
                  {/*<Checkbox
                    isChecked={item.completed}
                    itemDescription={item.description}
                    onChange={() =>
                      dispatch(
                        toggleIsComplete(
                          item._id,
                          item.completed,
                          item.completedAt,
                          accessToken,
                          userId
                        )
                      )}
                    onClick={() => dispatch(timer.actions.setItems(item))}
                    />				*/}
                    {item._id === pickedId && item.completed === false ? (
                      <>
                        <EditInput
                          type="text"
                          value={updatedDescription}
                          onChange={(event) => {
                            setUpdatedDescription(event.target.value)
                          }}
                        />
                        <SaveButton
                          type="submit"
                          onClick={() =>
                            onUpdateTodo(
                              item._id,
                              accessToken,
                              updatedDescription,
                              userId
                            )
                          }
                        >
                          <Icon>{saveIcon}</Icon>
                        </SaveButton>
                      </>
                    ) : (
                      <Checkbox
                      isChecked={item.completed}
                      itemDescription={item.description}
                      onChange={() =>
                        dispatch(
                          toggleIsComplete(
                            item._id,
                            item.completed,
                            item.completedAt,
                            accessToken,
                            userId
                          )
                        )}
                      onClick={() => dispatch(timer.actions.setItems(item))}
                      />
                    )}
                  <TaskSettings>
                {/* Edit/Update feature: https://ibaslogic.com/how-to-edit-todos-items-in-react/ */}
                    <div onClick={() => setPickedId(item._id)}>
                    <Icon>{penIcon}</Icon>
                    </div>
                    <div
                      onClick={() =>
                        dispatch(deleteTodo(accessToken, userId, item._id))
                      }
                    >
                      <Icon>{trashCanIcon}</Icon>
                    </div>
                  </TaskSettings>
                </Item>
              </ItemContainer>
            ))}
          </>
        )}
        <AddTask />
      </TaskWrapper>
    </>
  )
}

export default TaskList

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 30px;
  padding-bottom: 30px;
  width: 100%;
  height: auto;
  gap: 16px;
  position: relative;
  background-color: #fff9f5;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`

const ItemContainer = styled.div`
  width: 80%;
  height: auto;
  gap: 16px;
  position: relative;
  background-color: #fff9f5;

  span {
    color: ${(props) => (props.checked ? "red" : "#84817a")};
  }
`

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-between;
`

const TaskSettings = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  /*width: 20%;*/
  gap: 20px;
`

const Icon = styled.i`
  color: #b4b2b2;
  font-size: 16px;
`

const NoTasks = styled.div`
  color: gray;
`

const EditInput = styled.input`
  border: none;
  border-bottom: 1px solid red;
  outline: none;
  font-size: 20px;
  color: #d75004;
  width: 67%;
  background-color: #fff9f5;
`

const SaveButton = styled.button`
  border:none;
  background-color: transparent;
  border: none;
  font-size: 15px;
  cursor: pointer;
`

              //<Task
              //  key={item._id}
              //  // taskColor={taskColor}
              //  completed={item.completed}
              //>
              //  <div>
              //    <CheckboxInput
              //      id="completed"
              //      checked={item.completed}
              //      type="checkbox"
              //      onChange={() =>
              //        dispatch(
              //          toggleIsComplete(
              //            item._id,
              //            item.completed,
              //            item.completedAt,
              //            accessToken,
              //            userId
              //          )
              //        )
              //      }
              //    />
              //    {item._id === pickedId && item.completed === false ? (
              //      <>
              //        <EditInput
              //          type="text"
              //          value={updatedDescription}
              //          onChange={(event) => {
              //            setUpdatedDescription(event.target.value)
              //          }}
              //        />
              //        <SaveButton
              //          type="submit"
              //          onClick={() =>
              //            onUpdateTodo(
              //              item._id,
              //              accessToken,
              //              updatedDescription,
              //              userId
              //            )
              //          }
              //        >
              //          Save
              //        </SaveButton>
              //      </>
              //    ) : (
              //      <TaskDescription
              //        onClick={() => dispatch(timer.actions.setItems(item))}
              //        completed={item.completed}
              //      >
              //        {item.description}
              //      </TaskDescription>
              //    )}
              //  </div>

              //  <TaskSettings>
              //    {/* Edit/Update feature: https://ibaslogic.com/how-to-edit-todos-items-in-react/ */}
              //    <div onClick={() => setPickedId(item._id)}>
              //      <Icon>{penIcon}</Icon>
              //    </div>
              //    <div
              //      onClick={() =>
              //        dispatch(deleteTodo(accessToken, userId, item._id))
              //      }
              //    >
              //      <Icon>{trashCanIcon}</Icon>
              //    </div>
              //  </TaskSettings>
              //</Task>
