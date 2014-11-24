$(function() {
    function viewModel(data) {
        var self = this;
        self.groups = ko.observableArray();
        $.getJSON("data/data.json", function(data) {
            if (data && data.applications.group.length) {
                var original_data = data.applications.group;
                var grouped_data = [];
                $.each(original_data, function(main_index) {
                    var original_application = this.application,
                        application = {
                            primary: {},
                            columns: []
                        };
                    odd = [], even = [];
                    $.each(original_application, function(index) {
                        //this.index = main_index+""+index;
                        if (this.primary == "true") {
                            application.primary = this;

                        } else if (index % 2 == 0) {
                            even.push(this);
                        } else {
                            odd.push(this);
                        }
                        //Tabbing
                        this.Tab = function(id) {
                            var tab = this;
                            tab.id = ko.observable(id);
                            return tab;
                        };
                        this.selectedTab = ko.observable(1);
                        this.tabs = new Array();
                        this.tabs.push(new this.Tab(1));
                        this.tabs.push(new this.Tab(2));
                    });
                    application.columns.push(odd);
                    application.columns.push(even);
                    grouped_data.push(application);
                });
               // console.log(grouped_data);
                self.groups(grouped_data); //ko.mapping.fromJS(grouped_data)
               // console.log(self.groups());
            }
        });
    }
    ko.applyBindings(new viewModel());
});