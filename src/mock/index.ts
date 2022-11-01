import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter-path-params';

const routeParams = {
    ':userId': '[0-9]{1,8}',
    ':todoId': '[0-9]{1,8}'
};
export const axiosInstance = axios.create();
export const mockAdapter = new AxiosMockAdapter(axiosInstance, {delayResponse: 1500}, routeParams);

export interface User {
    userId: number;
    nickname: string;
}

export interface Todo {
    todoId: number;
    title?: string;
    content?: string;
    photo?: any;
}

// user data setup
const usersUri = '/users';
const users: Array<User> = [...Array(10)].map((item: any, index: number) => ({userId: index, nickname: `User-${index}`}));
mockAdapter
    .onGet(`${usersUri}/:userId`)
    .reply((config: any) => {
        try {
            const {userId} = config.routeParams;
            const targetIndex = users.findIndex((value: User) => value.userId + '' === userId);
            if (targetIndex > -1) {
                return [200, users[targetIndex]];
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
            return [200, users];
        } catch (error) {
            console.error(error);
            return [500, {message: 'Internal server error'}];
        }
    });

// todo data setup
const todoUri = '/todos';
const todos: Array<Todo> = [];
mockAdapter
    .onGet(`${todoUri}/:todoId`)
    .reply((config: any) => {
        try {
            const {todoId} = config.routeParams;
            const targetIndex = todos.findIndex((value: Todo) => value.todoId + '' === todoId);
            if (targetIndex > -1) {
                return [200, todos[targetIndex]];
            } else {
                return [404, null];
            }
        } catch (error) {
            console.error(error);
            return [500, {message: 'Internal server error'}];
        }
    })
    .onGet(`${todoUri}`)
    .reply(() => {
        try {
            return [200, todos];
        } catch (error) {
            console.error(error);
            return [500, {message: 'Internal server error'}];
        }
    })
    .onPost(`${todoUri}`)
    .reply((config: any) => {
        try {
            const targetTodo: Todo = {
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
            const targetIndex = todos.findIndex((value: Todo) => value.todoId + '' === todoId);
            let isDeleted = false;
            if (targetIndex > -1) {
                todos.splice(targetIndex, 1);
                isDeleted = true;
            }
            return [
                200,
                {
                    isDeleted,
                    targetId: todoId
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
            const targetIndex = todos.findIndex((value: Todo) => value.todoId + '' === targetTodo.todoId);
            let isUpdated = false;
            if (targetIndex) {
                todos[targetIndex] = targetTodo;
                isUpdated = true;
            }
            return [
                200,
                {
                    isUpdated,
                    targetTodo
                }
            ];
        } catch (error) {
            console.error(error);
            return [500, {message: 'Internal server error'}];
        }
    });
