import { createContext, useContext, useState, useEffect } from "react";
import { checkDomainAvailability, checkWhoIs } from "../services/DomainService";

// *********** CONTEXT ***********
const DomainContext = createContext();

const useDomainContext = () => useContext(DomainContext);

const DomainProvider = ({ children }) => {
  const [domainInfo, setDomainInfo] = useState({});
  const [whoIsInfo, setWhoIsInfo] = useState({});
  const [domainLoader, setDomainLoader] = useState(false);

  const fnCheckDomainAvailability = async (domain) => {
    try {
      setDomainLoader(true);
      //  * GET DOMAIN *
      const domainData = await checkDomainAvailability(domain);
      if (Object.keys(domainData.data.DomainInfo).length > 0) {
        //  * SET DOMAIN *
        setDomainInfo(domainData.data.DomainInfo);
      } else {
        setDomainInfo({});
      }
      setDomainLoader(false);
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setDomainLoader(false);
    }
  };

  const fnCheckWhoIs = async (domain) => {
    try {
      setDomainLoader(true);
      //  * GET DOMAIN *
      const whoIsData = await checkWhoIs(domain);
      if (Object.keys(whoIsData.data.WhoisRecord).length > 0) {
        //  * SET DOMAIN *
        setWhoIsInfo(whoIsData.data.WhoisRecord);
      } else {
        setWhoIsInfo({});
      }
      setDomainLoader(false);
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setDomainLoader(false);
    }
  };

  const value = {
    domainLoader,
    domainInfo,
    setDomainInfo,
    whoIsInfo,
    fnCheckDomainAvailability,
    fnCheckWhoIs,
  };

  return (
    <DomainContext.Provider value={value}>{children}</DomainContext.Provider>
  );
};

export { DomainProvider, useDomainContext };
