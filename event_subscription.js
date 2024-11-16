/// <reference path="../../libs/AppActivity.d.ts" />

//the AppActivity adm is native to the activity-sdk
import { AppActivity } from "@geocortex/workflow/runtime/app/AppActivity";
import { RegisterCustomFormElementBase } from "@geocortex/workflow/runtime/app/RegisterCustomFormElementBase";

/** An interface that defines the inputs of the activity. */
export interface EventSubscriptionInputs {
    // @displayName eventName
    // @description The first input to the activity.
    // @required
    eventName?: string;

    // @displayName workflowURL
    // @description The second input to the activity.
    workflowURL?: string;
}

/** An interface that defines the outputs of the activity. */
export interface EventSubscriptionOutputs {
    /** A result of the activity. */
    // @description The result of the activity.
    result: string;
}

// @displayName EventSubscription
// @category Custom Activities
// @description A description of the activity.
export class EventSubscription extends AppActivity{
    // The unique identifier of the activity.
    // This value should not be changed once an activity has been published.
    static action = "uuid:a::EventSubscription";

    // The identifier of the suite of activities that this activity belongs to.
    // This value should not be changed once an activity has been published.
    static suite = "uuid:ea";

    // Perform the execution logic of the activity.
    async execute(inputs: EventSubscriptionInputs): Promise<EventSubscriptionOutputs> {

        var a = this.app;
        var m = this.map;
        var s = this.site;

        console.log("subscribing to" + inputs.eventName);

        if (inputs.eventName == "TraceEvent"){
            this.app.eventRegistry.event(inputs.eventName).subscribe(this, (e,error) => {
                    if (e.message == "We can't add the same service layer twice to the layer list"){
                        this.app.commandRegistry.command("RunWorkflowByUrl").execute(inputs.workflowURL);
                    }
                });
            }

            else if (inputs.eventName == "newROW_BUTTON"){
                var viewed = false;
                this.app.eventRegistry.event("FolderClickedEvent").subscribe(this, (e,subscriptions) => {
                    debugger;
                        if (e.name.value == "Land" && !viewed){
                            viewed = true
                            this.app.commandRegistry.command("RunWorkflowByUrlAndInputs").execute({"url": inputs.workflowURL,"inputs": inputs.eventName})
                        }
                    }
                )
            }

            else if (inputs.eventName == "FolderClickedEvent"){
                var viewed = false;
                this.app.eventRegistry.event(inputs.eventName).subscribe(this, (e,subscriptions) => {
                        if (e.id.value == "Sage Grouse Wyoming Game & Fish" && !viewed){
                            viewed = true
                            this.app.commandRegistry.command("RunWorkflowByUrl").execute(inputs.workflowURL)
                        }
                    }
                )
            }

            else if (inputs.eventName == "ResultsTableFeatureClickedEvent"){
                this.app.eventRegistry.event(inputs.eventName).subscribe(this, (e,subscriptions) => {
                    this.app.commandRegistry.command("RemoveNotification").execute("WorkflowNotification")
                    }
                )
            }

            else if (inputs.eventName == "ResultsViewClosedEvent"){
                this.app.eventRegistry.event(inputs.eventName).subscribe(this, (e,subscriptions) => {
                    this.app.commandRegistry.command("RunWorkflowByUrl").execute(inputs.workflowURL)
                    }
                )
            };
        return { result: "Event Subscribed" };
    }
}