export const JaccardSimilarity = (arr1, arr2) => {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  // Calculate intersection and union
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  // Return Jaccard similarity
  return intersection.size / union.size;
  
};
