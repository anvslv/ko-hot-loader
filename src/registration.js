import ko from 'knockout';

module.exports = {
    components: { 
        unregister: (name) => {
            if (ko.components.isRegistered(name)){
                ko.components.clearCachedDefinition(name);
                ko.components.unregister(name);
            }; 
        },

        registerOrUpate: (name, config) => {
            if (ko.components.isRegistered(name)){
                ko.components.clearCachedDefinition(name);
                ko.components.unregister(name);
            }; 
            ko.components.register(name, config);
        }
    } 
} 

