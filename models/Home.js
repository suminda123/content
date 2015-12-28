var keystone = require('keystone');
var Types = keystone.Field.Types;

var Home = new keystone.List('Home');

Home.add({
	maincontent: {
		h1: {type: String},
		h5: {type: String},
		content: {type: Types.Html, wysiwyg: true, height: 400}
	},
	section1: {
		h5: {type: String},
		content: {type: Types.Html, wysiwyg: true, height: 400}
	},
	section2: {
		h5: {type: String},
		content: {type: Types.Html, wysiwyg: true, height: 400}
	},
	section3: {
		h5: {type: String},
		content: {type: Types.Html, wysiwyg: true, height: 400}
	},
	happyClientsHeader: {type: String},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true }
});

Home.schema.virtual('content.full').get(function () {
	return this.maincontent.content;
});


Home.track = true;
Home.defaultColumns = 'state|20%, publishedDate|20%';
Home.register();
