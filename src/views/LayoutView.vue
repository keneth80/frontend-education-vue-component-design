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
import TodoListComponent from '@/components/TodoListComponent.vue';
import {getTodoWithUser, addTodo, getTodos} from '@/controller';
import {User, Todo} from '@/mock';
import {switchMap} from 'rxjs';

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
    private todoListValue: Array<Todo> = [];

    get title(): string {
        return `TODO List ${this.userName}`;
    }

    get todoList(): Array<Todo> {
        return this.todoListValue;
    }

    public onAddTodoHandler({content}: any) {
        console.log('onAddTodoHandler : ', content);

        if (!content || !content.trim().length) return;

        addTodo({
            user_id: this.userId,
            content
        })
            .pipe(
                switchMap(() => {
                    return getTodos(this.userId);
                })
            )
            .subscribe((response: Array<Todo>) => {
                this.todoListValue = response;
                console.log('this.todoListValue : ', this.todoListValue);
                alert('추가되었습니다.');
            });
    }

    protected created() {
        const searchParams = new URLSearchParams(document.location.search);
        this.userId = parseInt(searchParams.get('userId') || '1');
        getTodoWithUser(this.userId).subscribe((response: {user: User; todos: Array<Todo>}) => {
            this.userName = response.user.nickName;
            this.todoListValue = response.todos;
            console.log('getTodoWithUser : ', response);
        });
    }
}
</script>
