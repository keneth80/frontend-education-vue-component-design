<template>
    <div class="editor-second">
        <div class="editor-header">
            <input type="text" v-model="title" />
            <button @click="onClickAddContent">사진</button>
            <button @click="onClickAddContent">추가</button>
            <button @click="onClickAddContent">삭제</button>
        </div>
        <div class="editor-body">
            <textarea v-model="contents" />
        </div>
    </div>
</template>

<style lang="scss">
.editor-second {
    .editor-header {
        text-align: right;
        padding: 5px;
        display: flex;
        gap: 10px;
        input {
            float: left;
            width: 258px;
        }
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
export default class EditorComponentSecond extends Vue {
    public title = '';
    public contents = '';

    public onClickAddContent() {
        this.$emit('addTodo', {
            title: this.title,
            content: this.contents
        });
    }
}
</script>
