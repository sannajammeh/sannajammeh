export function staircase<T>(
  arr: T[],
  stairs: number = 3 // Optional parameter, defaults to 3
): T[][] {
  const totalItems = arr.length;

  if (stairs <= 0) {
    throw new Error("Number of stairs must be a positive integer.");
  }
  if (totalItems === 0) {
    // If the array is empty, return an array of empty arrays equal to the number of stairs
    return Array.from({ length: stairs }, () => []);
  }

  // Calculate the sum of parts: 1 + 2 + ... + stairs = n * (n + 1) / 2
  const sumOfParts = (stairs * (stairs + 1)) / 2;

  // Calculate the base unit for distribution
  const baseUnit = Math.floor(totalItems / sumOfParts);
  let remainder = totalItems % sumOfParts;

  // Initialize an array to hold the sizes of each stair
  const sizes: number[] = new Array(stairs).fill(0);

  // Distribute the base units based on the staircase ratio (largest first)
  for (let i = 0; i < stairs; i++) {
    // The largest stair (index 0) gets `stairs` * baseUnit,
    // the next gets `stairs - 1` * baseUnit, and so on.
    sizes[i] = (stairs - i) * baseUnit;
  }

  // Distribute the remainder, one item at a time, to the largest arrays first
  for (let i = 0; i < remainder; i++) {
    sizes[i % stairs]++; // Distribute cyclically, ensuring larger arrays get more remaining items first
  }

  // If there are still items and the current largest is smaller than totalItems
  // this is a fallback for very small totalItems compared to stairs
  // Ensure that no size is zero unless totalItems is zero and stairs > totalItems
  for (let i = 0; i < stairs; i++) {
    if (totalItems > 0 && sizes[i] === 0) {
      // Find the largest non-zero stair and take one from it,
      // or if all are zero and totalItems > 0, we have an issue with initial distribution.
      // This part ensures that if we have items, we distribute them even if `baseUnit` was 0.
      let distributedCount = sizes.reduce((sum, s) => sum + s, 0);
      if (distributedCount < totalItems) {
        // Find the stair with most items to potentially re-distribute if needed
        let largestIndex = 0;
        for (let j = 0; j < stairs; j++) {
          if (sizes[j] > sizes[largestIndex]) {
            largestIndex = j;
          }
        }
        // If there are items left and we can distribute them, do it
        // This is a safety for cases like `staircase([1,2,3], 5)`
        if (
          sizes[largestIndex] > 0 ||
          (totalItems > 0 && distributedCount === 0)
        ) {
          sizes[i]++;
          distributedCount++;
          // If we took from another stair to give to this one, reflect it
          if (sizes[largestIndex] > 0 && largestIndex !== i) {
            sizes[largestIndex]--;
          }
        }
      }
    }
  }

  // Create the resulting staircase arrays
  const result: T[][] = [];
  let currentIndex = 0;

  for (let i = 0; i < stairs; i++) {
    const stairSize = sizes[i];
    result.push(arr.slice(currentIndex, currentIndex + stairSize));
    currentIndex += stairSize;
  }

  // Important: After initial slicing, ensure the "staircase" property
  // and all items are included.
  // Sort the resulting arrays by length in descending order.
  result.sort((a, b) => b.length - a.length);

  // If there are any remaining items not yet distributed (due to complex remainders
  // or very small arrays causing `baseUnit` to be 0 for many stairs),
  // add them to the largest array. This ensures all items are always returned.
  while (currentIndex < totalItems) {
    if (result.length > 0) {
      result[0].push(arr[currentIndex]);
    } else {
      // This case should ideally not happen if totalItems > 0 and stairs > 0
      // but as a fallback, if for some reason result is empty, just add to a new array
      result.push([arr[currentIndex]]);
    }
    currentIndex++;
  }

  return result;
}

export function createGetColor(
  colorPalette: string[] = [
    "text-blue-500",
    "text-red-500",
    "text-orange-500",
    // "text-green-500",
    // "text-purple-500",
    // "text-pink-500",
    "text-yellow-500",
  ]
) {
  const keywordColorMap = new Map<string, string>();
  let colorIndex = 0;

  return (keyword: string): string => {
    if (keywordColorMap.has(keyword)) {
      // biome-ignore lint/style/noNonNullAssertion: <not forbidden>
      return keywordColorMap.get(keyword)!;
    } else {
      const color = colorPalette[colorIndex % colorPalette.length];
      keywordColorMap.set(keyword, color);
      colorIndex++;
      return color;
    }
  };
}
