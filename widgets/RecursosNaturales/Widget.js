define(['dojo/_base/declare',
        'jimu/BaseWidget',
        'esri/layers/FeatureLayer',
        'esri/tasks/query'],
function(declare,BaseWidget,FeatureLayer,Query) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-demo',

    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');
    },

    startup: function() {
      this.inherited(arguments);
      this.mapIdNode.innerHTML = 'map id:' + this.map.id;
      console.log('startup');

      // featureLayer.queryIds(query, function(objectIds) {
      //   //do something with the objectIds here
      // });
    },

    onOpen: function(){
      console.log('onOpen');
      var featureLayer = new FeatureLayer('https://services.arcgis.com/8DAUcrpQcpyLMznu/arcgis/rest/services/widget_RN/FeatureServer/0');
      var query = new Query();
      //query.objectIds = [features[0].attributes.OBJECTID];
      query.where = "1=1";
      query.outFields = [ "nombre","fecha","url_servicio","url_documento"];
      featureLayer.queryFeatures(query, function(featureSet) {
        console.log(featureSet.features);
      });
    },

    onClose: function(){
      console.log('onClose');
    },

    onMinimize: function(){
      console.log('onMinimize');
    },

    onMaximize: function(){
      console.log('onMaximize');
    },

    onSignIn: function(credential){
      /* jshint unused:false*/
      console.log('onSignIn');
    },

    onSignOut: function(){
      console.log('onSignOut');
    },

    showVertexCount: function(count){
      this.vertexCount.innerHTML = 'The vertex count is: ' + count;
    }
  });
});
