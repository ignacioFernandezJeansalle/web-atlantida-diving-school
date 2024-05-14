export const removeAccents = (element) => {
  return element.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
