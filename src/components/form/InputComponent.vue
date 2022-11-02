<template>
    <div class="todo-input">
        <input type="text" class="todo-input-control" />
    </div>
</template>
<style lang="scss">
.todo-input-control {
    padding: 0.8rem;
    width: 19rem;
    height: 2.4rem;
    border: 1px solid #b7b7b7;
}
</style>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class InputComponent extends Vue {
    @Prop({
        default: function () {
            return '';
        }
    })
    public readonly input?: string;
}
</script>
