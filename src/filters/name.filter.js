/** @format */

export default function nameFilter(value) {
  if (value) {
    let name = value.split(' ');
    if (name.length == 2) {
      return name[0] + ' ' + (name[1].substring(0, 1) ? name[1].substring(0, 1) + '. ' : '');
    } else if (name.length == 3) {
      return name[0] + ' ' + (name[1].substring(0, 1) ? name[1].substring(0, 1) + '. ' : '') + (name?.[2].substring(0, 1) ? name?.[2].substring(0, 1) + '.' : '');
    } else return value;
  } else return value;
}
