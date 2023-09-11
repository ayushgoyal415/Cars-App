const db = require('../database/db');
const bcrypt = require('bcrypt');

const q = {
  get_password: user_id => /*SQL*/ `

		SELECT \`password\`
		FROM \`sql_cars\`.\`users\`
		WHERE \`user_id\` = '${user_id}';

	`,

  update_password: (user_id, password) => /*SQL*/ `

		UPDATE \`sql_cars\`.\`users\`
		SET \`password\` = '${password}'
		WHERE \`user_id\` = '${user_id}';

	`,

  delete_account: user_id => /*SQL*/ `

		DELETE FROM \`sql_cars\`.\`users\`
		WHERE \`user_id\` = '${user_id}';

	`
};

exports.update_password = async c => {
  const [[row]] = await db.execute(q.get_password(c.user_id));
  if (!(await bcrypt.compare(c.current_password, row.password))) return false;

  const hash = await bcrypt.hash(c.new_password, 10);
  await db.execute(q.update_password(c.user_id, hash));
  return true;
};

exports.delete_account = async c => {
  const [[row]] = await db.execute(q.get_password(c.user_id));
  if (!(await bcrypt.compare(c.password, row.password))) return false;

  await db.execute(q.delete_account(c.user_id));
  return true;
};
