<template>
    <div class="title">
        <label>{{ title }}</label>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class TitleComponent extends Vue {
    @Prop({
        default: function () {
            return '';
        }
    })
    public title?: string;
}
</script>
