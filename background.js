setTimeout(function() {
  console.log("extension started.");
}, 0);

chrome.commands.onCommand.addListener(function(command) {
  if (command === 'toggle_last_tab') {
    if (tabsHistory.length === 2) {
      console.log(tabsHistory);
      var target = tabsHistory[0].id;
      chrome.tabs.update(
        target,
        {"active": true, "highlighted": true},
        function() {}
      );
    }
  }
});

var tabsHistory = [];

chrome.tabs.onActivated.addListener(function (info) {
  chrome.tabs.get(info.tabId, function(_tab) {
    if (tabsHistory.length === 0) {
        tabsHistory = [{id: _tab.id, url: _tab.url}];
    }
    else {
      tabsHistory.push({id: _tab.id, url: _tab.url});
      if (tabsHistory.length === 3) {
        tabsHistory.shift();
      }
    }
  });
});
