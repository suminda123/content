var keystone = require('keystone');
var Types = keystone.Field.Types;

var HappyClients = new keystone.List('HappyClients', {
       label: 'HappyClients'
});

HappyClients.add({
    title: { type: String, default:"Endev", required: true },
    website: { type: Types.Url},
    logo: { type: Types.CloudinaryImage}
});

HappyClients.track = true;
HappyClients.defaultColumns = 'title'
HappyClients.register();