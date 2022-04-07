import { useEffect, useState } from 'react'

// Mỗi lần gõ 1 kí tự sẽ fetch đến API rất nhiều nên dùng useDebounce để chỉnh thời gian fetch => 1 khoảng tgian sau khi gõ xong thì fetch

export function useDebounce(initializeValue = '', delay = 1000) {
  // load du lieu sau ... giay
  const [debounceValue, setDebounceValue] = useState(initializeValue)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initializeValue)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [delay, initializeValue])

  return debounceValue
}
