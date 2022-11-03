<template>
    <div class="todo-input">
        <input ref="input" type="text" class="todo-input-control" />
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
import {debounceTime, distinctUntilChanged, fromEvent, Subscription} from 'rxjs';
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class InputComponent extends Vue {
    @Prop({
        default: function () {
            return '';
        }
    })
    public readonly input?: string;

    private subscription: Subscription = new Subscription();

    protected mounted() {
        this.subscription.add(
            fromEvent(this.$refs.input as HTMLElement, 'input').subscribe((event: Event) => {
                const textValue = (event.target as HTMLInputElement).value;
                this.$emit('changeContent', {
                    content: textValue
                });
            })
        );
    }

    protected destroyed() {
        this.subscription.unsubscribe();
    }
}
</script>
