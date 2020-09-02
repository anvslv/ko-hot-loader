import ko from 'knockout';

const kr = {
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
 
export default kr;

