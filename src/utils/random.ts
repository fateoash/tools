export function getConsistentRandomNumber(seed: number, min: number, max: number) {
  // 使用简单的伪随机数生成器
  const x = Math.sin(seed) * 10000;
  const random = x - Math.floor(x);
  return Math.floor(random * (max - min + 1)) + min;
} 