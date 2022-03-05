import { createClient } from "contentful";

const createContentfulClient = createClient({
  space: process.env.REACT_APP_API_SPACE,
  accessToken: process.env.REACT_APP_API_ACCESS_TOKEN,
});

// * FORMAT DATA
const formatData = (items) => {
  const tempItems = items.map((item) => {
    const data = { ...item.fields };
    return data;
  });
  return tempItems;
};

// * FORMAT DATA AND IMAGE
const formatDataWithImage = (items) => {
  const tempItems = items.map((item) => {
    // const image = item.fields.images.map((image) => image.fields.file.url);
    const data = {
      ...item.fields,
      contentImage: item.fields.contentImage.fields.file.url,
    };
    return data;
  });
  return tempItems;
};

export { createContentfulClient, formatData, formatDataWithImage };
