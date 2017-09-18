/*

Don't mind this for now...

It's basically just notes and sloppy functions
that I'm going to abstract and use later on.

My atom IDE broke on my home computer so I'm
keeping this here for now...

*/


var config = {
  accountId: 123456,
  cadence: 6,
  retroactive: 1484173900204,
  queryKey: "MY_QUERY_KEY",
  insertKey: "MY_INSERT_KEY",
  applicationIds: [1, 2, 3, 4],
  events: [{
    oldEventName: "Transaction",
    newEventName: "reducedTransaction",
    facets: [{
      facet: "name",
      subFacets: [{
        facetValue: "Controller/Car_details/show",
        subFacetProperty: "car_status"
      }],
    }, {
      facet: "userAgent",
      customFilter: function(facet) {
        var fakeFilterValues = ["Tablet", "Desktop", "Bot", "Mobile"];
        return fakeFilterValues[Math.floor(Math.random() * fakeFilterValues.length)];
      },
    }],
    durations: [{
      name: "duration",
      values: [
        "min", "max", 50, 90, 95
      ]
    }],
  }]
};

//
//
//
//


//
//
//validate the retroactive timestamp
if (config.hasOwnProperty('retroactive')) {
    var isOlderThanAYear = parseInt(Date.now()  - (365 * 24 * 60 * 60 * 1000)) > new Date(config.retroactive).getTime();
  if ( config.retroactive != false && (typeof config.retroactive != 'number' || isOlderThanAYear) ) {
    throw new Error("You've passed in a misformatted or a year plus old retroactive param. This should be a UNIX timestamp within the last year...");
  }
}else{
	config.retroactive = false;
}
console.log('Retroactive date: ', new Date(config.retroactive));
//
//
//

//
//
//constructing the base query string
var appIdQueryString = false;
if (config.hasOwnProperty('applicationIds')) {
  if (typeof config.applicationIds == 'object' && config.applicationIds.length > 0) {
    config.applicationIds.map(function(applicationId) {
      appIdQueryString = !appIdQueryString ? ' appId = ' + applicationId : appIdQueryString + ' OR appId = ' + applicationId;
    });
  } else {
    throw new Error("You've passed in either an empty or misformatted applicationIds param. This should be an array with atleast 1 string value or undefined/false");
  }
}
console.log('appIdQueryString: ', '"'+appIdQueryString+'"');
//
//
//
