// 模拟商品数据库
const PRODUCTS = [
  { id: 'K248', url: 'item.taobao.com/item.htm?id=1234' },
  { id: 'K24', url: 'item.taobao.com/item.htm?id=5678' },
  // 更多商品...
]

export function extractItemId(url: string): string | null {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
    return urlObj.searchParams.get('id')
  } catch {
    return null
  }
}

export function findProductBySku(sku: string) {
  return PRODUCTS.find(p => p.id.toLowerCase() === sku.toLowerCase())
}

export function findProductByUrl(url: string) {
  const itemId = extractItemId(url)
  if (!itemId) return null
  
  return PRODUCTS.find(p => p.url.includes(itemId))
} 