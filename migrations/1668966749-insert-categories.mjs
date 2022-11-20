const categories = [
  { category_name: 'History' },
  { category_name: 'Politics' },
  { category_name: 'Economy' },
  { category_name: 'Law' },
  { category_name: 'Religion' },
  { category_name: 'Philosophy' },
  { category_name: 'Graphic Novel/Comics' },
  { category_name: 'Fiction' },
];

export async function up(sql) {
  await sql`
  INSERT INTO categories ${sql(categories, 'category_name')}
`;
}
export async function down(sql) {
  for (const category of categories) {
    await sql`
      DELETE FROM
        categories
      WHERE
        category_name = ${category.category_name}
    `;
  }
}
