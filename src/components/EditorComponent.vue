<template>
    <div class="editor">
        <div class="editor-header">
            <button @click="onClickAddContent">추가</button>
        </div>
        <div class="editor-body">
            <text-area-component @changeContent="onChangeContentHandler" />
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
import TextAreaComponent from './form/TextAreaComponent.vue';

@Component({
    components: {
        TextAreaComponent
    }
})
export default class EditorComponent extends Vue {
    private contents = '';

    public onClickAddContent() {
        this.$emit('addTodo', {
            content: this.contents
        });
    }

    public onChangeContentHandler(value: any) {
        this.contents = value.content;
        console.log('onChangeContentHandler : ', value.content);
    }
}
</script>
