var Ember = require('ember');
module.exports = Ember.Object.extend({
  lookupFactory: function(name, container) {

    container = container || this.container;

    var fullName = 'component:' + name;
    var templateFullName = 'template:components/' + name;
    var templateRegistered = container && container.has(templateFullName);

    if (templateRegistered) {
      container.injection(fullName, 'layout', templateFullName);
    }

    var Component = container.lookupFactory(fullName);

    // Only treat as a component if either the component
    // or a template has been registered.
    if (templateRegistered || Component) {
      if (!Component) {
        container.register(fullName, Ember.Component);
        Component = container.lookupFactory(fullName);
      }
      return Component;
    }
  }
});