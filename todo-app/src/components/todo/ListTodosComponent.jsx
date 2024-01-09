export default function ListTodosComponent() {
    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDate());
    const todos = [
        { id: 1, description: 'Learn Aws', done: false, targetDate: targetDate },
        { id: 2, description: 'Learn Angular', done: false, targetDate: targetDate },
        { id: 3, description: 'Learn Java', done: false, targetDate: targetDate },
        { id: 4, description: 'Learn DSA', done: false, targetDate: targetDate },
        { id: 5, description: 'Learn React', done: false, targetDate: targetDate }
    ]
    return (
        <div className="container">
            <h1>Things you want to do!</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Description</td>
                            <td>Is Done?</td>
                            <td>Target Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
}
