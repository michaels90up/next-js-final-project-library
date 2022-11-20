export async function up(sql) {
  await sql`
    CREATE TABLE categories (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      category_name varchar(60) NOT NULL
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE categories
  `;
};
