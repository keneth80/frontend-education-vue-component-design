<template>
    <div class="todo-item-second">
        <div class="todo-item-start">
            <div class="todo-checkbox">
                <input type="checkbox" class="todo-checkbox-control" />
            </div>
        </div>
        <div class="todo-item-end">
            <div class="todo-input">
                <input type="text" class="todo-input-control" />
            </div>
            <div class="todo-thumb">
                <img src="https://dummyimage.com/200x200/61d2ff/fff" class="todo-thumb-image" alt="thumbnail" />
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.todo-item-second {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    .todo-item-second + .todo-item-second {
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
        width: 20rem;
        height: 2.4rem;
        border: 1px solid #b7b7b7;
    }

    .todo-thumb {
        --sc-aspect-ratio: 100%;

        position: relative;
        overflow: hidden;
        display: block;
        margin-left: 0.4rem;
        border-radius: 0.4rem;
        width: 2.4rem;
    }

    .todo-thumb::before {
        content: '';
        display: block;
        padding-top: var(--sc-aspect-ratio);
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
import {Component, Vue, Prop} from 'vue-property-decorator';

export interface TodoItem {
    title?: string;
    contents: string;
}

@Component
export default class TodoItemComponentSecond extends Vue {
    @Prop({
        default: function () {
            return null;
        }
    })
    public readonly item?: TodoItem;
}
</script>
