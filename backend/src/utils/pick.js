// Toma solo los campos permitidos (evita que el cliente envíe campos que no debe)
export const pick = (obj = {}, campos = []) =>
  Object.fromEntries(campos.filter((c) => obj[c] !== undefined).map((c) => [c, obj[c]]));
