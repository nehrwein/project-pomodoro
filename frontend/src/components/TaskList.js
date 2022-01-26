import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons"
import { showTasklist, ToggleIsComplete } from "../reducers/tasks"
import styled from "styled-components"
import AddTask from "./AddTask"
import LoadingIndicator from "./LoadingIndicator"

// import { FormWrapper } from "styled-components/Styling"

const TaskList = () => {
  const allTasks = useSelector((store) => store.tasks.items)
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const error = useSelector((store) => store.tasks.error)
  const loading = useSelector((store) => store.ui.loading)
  console.log("Error: ", error)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showTasklist(accessToken, userId))
  }, [dispatch, accessToken, userId])

  // const trashCanIcon = <FontAwesomeIcon icon={faTrash} />
  // const penIcon = <FontAwesomeIcon icon={faPen} />

  return (
    <div>
      {loading && <LoadingIndicator />}
      {!loading && (
        <>
          {allTasks.map((item) => (
            <div key={item._id}>
              <input
                id="completed"
                type="checkbox"
                onChange={() =>
                  dispatch(ToggleIsComplete(item._id, accessToken, userId))
                }
              />
              <label htmlFor="completed">{item.description}</label>
              <ButtonsContainer>
                {/* Edit/Update feature below needs to be fixed so that user can edit the items. https://ibaslogic.com/how-to-edit-todos-items-in-react/ */}
                {/*         <div onDoubleClick={() => onUpdateTodo(item._id)}><Icon>{penIcon}</Icon></div>
            <Button onClick={() => onDeleteTodo(item._id)}><Icon>{trashCanIcon}</Icon></Button> */}
              </ButtonsContainer>
            </div>
          ))}
          <AddTask />
        </>
      )}
    </div>
  )
}

export default TaskList

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 20%;
  margin-right: 10px;
`

//const ToDoLabel = styled.label`
//  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
//`
