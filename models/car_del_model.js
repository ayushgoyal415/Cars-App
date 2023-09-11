const db = require('../database/db');

exports.delete_car = async (user_id, car) => {
  await db.execute(/*SQL*/ `

        DELETE FROM \`sql_cars\`.\`cars\`
        WHERE
            \`posted_by\` = '${user_id}'
        AND \`name\` = '${car}';

    `);
};

exports.delete_prop = async (user_id, car, prop) => {
  await db.execute(/*SQL*/ `

        UPDATE \`sql_cars\`.\`cars\`
        SET \`${prop}\` = null
        WHERE
            \`posted_by\` = '${user_id}'
        AND \`name\` = '${car}'; 
        
    `);
};
