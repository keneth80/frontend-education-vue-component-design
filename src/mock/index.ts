import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter-path-params';

const routeParams = {
    ':userId': '[0-9]{1,8}',
    ':todoId': '[0-9]{1,8}'
};
export const axiosInstance = axios.create();
export const mockAdapter = new AxiosMockAdapter(axiosInstance, {delayResponse: 1000}, routeParams);

export interface UserResponse {
    user_id: number;
    nick_name: string;
}

export interface TodoResponse {
    todo_id: number;
    user_id: number;
    title?: string;
    content?: string;
    photo?: any;
}

export interface TodoRequest {
    user_id: number;
    title?: string;
    content: string;
    photo?: any;
}

export interface User {
    userId: number;
    nickName: string;
}

export interface Todo {
    todoId: number;
    userId: number;
    title?: string;
    content?: string;
    photo?: any;
}

// user data setup
const usersUri = '/users';
const users: Array<UserResponse> = [...Array(10)].map((item: any, index: number) => ({
    user_id: index,
    nick_name: `User-${index}`
}));
mockAdapter
    .onGet(`${usersUri}/:userId`)
    .reply((config: any) => {
        try {
            const {userId} = config.routeParams;
            const targetIndex = users.findIndex((value: UserResponse) => value.user_id + '' === userId);
            if (targetIndex > -1) {
                return [200, {...users[targetIndex]}];
            } else {
                return [404, null];
            }
        } catch (error) {
            console.error(error);
            return [500, {message: 'Internal server error'}];
        }
    })
    .onGet(`${usersUri}`)
    .reply(() => {
        try {
            return [200, [...users]];
        } catch (error) {
            console.error(error);
            return [500, {message: 'Internal server error'}];
        }
    });

// todo data setup
const todoUri = '/todos';
const todos: Array<TodoResponse> = [];
mockAdapter
    .onGet(`${todoUri}/:userId`)
    .reply((config: any) => {
        try {
            const {userId} = config.routeParams;
            console.log('todos : ', userId, todos);
            return [200, [...todos.filter((todo: TodoResponse) => todo.user_id + '' === userId)]];
        } catch (error) {
            console.error(error);
            return [500, {message: 'Internal server error'}];
        }
    })
    .onPost(`${todoUri}`)
    .reply((config: any) => {
        try {
            console.log('add todo : ', config);
            const targetTodo: TodoResponse = {
                ...JSON.parse(config.data || {}),
                todoId: todos.length
            };
            todos.push(targetTodo);
            return [200, targetTodo];
        } catch (error) {
            console.error(error);
            return [500, {message: 'Internal server error'}];
        }
    })
    .onDelete(`${todoUri}/:todoId`)
    .reply((config: any) => {
        try {
            const {todoId} = config.routeParams;
            const targetIndex = todos.findIndex((value: TodoResponse) => value.todo_id + '' === todoId);
            let isDeleted = false;
            if (targetIndex > -1) {
                todos.splice(targetIndex, 1);
                isDeleted = true;
            }
            return [
                200,
                {
                    is_deleted: isDeleted,
                    todo_id: todoId
                }
            ];
        } catch (error) {
            console.error(error);
            return [500, {message: 'Internal server error'}];
        }
    })
    .onPut(`${todoUri}`)
    .reply((config: any) => {
        try {
            const targetTodo = JSON.parse(config.data || {});
            const targetIndex = todos.findIndex((value: TodoResponse) => value.todo_id + '' === targetTodo.todoId);
            let isUpdated = false;
            if (targetIndex) {
                todos[targetIndex] = targetTodo;
                isUpdated = true;
            }
            return [
                200,
                {
                    is_updated: isUpdated,
                    todo_id: targetTodo.todoId
                }
            ];
        } catch (error) {
            console.error(error);
            return [500, {message: 'Internal server error'}];
        }
    });
