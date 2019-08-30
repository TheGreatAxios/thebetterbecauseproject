const config = require('../../../config/user_config');

let records = [
	{
		id: 1,
		username: config.axios.username,
		password: config.axios.password,
		displayName: config.axios.displayName,
		emails: [{
			value: config.axios.email
		}]
	},
	{
		id: 2, 
		username: config.admin.username,
		password: config.admin.password,
		displayName: config.admin.displayName,
		emails: [{
			value: config.admin.email
		}]
	},
	{
		id: 3, 
		username: config.dev.username,
		password: config.dev.password,
		displayName: config.dev.displayName,
		emails: [{
			value: config.dev.email
		}]
	}
];

exports.findById = (id, cb) => {
	process.nextTick(() => {
		let idx = id - 1;
		if (records[idx]) {
			cb(null, records[idx]);
		} else {
			cb(new Error(`User does #{id} not exist`));
		}
	});
}

exports.findByUsername = (username, cb) => {
	process.nextTick(() => {
		for (let i = 0, len = records.length; i < len; i++) {
			let record = records[i];
			if (record.username === username) {
				return cb(null, record);
			}
		}
		return cb(null, null);
	});
}

