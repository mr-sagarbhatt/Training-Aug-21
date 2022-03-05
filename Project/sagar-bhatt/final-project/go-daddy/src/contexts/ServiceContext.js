import { createContext, useContext, useState, useEffect } from "react";
import { getAllServices } from "../services/ServiceType";

// *********** CONTEXT ***********
const ServiceContext = createContext();

const useServiceContext = () => useContext(ServiceContext);

const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [serviceLoader, setServiceLoader] = useState(false);

  const getSetServices = async () => {
    try {
      setServiceLoader(true);
      //  * GET SERVICES *
      const serviceData = await getAllServices();
      if (serviceData.data.length > 0) {
        //  * SET SERVICES *
        setServices(serviceData.data);
      } else {
        setServices([]);
      }
      setServiceLoader(false);
    } catch (err) {
      console.error(err.response.data.message || err.message);
      setServiceLoader(false);
    }
  };

  useEffect(() => {
    getSetServices();
  }, []);

  const value = {
    serviceLoader,
    services,
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};

export { ServiceProvider, useServiceContext };
