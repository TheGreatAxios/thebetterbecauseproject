let records = [
	{
		id: 1,
		username: 'thegreataxios',
		password: 'admin',
		displayName: 'Sawyer',
		emails: [{
			value: 'sawyer@fleurtechnologies.com'
		}]
	},
	{
		id: 2, 
		username: 'becca',
		password: 'better',
		displayName: 'Rebecca',
		emails: [{
			value: 'rebecca@rebeccamassie.com'
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

