# NewRelicInsightsReducer
This is a module that will help you reduce large amounts of data contained within in New Relic's Insights database.

## Intro

## Installation

## Examples

## Parameters
* **accountId** - **INT** - Your New Relic account id. This is a required parameter. If you need help finding your account id see [New Relic's documentation here](https://docs.newrelic.com/docs/accounts-partnerships/accounts/account-setup/account-id).  

* **retroactive** - **BOOL** - This determines whether the module will process data retroactively. More information coming.  

* **cadence** - **INT** - The number of hours you want your reduction events to cover. For example: supplying **6** would process 6 hours of data into reduced events. This means that each new reduced event would contains 6 hours worth of data in each newly created event. This is a required parameter.  

* **queryKey** - **STRING** - This is an API key that is generated within the New Relic UI that allows you to query your data. This is a required parameter. If you need help generating your query key see [New Relic's documentation here](https://docs.newrelic.com/docs/insights/insights-api/get-data/query-insights-event-data-api#register) . 

* **insertKey** - **STRING** - This is an API key that is generated within the New Relic UI that allows you to insert your data. This is a required parameter. If you need help generating your insert key see [New Relic's documentation here](https://docs.newrelic.com/docs/insights/insights-api/get-data/query-insights-event-data-api#register) . 

* **applicationIds** - **ARRAY** - This is not a required parameter. Should you want to filter your data reduction to certain applications, you can supply the specific application ids in this array. If you need help finding your application ids see [New Relic's documentation here](https://docs.newrelic.com/docs/apis/rest-api-v2/api-explorer-v2/retrieve-metric-timeslice-data-your-app-explorer#app_id) . 

* **events** - **ARRAY** - This is a required parameter. This parameter will decide which events you are reducing, what they will be named and which attributes you will be faceting, and sub-faceting, them off of. Let's review the event API below:  
    
    * **EVENT.start** - **INT** - Unix timestamp.
    * **EVENT.end** - **INT** - Unix timestamp.
    * **EVENT.oldEventName** - **STRING** - The name of the event that you want to target. For example, typical use cases here would be **Transaction**, **PageView**, **TransactionError** or any other out of the box or custom event that is being captured by New Relic Insights.
    * **EVENT.newEventName** - **STRING** - This is the name that will be given to the newly created, reduced event. Some examples may be **CustomTransactionEvent** or **ReducedTransactionEvent**. This really depends on your preference as it will be the name you use to query the new events within New Relic's Insights.
    * **EVENT.facets** - **ARRAY** - This is a required parameter. This parameter will decide how to facet, sub-facet and run custom filters the events you are reducing. Let's review some examples of the EVENT.facets API below:
        ```javascript
        var facetsArray = 
        [
          {
            //
            //The "facet" property is required. 
            //It's the name of the event property that you want to facet.
            facet : "name",
            //
            //Want to sub-facet? You can! 
            //Below, if the event.facet.name == "Controller/Car_details/show"
            //then those events will be sub-faceted based on their "car_status" property.
            subFacet : 
            [
              {
              facetValue : "Controller/Car_details/show"
              subFacetProperty : "car_status"
              }
            ],
            //
            //You can't use a "subFacet" and a "customFilter" in the same facet object.
            //Look at the facet object below for a "customFilter" usage example.
            customFilter : undefined 
          },
          {
            //
            //The "facet" property is required. 
            //It's the name of the event property that you want to facet.
            facet : "userAgent",
            //
            //You can't use a "subFacet" and a "customFilter" in the same facet object.
            //Look at the facet object above for a "subFacet" usage example.
            subFacet : undefined,
            //
            //The custom filter is a synchronus function. Avoid network calls here.
            //The function passed in here should accept a STRING and return a STRING.
            //In this example, I am imitating filtering the "userAgent" and I would
            //want this function to map "userAgent" to a reduced value of "Mobile",
            //"Tablet", "Desktop" or "Bot". So, instead of returning a reduced event
            //for each unique "userAgent" they would be mapped only to these 4 values.
            customFilter : function(facet){
                //do nothing with the facet value because this is a fake function
                var fakeFilterValues = ["Tablet","Desktop","Bot","Mobile"];
                //and return a random value because this is a fake function
                return fakeFilterValue[ Math.floor(Math.random() * fakeFilterValues.length) ];
                //the return value will replace the original value of "userAgent"
                //which is passed in as the facet parameter
            },
            //
          },
        ]
        ```
    * **EVENT.durations** - **ARRAY** - This is not a required parameter. This parameter will decide how you new custom event will record durations. Let's review some examples of the EVENT.durations API below:
        ```javascript
        var durationsArray = 
        [
          {
            //
            //The "name" property is required. 
            //It's the name of the event's duration property that you want to retrieve.
            name : "duration",
            //
            //Want to percentiles of duration? You got it! 
            //This is a required parameter. Atleast one value must be supplied.
            //The options are as follows:
            values : 
            [
              "min","max",5,10,50,90,95
            ],
          }
        ]
        ```
  


