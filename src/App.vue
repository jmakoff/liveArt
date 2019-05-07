<template>
  <div class="wrapper">
    <div id="canvas">
      <canvas id="fabric-canvas"></canvas>
      <el-row style="margin-top: 15px;">
        <el-button
          @click="$emit('rollback')"
          plain size="medium"
          icon="el-icon-d-arrow-left"
        ></el-button>
        <el-button
          @click="$emit('forward')"
          plain size="medium"
          icon="el-icon-d-arrow-right"
        ></el-button>
        <el-tooltip content="To Front">
          <el-button
            @click="$emit('toFront', activeObject)"
            plain size="medium"
            icon="el-icon-upload2"
            :disabled="!activeObject.id"
          ></el-button>
        </el-tooltip>
        <el-tooltip content="To Back">
          <el-button
            @click="$emit('toBack', activeObject)"
            plain
            size="medium"
            icon="el-icon-download"
            :disabled="!activeObject.id"
          ></el-button>
        </el-tooltip>
        <el-button
          @click="$emit('delete', activeObject)"
          type="danger"
          plain
          size="medium"
          icon="el-icon-delete"
          :disabled="!activeObject.id"
        ></el-button>
      </el-row>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Text" name="first">
        <el-input
          placeholder="Your Text Here"
          v-model="textForm.value"
          clearable
          style="margin-top: 15px;"
        ></el-input>
        <el-row style="margin-top: 15px; display: flex;">
          <el-select v-model="textForm.font" placeholder="Select Font" style="margin-right: 15px;">
            <el-option label="ZCOOL KuaiLe" value="ZCOOL KuaiLe"></el-option>
            <el-option label="Roboto" value="Roboto"></el-option>
          </el-select>
          <el-color-picker v-model="textForm.fill" style="margin-right: 15px;"></el-color-picker>
          <el-button
            size="medium"
            @click="handleAddText"
            type="primary"
            :disabled="!textForm.value">Add Text</el-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Image" name="second">
        <el-row style="margin-top: 15px;">
          <el-input
            placeholder="Image URL"
            v-model="imageUrl"
            cleareble>
            <el-button
              @click="$emit('addImageByURL', imageUrl)"
              slot="append"
            >Add</el-button>
          </el-input>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Import/Export" name="third">
        <el-row style="margin-top: 15px;">
          <el-button
            size="medium"
            type="primary"
            @click="$emit('exportSVG')"
          >Export SVG</el-button>
           <el-input
            placeholder="svg URL to import"
            v-model="svgURL"
            cleareble>
            <el-button
              @click="$emit('importSvgByURL', svgURL)"
              slot="append"
            >Import</el-button>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-row>
       <label style="margin-top: 15px;">
            Chosen ID:
            <span>{{activeObject.id ? activeObject.id : "not chosen"}}</span>
          </label>
      <el-table
        :data="objectsList"
        :row-class-name="highlightSelectedLine">
        <el-table-column
          prop="id"
          label="Id">
        </el-table-column>
        <el-table-column
          prop="type"
          label="Type">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ElementUI from "element-ui";
import fabric from "fabric";

Vue.use(ElementUI);
Vue.use(fabric);
export default Vue.extend({
  data() {
    return {
      objectsList: [],
      activeObject: {
        id: null,
        obj: null,
        type: null,
      },
      activeName: "first",
      textForm: {
        value: "",
        font: "Roboto",
        fill: "#409EFF",
      },
      imageUrl: '',
      svgURL: '',
    };
  },
  methods: {
    setData(payload) {
      if (payload.textValue) this.textValue = payload.textValue;
      if (payload.activeName) this.activeName = payload.activeName;
      if (payload.textForm) this.textForm = payload.textForm;
      if (payload.objectsList) this.objectsList = payload.objectsList;
    },
    setObjectsList(list) {
      this.objectsList = list
    },

    setActiveObject(value) {
      this.activeObject = value
    }

    handleAddText() {
      this.$emit("addText", this.textForm);
    },

    highlightSelectedLine ({ row }) {
      if (this.activeObject && this.activeObject.id == row.id) {
        return 'chosen-row'
      }
    }
  }
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto');
@import url('https://fonts.googleapis.com/css?family=ZCOOL+KuaiLe');

.container {
  color: green;
}
.el-table .chosen-row {
  background-color: lightgreen;
}
</style>