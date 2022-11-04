<template>
    <div class="todo-item">
        <div class="todo-item-end">
            <div class="todo-input">
                <input type="text" class="todo-input-control" :value="content" @keyup.enter.prevent="onEnterHandler" />
            </div>
            <div class="todo-thumb">
                <button @click="onClickDeleteHanlder">삭제</button>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.todo-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    .todo-item + .todo-item {
        margin-top: 0.8rem;
    }

    .todo-item-end {
        display: flex;
        align-items: center;
        margin-left: 0.8rem;
    }

    .todo-checkbox-control {
        width: 1.6rem;
        height: 1.6rem;
        border: 1px solid #b7b7b7;
    }

    .todo-input-control {
        padding: 0.8rem;
        width: 21rem;
        height: 2.4rem;
        border: 1px solid #b7b7b7;
    }

    .todo-thumb {
        position: relative;
        overflow: hidden;
        display: block;
        margin-left: 0.4rem;
        border-radius: 0.4rem;
        width: 3.4rem;
    }

    .todo-thumb-image {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>

<script lang="ts">
import {Todo} from '@/mock';
import {Component, Vue, Prop} from 'vue-property-decorator';
import InputComponent from './form/InputComponent.vue';

@Component({
    components: {
        InputComponent
    }
})
export default class TodoItemComponent extends Vue {
    @Prop({
        default: function () {
            return null;
        }
    })
    public readonly item?: Todo;

    get content() {
        return this.item?.content;
    }

    public onClickDeleteHanlder() {
        this.$emit('removeTodo', {
            todoId: this.item?.todoId
        });
    }

    public onEnterHandler(event: KeyboardEvent) {
        this.$emit('modifyTodo', {
            todoId: this.item?.todoId,
            content: (event.target as HTMLInputElement).value
        });
    }
}
</script>
