export const handleLongString = (originalString: string, maxLen: number) => {
  // finish function
  if (originalString && maxLen) {
    return originalString.length > maxLen
      ? `${originalString.slice(0, maxLen)}...`
      : originalString
  }
  return 'undefined'
}
