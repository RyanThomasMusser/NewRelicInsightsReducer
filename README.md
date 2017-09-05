# NewRelicInsightsReducer
This is a module that will help you reduce large amounts of data contained within in New Relic's Insights database.

## Intro

## Installation

## Examples

## Parameters
* **accountId** - **INT** - Your New Relic account id. This is a necessary parameter. If you need help finding your account id see [New Relic's documentation here](https://docs.newrelic.com/docs/accounts-partnerships/accounts/account-setup/account-id).  
* **retroactive** - **BOOL** - This determines whether the module will process data retroactively. More information coming.
* **cadence** - **INT** - The number of hours you want your reduction events to cover. For example: supplying **6** would process 6 hours of data into reduced events. This means that each new reduced event would contains 6 hours worth of data in each newly created event. This is a necessary parameter.
* **queryKey** - **STRING** - This is an API key that is generated within the New Relic UI that allows you to query your data. This is a necessary parameter. If you need help generating your query key see [New Relic's documentation here](https://docs.newrelic.com/docs/insights/insights-api/get-data/query-insights-event-data-api#register)
* **insertKey** - **STRING** - This is an API key that is generated within the New Relic UI that allows you to insert your data. This is a necessary parameter. If you need help generating your insert key see [New Relic's documentation here](https://docs.newrelic.com/docs/insights/insights-api/get-data/query-insights-event-data-api#register)
* **applicationIds** - **ARRAY** - This is not a necessary parameter. Should you want to filter your data reduction to certain applications, you can supply the specific application ids in this array. If you need help finding your application ids see [New Relic's documentation here](https://docs.newrelic.com/docs/apis/rest-api-v2/api-explorer-v2/retrieve-metric-timeslice-data-your-app-explorer#app_id)
* **events** - **ARRAY** - This is a necessary parameter. This parameter will decide which events you are reducing, what they will be named and which attributes you will be faceting them off of. Your reduced events, by default, will return the following attributes:  
..* a **created** timestamp denoting when the reduced event was created.  
..* a **start** timestamp denoting the period in time of which the reduced events begin.  
..* an **end** timestamp denoting the period in time of which the reduced events start.  
..* a **count** attribute denoting the amount of events that have been reduced into the new reduced event.  
The rest of the attributes that your reduced events return will be based on the values that you pass into this **events** parameter. Let's look at an example an **events** parameter below:    
