export async function up(sql) {
  await sql`
    CREATE TABLE books (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title varchar(200) NOT NULL,
      author varchar(100) NOT NULL,
      year integer,
      category varchar(80),
      language varchar(60)
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE books
  `;
}
