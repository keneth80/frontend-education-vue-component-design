<template>
    <div class="editor">
        <div class="editor-header">
            <button @click="onClickAddContent">추가</button>
        </div>
        <div class="editor-body">
            <textarea v-model="contents" />
        </div>
    </div>
</template>

<style lang="scss">
.editor {
    .editor-header {
        text-align: right;
        padding: 5px;
    }

    .editor-body {
        padding: 5px;

        textarea {
            width: 100%;
            height: 100px;
        }
    }
}
</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class EditorComponent extends Vue {
    public contents = '';

    public onClickAddContent() {
        this.$emit('addTodo', {
            content: this.contents
        });
    }
}
</script>
