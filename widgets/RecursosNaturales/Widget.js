define(['dojo/_base/declare',
        'jimu/BaseWidget',
        'esri/layers/FeatureLayer',
        'esri/tasks/query',
        'dojox/grid/DataGrid',
        'dojo/data/ItemFileReadStore',
        'dojo/date/stamp',
        'dojo/date/locale',
        'dijit/form/Button',
        'dojo/domReady!',
        'dojo'],
function(declare,BaseWidget,FeatureLayer,Query,DataGrid, ItemFileReadStore, stamp, locale, Button,dojo) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-demo',
    grid:null,

    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');

    },

    startup: function() {
      this.inherited(arguments);
      //this.mapIdNode.innerHTML = 'map id:' + this.map.id;
      console.log('startup');
      var featureLayer = new FeatureLayer('https://services.arcgis.com/8DAUcrpQcpyLMznu/arcgis/rest/services/widget_RN/FeatureServer/0');
      var query = new Query();
      //query.objectIds = [features[0].attributes.OBJECTID];
      query.where = "1=1";
      query.outFields = [ "nombre","fecha","url_servicio","url_documento"];
      featureLayer.queryFeatures(query).then((res) =>{
        //this.crearTabla(res);
      this.cargarDatos(res.features);
      });


    },




    onOpen: function(){
      console.log('onOpen');


    },

    cargarDatos: function(data){
      var array=[];
      data.map(d=>{
        array.push(d.attributes);
      });
      console.log(array);
      this.crearTabla(array);
    },
    crearTabla: function(data){
      console.log("creartable",data);
      var layout = [
            {name: 'Nombre', field: 'nombre'},
            {name: 'Servicio', field: 'url_servicio', width: 6,
                formatter: this.cargarCapa    /*Custom format, add a button. */
            },
            {name: 'Documento', field: 'url_documento', width: 9,
                formatter: this.verDocumento    /*Custom format, add a button. */
            },
            {name: 'Fecha', field: 'fecha'},
      ];
      var store = new ItemFileReadStore({
            data: {
                identifier: "nombre",
                items: data

            }
        });
        this.grid = new DataGrid({
            id: 'grid',
            store: store,
            structure: layout,
            autoWidth: true,
            autoHeight: true
        });
        this.grid.placeAt('gridContainer');
        this.grid.startup();

    },

    formatter: function(){
            var w = new Button({
                label: "ver Documento",
                onClick: function() {
                    alert("Thanks for all the fish.  ");
                }
            });
            w._destroyOnRemove=true;
            return w;
    },

     formatDate:function(datum){
           /* Format the value in store, so as to be displayed.*/
           var d = stamp.fromISOString(datum);
           return locale.format(d, {selector: 'date', formatLength: 'long'});
       },

       verDocumento: function(url){
         console.log(url);
         var w = new Button({
             label: "Ver Documento",
             onClick: function() {
                 console.log("vamos al documento");
                 window.open(url);
             }
         });
         w._destroyOnRemove=true;
         return w;
       },

       cargarCapa:function(urlServicio){
         console.log(urlServicio);
         var x = new Button({
             label: "Agregar",
             onClick: function() {
                 console.log("vamos a agregar capa");
                 window.open(urlServicio);
             }
         });
         x._destroyOnRemove=true;
         return x;
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
