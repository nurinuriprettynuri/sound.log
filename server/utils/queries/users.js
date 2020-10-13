export const updateUserById = (userId, cols, files) => {
  let query = ["UPDATE users", "SET"];
  let set = [];
  let values = [];

  Object.keys(cols).forEach((key, idx) => {
    set.push(key + ` = $${idx + 1}`);
    values.push(cols[key]);
  });

  if (files) {
    console.log("?");
    files.forEach((file) => {
      set.push(`${file.fieldname} = '${file.location}'`);
    });
  }
  query.push(set.join(", "));
  query.push(`WHERE id = '${userId}' RETURNING id as "userId"`);
  const updateQuery = query.join(" ");

  return [updateQuery, values];
};
