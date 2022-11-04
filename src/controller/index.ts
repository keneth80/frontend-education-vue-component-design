import {Http, CustomHttpResponse} from '../utils/http/http-client';
import {Observable, zip, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {UserResponse, User, TodoRequest, Todo, TodoResponse} from '@/mock';

function mappingUserResponse({user_id, nick_name}: UserResponse): User {
    return {
        userId: user_id,
        nickName: nick_name
    };
}

export function getUser(userId: number): Observable<User> {
    return Http.get(`/users/${userId}`).pipe(
        map((response: CustomHttpResponse<UserResponse>) => {
            return mappingUserResponse(response.data);
        })
    );
}

function mappingTodoResponse({user_id, content, todo_id}: TodoResponse): Todo {
    return {
        userId: user_id,
        todoId: todo_id,
        content
    };
}

export function addTodo(value: TodoRequest): Observable<Todo> {
    return Http.post('/todos', value).pipe(
        map((response: CustomHttpResponse<TodoResponse>) => {
            return mappingTodoResponse(response.data);
        })
    );
}

export function removeTodo(todoId: number): Observable<{
    isDeleted: boolean;
    todoId: number;
}> {
    return Http.delete(`/todos/${todoId}`, {}).pipe(
        map((response: CustomHttpResponse<{is_deleted: boolean; todo_id: number}>) => {
            return {
                isDeleted: response.data.is_deleted,
                todoId: response.data.todo_id
            };
        })
    );
}

export function modifyTodo(todoId: number): Observable<{
    isDeleted: boolean;
    todoId: number;
}> {
    return Http.delete(`/todos/${todoId}`, {}).pipe(
        map((response: CustomHttpResponse<{is_updated: boolean; todo_id: number}>) => {
            return {
                isDeleted: response.data.is_updated,
                todoId: response.data.todo_id
            };
        })
    );
}

export function getTodos(userId: number): Observable<Array<Todo>> {
    return Http.get(`/todos/${userId}`).pipe(
        map((response: CustomHttpResponse<Array<TodoResponse>>) => {
            return response.data.map((todo: TodoResponse) => mappingTodoResponse(todo));
        })
    );
}

export function getTodoWithUser(userId: number): Observable<{user: User; todos: Array<Todo>}> {
    return getUser(userId).pipe(
        mergeMap((response: User) => {
            return zip(of(response), getTodos(userId));
        }),
        map(([user, todos]) => {
            return {
                user,
                todos
            };
        })
    );
}
