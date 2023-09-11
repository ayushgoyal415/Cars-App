const db = require('../database/db');

const q = {
  insert_car: (user_id, car) => /*SQL */ `

		INSERT INTO \`sql_cars\`.\`cars\`
      (\`posted_by\`, \`name\`)
		VALUES
      ('${user_id}', '${car}')

	`,

  check_col: prop => /*SQL */ `

		SELECT COUNT(*) AS \`COUNT\`
		FROM \`INFORMATION_SCHEMA\`.\`COLUMNS\`
		WHERE
			\`TABLE_SCHEMA\` = 'sql_cars'
		AND	\`TABLE_NAME\` = 'cars'
		AND \`COLUMN_NAME\` = '${prop}';

	`,

  add_col: prop => /*SQL */ `

		ALTER TABLE \`sql_cars\`.\`cars\`
		ADD \`${prop}\` VARCHAR (50);

	`,

  update_col: (user_id, car, prop, value) => /*SQL */ `

		UPDATE \`sql_cars\`.\`cars\`
		SET \`${prop}\` = '${value}'
		WHERE
			\`posted_by\` = '${user_id}'
		AND \`name\` = '${car}';

	`
};

exports.post_car = async (user_id, car, props) => {
  await db.execute(q.insert_car(user_id, car));

  for (let i in props)
    await db
      .execute(q.check_col(i))
      .then(async ([[row]]) =>
        row.COUNT === 0 ? await db.execute(q.add_col(i)) : ''
      )
      .then(() => db.execute(q.update_col(user_id, car, i, props[i])));
};

exports.post_prop = async (user_id, car, props) => {
  for (let i in props)
    await db
      .execute(q.check_col(i))
      .then(async ([[row]]) =>
        row.COUNT === 0 ? await db.execute(q.add_col(i)) : ''
      )
      .then(() => db.execute(q.update_col(user_id, car, i, props[i])));
};
