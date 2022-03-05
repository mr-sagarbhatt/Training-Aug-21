import axios from "axios";

const apiKey = `at_pcg3PG0pzsIH6qrMBSFndHtKhZXO4`;

const checkDomainAvailability = async (domain) => {
  return await axios.get(
    `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${apiKey}&domainName=${domain}`
  );
};

const checkWhoIs = async (domain) => {
  return await axios.get(
    `https://www.whoisxmlapi.com/whoisserver/WhoisService?domainName=${domain}&apiKey=${apiKey}&outputFormat=json`
  );
};

export { checkDomainAvailability, checkWhoIs };
