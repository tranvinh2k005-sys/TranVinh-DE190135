// 1. Hàm tiện ích định dạng tiền VND
export const formatVND = (n) =>
  n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
