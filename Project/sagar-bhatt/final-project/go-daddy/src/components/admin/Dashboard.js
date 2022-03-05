import { fetchUtils, Admin, Resource } from "react-admin";
import CategoryList from "./CategoryList";
import jsonServerProvider from "ra-data-json-server";
// import lb4Provider from "react-admin-lb4";

const Dashboard = () => {
  // *********** API URL ***********

  // const httpClient = (url, options = {}) => {
  //   if (!options.headers) {
  //     options.headers = new Headers({ Accept: "application/json" });
  //   }
  //   // add your own headers here
  //   // options.headers.set("Content-Range", "category 0-20/20");
  //   return fetchUtils.fetchJson(url, options);
  // };
  // const dataProvider = jsonServerProvider("http://localhost:3001", httpClient);

  const URL = "http://localhost:3001";
  const dataProvider = jsonServerProvider(URL);
  // "Content-Range", "category 0-20/20";
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name='category' list={CategoryList}></Resource>
    </Admin>
  );
};

export default Dashboard;
