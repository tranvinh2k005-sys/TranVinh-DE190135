export const productA = {
  id: 1,
  name: 'Tai nghe Bluetooth',
  price: 590000,
  image: 'https://picsum.photos/seed/headphone/300/200',
  rating: { rate: 4.5, count: 120 },
  category: { name: 'Âm thanh' },
};

export const productB = {
  id: 2,
  name: 'Chuột không dây',
  price: 0, // thiếu ảnh, rating, category
};

export const productC = {
  id: 3, // gần như trống
};

export const products = [productA, productB, productC];
