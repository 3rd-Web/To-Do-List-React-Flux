const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			todosList: [
				"",
		],
		},
		actions: { 
			addTodo: function(index, todo) {
				const store = getStore();
				store.todosList.push(todo)
				return (
					store.todosList
				)
			},
			removeTodo: function(todo) {
				const store = getStore();
				function removeTask(task) {
					return task != todo
				}
				const filteredList = store.todosList.filter(removeTask)
				store.todosList = filteredList
				return (filteredList)
			},
		}
	};
}

	export default getState;
