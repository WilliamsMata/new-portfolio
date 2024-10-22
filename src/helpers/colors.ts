export function hexToRgb(hex: string) {
  // Eliminar el símbolo '#' si está presente
  hex = hex.replace(/^#/, "");

  // Validar que el hexadecimal tenga 6 caracteres
  if (hex.length !== 6) {
    throw new Error("Invalid hex color");
  }

  // Convertir cada par de caracteres a un número decimal
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
}

export function rgbToHsl(r: number, g: number, b: number) {
  // Normalizar los valores RGB a un rango de 0 a 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Encontrar los valores máximos y mínimos de los canales RGB
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  // Si todos los canales son iguales, el color es un gris y no tiene saturación
  if (max === min) {
    h = s = 0; // Hue y Saturation son 0
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h = (h || 0) / 6;
  }

  // Convertir a grados y porcentajes
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
}

export function hexToHsl(hex: string) {
  const rgb = hexToRgb(hex);
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}
