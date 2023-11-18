const filterSpace = (value: string): string => {
  return value
    .split(" ")
    .filter((item) => item.length > 0)
    .join(" ");
};

export const capitalizeName = (name: string): string => {
  if (filterSpace(name) === "") return "";
  return filterSpace(name)
    .toLocaleLowerCase()
    .split(" ")
    .map((item) => {
      const name = item.slice(1, item.length);
      const firstLetter = item[0].toUpperCase();
      return firstLetter + name;
    })
    .join(" ");
};

export const parseFullName = (firstName: string, lastName: string): string => {
  if (capitalizeName(firstName) === "") return capitalizeName(lastName);
  if (capitalizeName(lastName) === "") return capitalizeName(firstName);
  return `${capitalizeName(firstName)} ${capitalizeName(lastName)}`;
};
