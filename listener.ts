/// <reference path="../../libs/AppActivity.d.ts" />

//the AppActivity adm is native to the activity-sdk
import { AppActivity } from "@geocortex/workflow/runtime/app/AppActivity";
import { RegisterCustomFormElementBase } from "@geocortex/workflow/runtime/app/RegisterCustomFormElementBase";

/** An interface that defines the inputs of the activity. */
export interface ListeningMonitorInputs {
    // @displayName EventName
    // @description The first input to the activity.
    // @required
    eventName?: string;

    // @displayName JSONinputs
    // @description The second input to the activity.
    JSONinputs?: JSON;

    // @displayName WorkflowURL
    // @description The second input to the activity.
    workflowURL?: string;
}

/** An interface that defines the outputs of the activity. */
export interface ListeningMonitorOutputs {
    /** A result of the activity. */
    // @description The result of the activity.
    yet_unknown: string;
}

// @displayName ListeningMonitor
// @category Custom Activities
// @description A description of the activity.
export class ListeningMonitor extends AppActivity{
    // The unique identifier of the activity.
    // This value should not be changed once an activity has been published.
    static action = "uuid:ea::Listennpm insanpingMonitor";

    // The identifier of the suite of activities that this activity belongs to.
    // This value should not be changed once an activity has been published.
    static suite = "uuid:ea";

    // Perform the execution logic of the activity.
    async execute(inputs: ListeningMonitorInputs): Promise<ListeningMonitorOutputs> {

        var today = new Date();
        var dd = String(today.getDate());
        var mm = String(today.getMonth() + 1);
        var yyyy = today.getFullYear();

        var basemapLayers = []
        var layerList = this.app.layerList.children.value;
        for (var i = 0; i < layerList.length; i++) {
            var layer = layerList[i];
            if (layer.name.value == "Base Maps") {
                var basemapChildren = layer.children.value;
                for (var j = 0; j < basemapChildren.length; j++) {
                    basemapLayers.push(basemapChildren[j].name.value);
                }
            }
        };

        if (inputs.eventName == "LayerClickedEvent"){
            this.app.eventRegistry.event(inputs.eventName).subscribe(this, (e,subscriptions) => {
                if (basemapLayers.includes(e.name.value)){
                    if (e.isVisible.value == true){
                        this.app.commandRegistry.command("RunWorkflowByUrlAndInputs").execute({
                            "url" : inputs.workflowURL,
                            "layer" : e.name.value,
                            "site" : inputs.JSONinputs.site,
                            "user" : inputs.JSONinputs.user,
                            "date" : String(mm+"_"+dd+"_"+yyyy)
                    })
                }
                }
            });
        };
        return { yet_unknown: "Listening" };
    }
}