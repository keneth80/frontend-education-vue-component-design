<template>
    <div class="todo">
        <title-component :title="title" />
        <editor-component @addTodo="onAddTodoHandler" />
        <todo-list-component :todoList="todoList" />
    </div>
</template>

<style lang="scss">
.todo {
    display: inline-block;
    min-width: 415px;
}
</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import TitleComponent from '@/components/TitleComponent.vue';
import EditorComponent from '@/components/EditorComponent.vue';
import EditorComponentSecond from '@/components/EditorComponentSecond.vue';
import TodoListComponent from '@/components/TodoListComponent.vue'; // @ is an alias to /src
import {Http, CustomHttpResponse} from '../utils/http/http-client';
import {map} from 'rxjs/operators';

@Component({
    components: {
        TitleComponent,
        EditorComponent,
        EditorComponentSecond,
        TodoListComponent
    }
})
export default class LayoutView extends Vue {
    private userName = '';
    private userId = 1;
    private todoListValue = [];

    get title(): string {
        return `TODO List ${this.userName}`;
    }

    get todoList(): Array<any> {
        return this.todoListValue;
    }

    public onAddTodoHandler(value: any) {
        console.log('onAddTodoHandler : ', value);
    }

    protected created() {
        const searchParams = new URLSearchParams(document.location.search);
        this.userId = parseInt(searchParams.get('userId') || '1');
        Http.get(`/users/${this.userId}`)
            .pipe(
                map((response: CustomHttpResponse<{userId: number; nickname: string}>) => {
                    return response.data;
                })
            )
            .subscribe((result: {userId: number; nickname: string}) => {
                this.userName = result.nickname;
            });

        Http.post('/todos', {
            content: 'test1'
        }).subscribe((result: any) => {
            console.log('result.post : ', result);
        });

        Http.post('/todos', {
            content: 'test2'
        }).subscribe((result: any) => {
            console.log('result.post2 : ', result);
        });

        Http.delete('/todos/1', {}).subscribe((result: any) => {
            console.log('result.delete : ', result);
        });

        Http.put('/todos', {
            todoId: 0,
            content: 'modify'
        }).subscribe((result: any) => {
            console.log('result.put : ', result);
        });
    }
}
</script>
