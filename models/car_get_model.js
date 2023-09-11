const db = require('../database/db');

const q = {
  get_cars: user_id => /*SQL */ `

		SELECT *
		FROM \`cars\`
		WHERE \`posted_by\` = '${user_id}';
		
	`,

  get_car: (user_id, car) => /*SQL */ `

		SELECT *
		FROM \`cars\`
		WHERE
				\`name\` = '${car}'
		AND	\`posted_by\` = '${user_id}';

	`,

  check_prop: prop => /*SQL*/ `

		SELECT COUNT(*) AS COUNT
		FROM \`INFORMATION_SCHEMA\`.\`COLUMNS\`
		WHERE
				\`TABLE_SCHEMA\` = 'sql_cars'
		AND	\`TABLE_NAME\` = 'cars'
		AND \`COLUMN_NAME\` = '${prop}';

	`,

  get_prop: (user_id, car, prop) => /*SQL*/ `

		SELECT \`${prop}\`
		FROM \`sql_cars\`.\`cars\`
		WHERE
				\`posted_by\` = '${user_id}'
		AND \`name\` = '${car}';

	`
};

exports.get_cars = async user_id => {
  const [rows] = await db.execute(q.get_cars(user_id));
  return rows;
};

exports.get_car = async (user_id, car) => {
  const [[row]] = await db.execute(q.get_car(user_id, car));
  return row;
};

exports.get_prop = async (user_id, car, prop) => {
  const [rows] = await db.execute(q.check_prop(prop));
  if (rows[0].COUNT === 0) return undefined;

  const [[row]] = await db.execute(q.get_prop(user_id, car, prop));
  return row[prop];
};
