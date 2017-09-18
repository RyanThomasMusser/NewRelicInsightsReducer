//
//
Atom editor is broken on my home computer...
Saving some basic progress here.
//
//

var config = {
  accountId: 123456,
  cadence: 6,
  retroactive: false,
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
  if ( config.retroactive != false && (typeof config.retroactive != 'number' || (new Date().getTime() - (365 * 24 * 60 * 60 * 1000) < new Date(config.retroactive).getTime())) ) {
    throw new Error("You've passed in a misformatted or a year plus old retroactive param. This should be a UNIX timestamp within the last year...");
  }
}else{
	config.retroactive = false;
}
console.log('Retroactive date: ', config.retroactive);
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
