export default async function getTags(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.data.sort((a, b) => {
    if (a.number === b.number) {
      return b.attributes.discussionCount - a.attributes.discussionCount;
    } else {
      return b.number - a.number;
    }
  });
}
