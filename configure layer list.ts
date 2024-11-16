

/// <reference path="../../libs/AppActivity.d.ts" />

//the AppActivity adm is native to the activity-sdk
import { AppActivity } from "@geocortex/workflow/runtime/app/AppActivity";

//note that import "require" uses the node.js loader specification
import esriConfig = require("esri/config");

//we can also utilize the esri global variable at runtime.
//references to the esri.js causing tranpile error so declare as type any (no intellisense support)
declare var esri: any;


//note that import "from" style uses the javscript ES modules loader specification
//this is also having issues adding a definition file but still works at runtime
//better to go throuh AppActivity if possible... for example, this.app.layerList
/*  import { LayerList } from "geocortex/infrastructure/layerList/LayerList"; */



/** An interface that defines the inputs of the activity. */
export interface RemoveFromLayerListInputs {
    // @displayName Map Service ID (Removed)
    // @description The first input to the activity.
    // @required
    
    //input layers from the workflow
    serviceId?: string;

    // @displayName Layer ID (Removed)
    // @description The second input to the activity.
    layerId?: string;
}

/** An interface that defines the outputs of the activity. */
export interface RemoveFromLayerListOutputs {
    /** A result of the activity. */
    //this is where the activity should set the value of "includeInLayerList" of the layer to false

    //includeInLayerList= false;
    // @description The result of the activity.
    result: string;
}

// note tht the class extends AppActivity
// @displayName RemoveFromLayerList
// @category Custom Activities
// @description A description of the activity.
export class RemoveFromLayerList extends AppActivity{
    // The unique identifier of the activity.
    // This value should not be changed once an activity has been published.
    static action = "uuid:9386f870-62d2-42a6-a7ea-41986905f3ea::RemoveFromLayerList";

    // The identifier of the suite of activities that this activity belongs to.
    // This value should not be changed once an activity has been published.
    static suite = "uuid:9386f870-62d2-42a6-a7ea-41986905f3ea";

    // Perform the execution logic of the activity.
    async execute(inputs: RemoveFromLayerListInputs): Promise<RemoveFromLayerListOutputs> {

        var layerList = this.app.layerList.children.value;

        for (var i = 0; i < layerList.length; i++) {
            var layer = layerList[i];
            if (layer.name.value=="Layer Catalog"){
                layer.name.set("PLC & User Added Layers");

                var layerListInner = layer.children.value;
                for (var j=0; j < layerListInner.length; j++){
                    var layerInner = layerListInner[j];
                    if (layerInner.name.value == "Proposed Assets"){
                        layerInner.isExpanded.set(false);
                    }

                    var layerListPLCFolders = layerInner.children.value;
                    for (var k=0; k < layerListPLCFolders.length; k++){
                        var PLCFolder = layerListPLCFolders[k];
                        switch(PLCFolder.name.value){
                            case "folder1":
                                PLCFolder.isExpanded.set(false);
                                break;
                            case "folder2":
                                PLCFolder.isExpanded.set(false);
                                break;
                            case "folder3":
                                PLCFolder.isExpanded.set(false);
                                PLCFolder.setItemVisibility(false);
                                break;
                            case "folder4":
                                PLCFolder.isExpanded.set(false);
                                PLCFolder.setItemVisibility(false);
                                break;
                        }
                        var PLCLayers = PLCFolder.children.value;
                        for (var l=0; l < PLCLayers.length; l++){
                            var PLCLayersVis = PLCLayers[l];
                            switch(PLCLayersVis.name.value) {
                                case "layer 1":
                                    PLCLayersVis.setItemVisibility(false);
                                    break;
                                case "layer 2":
                                    PLCLayersVis.setItemVisibility(false);
                                    break;
                                case "layer 3":
                                    PLCLayersVis.setItemVisibility(false);
                                    break;
                                case "layer 4":
                                    PLCLayersVis.setItemVisibility(false);
                                    break;
                                case "layer 5":
                                    PLCLayersVis.setItemVisibility(false);
                                    break;
                                case "layer 6":
                                    PLCLayersVis.setItemVisibility(false);
                                    break;
                                case "layer 7":
                                    PLCLayersVis.setItemVisibility(false);
                                    break;
                                case "layer 8":
                                    PLCLayersVis.setItemVisibility(false);
                                    break;
                                case "layer 9":
                                    PLCLayersVis.setItemVisibility(false);
                                    break;
                                case "layer 10":
                                    PLCLayersVis.setItemVisibility(false);
                                    break;
                                case "layer 11":
                                    PLCLayersVis.setItemVisibility(false);
                                    break;
                                case "layer 12":
                                    PLCLayersVis.setItemVisibility(false);
                                    break;
                                case "layer 13":
                                    PLCLayersVis.setItemVisibility(false);
                                    break;
                                case "layer 14":
                                    PLCLayersVis.setItemVisibility(false);
                                    break;
                                    
                            }
                        } 
                    }
                
                }
            }
        }
        return { result: "test" };
        
    }
}
