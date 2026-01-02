export const  hexToRgb = (hex: string) => {
  hex = hex.startsWith('#') ? hex.slice(1) : hex;

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (hex.length !== 6) {
    throw new Error("Invalid hex color format. Expected 3 or 6 characters (excluding '#').");
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}


export const currencyFormat = (
  amount: number,
  options: Intl.NumberFormatOptions = {}
) => {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    ...options
  })
    .format(amount)
    .replace("BDT", "৳");
};

export const numberFormat = (
  num: number,
  options?: Intl.NumberFormatOptions
) => {
  return new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    ...options
  }).format(num);
};

export const getFileExtension = (fileName: string, separator = ".") =>
  fileName.split(separator).pop() || "unknown";


export const isImageFile = (file: File) => {
  const imageMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp"
  ];
  return imageMimeTypes.includes(file.type);
};

export const convertFileToAttachment = (file: File) => ({
  name: file.name,
  size: `${(file.size / 1024).toFixed(2)} KB`,
  format: getFileExtension(file.name),
  preview: isImageFile(file) ? URL.createObjectURL(file) : undefined
});