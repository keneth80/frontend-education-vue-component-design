<template>
    <div class="todo-list">
        <todo-item-component />
        <template v-if="todoList?.length">
            <todo-item-component v-for="(todo, index) in todoList" :key="index" />
            <!-- <todo-item-component-second v-for="(todo, index) in todoList" :key="index" /> -->
        </template>
        <template v-else>
            <label>등록된 TODO가 없습니다.</label>
        </template>
    </div>
</template>

<style lang="scss">
.todo-list {
    max-height: 250px;
}
</style>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import TodoItemComponent from './TodoItemComponent.vue';
import TodoItemComponentSecond from './TodoItemComponentSecond.vue';

@Component({
    components: {
        TodoItemComponent,
        TodoItemComponentSecond
    }
})
export default class TodoListComponent extends Vue {
    @Prop({
        default: function () {
            return [];
        }
    })
    public todoList?: Array<any>;
}
</script>
