import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/constants";
import tasks from "../reducers/tasks";
import user from "../reducers/user";
import styled from "styled-components";

const Main = () => {
	const allTasks = useSelector((store) => store.tasks.items);
	const accessToken = useSelector((store) => store.user.accessToken);

	const userId = useSelector((store) => store.user.userId);

	const [task, setTask] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!accessToken) {
			navigate("/login");
		}
	}, [accessToken, navigate]);

	useEffect(() => {
		const options = {
			method: "GET",
			headers: {
				Authorization: accessToken,
			},
		};

		// fetching all the tasks of a user from the API
		fetch(API_URL(`tasks/${userId}`), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(tasks.actions.setItems(data.response));
					dispatch(tasks.actions.setError(null));
				} else {
					dispatch(tasks.actions.setItems([]));
					dispatch(tasks.actions.setError(data.response));
				}
			});
	}, [accessToken, dispatch, userId, allTasks]);

	// posting a new task
	const onAddTodo = () => {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: accessToken,
			},
			body: JSON.stringify({ description: task, user: userId }),
		};

		fetch(API_URL("tasks"), options)
			.then((res) => res.json())
			.then((data) => console.log(data))
			.finally(() => setTask(""));
	};

	// deleting a task
	const onDeleteTodo = (taskId) => {
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: accessToken,
			},
			body: JSON.stringify({ user: userId }),
		};

		fetch(API_URL(`tasks/${taskId}`), options)
			.then((res) => res.json())
			.then((data) => console.log("DELETE", data));
	};

	// updating/editing an existing task
	const onUpdateTodo = (taskId) => {
		const options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: accessToken,
			},
			body: JSON.stringify({ description: task, user: userId }),
		};

		fetch(API_URL(`tasks/${taskId}/update`), options)
			.then((res) => res.json())
			.then((data) => console.log("UPDATE", data));
	};

	// complete an existing task
	const onToggleIsComplete = (taskId) => {
		const options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: accessToken,
			},
			body: JSON.stringify({ description: task, user: userId }),
		};

		fetch(API_URL(`tasks/${taskId}/complete`), options)
			.then((res) => res.json())
			.then((data) => console.log("TOOGLE", data));
	};

	return (
		<MainContainer>
			<h1>The main pomodoro site:</h1>
			<TimerContainer>
				<h2>Pomodoro timer goes here</h2>
			</TimerContainer>

			{allTasks.map((item) => (
				<TaskContainer key={item._id}>
				<input 
					id='completed'
					type='checkbox' 
					onChange={() => onToggleIsComplete(item._id)}
				/>
				  <ToDoLabel
            completed={item.completed} 
            htmlFor='completed'>{item.description}
          </ToDoLabel>

					{/* Edit/Update feature below needs to be fixed so that user can edit the items. https://ibaslogic.com/how-to-edit-todos-items-in-react/ */}
					<div onDoubleClick={() => onUpdateTodo(item._id)}>Update</div>
					<button onClick={() => onDeleteTodo(item._id)}>Delete</button>
				</TaskContainer>
			))}
			<input
				id="task"
				type="text"
				value={task}
				onChange={(e) => setTask(e.target.value)}
			/>
			<button onClick={onAddTodo}>Add task</button>
			<button onClick={() => dispatch(user.actions.setAccessToken(null))}>
				Log out
			</button>
		</MainContainer>
	);
};

export default Main;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
	background: #202D48;
`;

const TimerContainer = styled.div`
	background: linear-gradient(270.42deg, #D75004 0.3%, #8A3403 99.58%);

`; 

const TaskContainer = styled.div`
	display: flex; 
	flex-direction: row; 
`;

const ToDoLabel = styled.label`
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`


