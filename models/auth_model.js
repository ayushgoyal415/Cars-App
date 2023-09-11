const db = require('../database/db');
const bcrypt = require('bcrypt');

const q = {
  user_exists: username => /*SQL*/ `

    SELECT *
    FROM \`sql_cars\`.\`users\`
    WHERE \`username\` = '${username}';

  `,

  signup: c => /*SQL*/ `

    INSERT INTO \`sql_cars\`.\`users\`
      (\`first_name\`, \`last_name\`, \`username\`, \`password\`)
    VALUES
      ('${c.first_name}', '${c.last_name}', '${c.username}', '${c.password}');
    
  `,

  update_last_login: username => /*SQL*/ `

    UPDATE \`sql_cars\`.\`users\`
    SET \`last_login\` = NOW()
    WHERE \`username\` = '${username}';

  `
};

exports.signup = async c => {
  const [rows] = await db.execute(q.user_exists(c.username));
  if (rows.length !== 0) return false;

  c.password = await bcrypt.hash(c.password, 10);
  await db.execute(q.signup(c));
  return true;
};

exports.login = async c => {
  const [rows] = await db.execute(q.user_exists(c.username));
  if (rows.length === 0) return false;

  const cmp = await bcrypt.compare(c.password, rows[0].password);
  if (!cmp) return false;

  await db.execute(q.update_last_login(c.username));

  return rows[0];
};
