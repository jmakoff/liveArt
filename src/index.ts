import Vue from "vue";
import App from "./App.vue";
import fontFaceObserver from 'fontfaceobserver';

import DesignerCanvas from "./designerCanvas";

const viewModel = new Vue(App).$mount("#app");
const canvas = new DesignerCanvas();

viewModel.setData({
  textValue: "",
  activeName: "first",
  form: {
    name: "",
    font: "first_font",
    fill: "#409EFF"
  },
});
viewModel.setObjectsList(canvas.list);
viewModel.setActiveObject(canvas.activeObject);

viewModel.$on("addText", async function(form: object) {
  await new fontFaceObserver(form.font).load()
  const newText = canvas.addText(form.value, { fill: form.fill, fontFamily: form.font });
});

viewModel.$on("delete", function(activeObject) {
  canvas.remove(activeObject.obj)
})

viewModel.$on("toBack", function(activeObject) {
  canvas.toBack(activeObject.obj)
})

viewModel.$on("toFront", function(activeObject) {
  canvas.toFront(activeObject.obj)
})

viewModel.$on("addImageByURL", function(imageUrl) {
  canvas.addImageByURL(imageUrl)
})

viewModel.$on("exportSVG", function() {
  canvas.exportSVG()
})

viewModel.$on("importSvgByURL", function(svgURL) {
  canvas.importSVG(svgURL)
})

viewModel.$on("rollback", function() {
  canvas.rollback();
})

viewModel.$on("forward", function() {
  canvas.forward();
})

//predefined objects

/*canvas.addRect("#ff0000", 10);
canvas.addRect("#ff0000", 10);*/
canvas.addRect("#00ff00", 20);
canvas.addRect("#0000ff", 30);
canvas.addRect("#ffff00", 40);
canvas.addRect("#ff0123", 10);
canvas.addCircle("#ff0123", 10);
canvas.addText("I'm at bold text", {
  fontWeight: "bold",
  fill: "red"
});

