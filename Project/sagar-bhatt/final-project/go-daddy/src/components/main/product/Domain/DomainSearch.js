import "./domain-search.scss";
import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDomainContext } from "../../../../contexts/DomainContext";
import { useState } from "react";
import Loader from "../../../Loader/Loader";

const DomainSearch = () => {
  const { subCategorySlug } = useParams();
  const {
    domainLoader,
    domainInfo,
    fnCheckDomainAvailability,
    whoIsInfo,
    fnCheckWhoIs,
  } = useDomainContext();
  const [domainInput, setDomainInput] = useState("");
  const [whoIsInput, setWhoIsInput] = useState("");
  return (
    <div className='domain-search'>
      <div className='search-title'>
        {subCategorySlug === "domain-name-search" &&
          `Search for available domain names`}
        {subCategorySlug === "whois" && `Find out who owns a website.`}
      </div>
      <div className='input-group'>
        {subCategorySlug === "domain-name-search" && (
          <>
            <input
              type='text'
              className='form-control'
              placeholder='Type the domain name you want to search'
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
            />
            <span
              className='input-group-text search-icon px-md-5'
              onClick={() => {
                fnCheckDomainAvailability(domainInput);
              }}
            >
              <FaSearch></FaSearch>
              <span className='ms-2 d-none d-lg-block pb-1'>Search</span>
            </span>
          </>
        )}
        {subCategorySlug === "whois" && (
          <>
            <input
              type='text'
              className='form-control'
              placeholder='Type the domain name you want to search'
              value={whoIsInput}
              onChange={(e) => setWhoIsInput(e.target.value)}
            />
            <span
              className='input-group-text search-icon px-md-5'
              onClick={() => {
                fnCheckWhoIs(whoIsInput);
              }}
            >
              <FaSearch></FaSearch>
              <span className='ms-2 d-none d-lg-block pb-1'>Search</span>
            </span>
          </>
        )}
      </div>
      {subCategorySlug === "domain-name-search" &&
        domainInput !== "" &&
        Object.keys(domainInfo).length > 0 && (
          <>
            {domainLoader ? (
              <div>
                <Loader></Loader>
              </div>
            ) : (
              <>
                <div className='domain-result-success ps-0'>
                  {domainInfo.domainAvailability === "AVAILABLE" &&
                    `${domainInfo.domainName} is available!`}
                </div>
                <div className='domain-result-error ps-0'>
                  {domainInfo.domainAvailability === "UNAVAILABLE" &&
                    `${domainInfo.domainName} is unavailable!`}
                </div>
              </>
            )}
          </>
        )}
      {subCategorySlug === "whois" &&
        whoIsInput !== "" &&
        Object.keys(whoIsInfo).length > 0 && (
          <>
            {domainLoader ? (
              <div>
                <Loader></Loader>
              </div>
            ) : (
              <>
                <>
                  {/* <div className='domain-result-success text-dark ps-0'>
                  {whoIsInfo && (
                    <>
                      {Object.keys(whoIsInfo).map((key, index) => (
                        <p key={index}>
                          <span>
                            {typeof whoIsInfo[key] == "object" ? (
                              <>
                                {Object.keys(whoIsInfo[key]).map(
                                  (childKey, childIndex) => (
                                    <p key={childIndex}>
                                      <span>
                                        {typeof whoIsInfo[key][childKey] ==
                                        "object" ? (
                                          <>
                                            {Object.keys(
                                              whoIsInfo[key][childKey]
                                            ).map(
                                              (subChildKey, subChildIndex) => (
                                                <p key={subChildIndex}>
                                                  <span>
                                                    {subChildKey}:{" "}
                                                    {whoIsInfo[key][childKey][
                                                      subChildKey
                                                    ].toString()}
                                                  </span>
                                                </p>
                                              )
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {childKey}:{" "}
                                            {whoIsInfo[key][
                                              childKey
                                            ].toString()}
                                          </>
                                        )}
                                      </span>
                                    </p>
                                  )
                                )}
                              </>
                            ) : (
                              <>
                                {key}: {whoIsInfo[key].toString()}
                              </>
                            )}
                          </span>
                        </p>
                      ))}
                    </>
                  )}
                </div> */}
                </>
                <div className='domain-result-success text-dark ps-0'>
                  {whoIsInfo.rawText.split("\n").map((text, index) => (
                    <div key={index} className='py-1 fs-5'>
                      {text}
                    </div>
                  ))}
                </div>
                <div className='domain-result-error'>
                  {whoIsInfo.dataError === "MISSING_WHOIS_DATA" &&
                    `${whoIsInfo.domainName} domain is unavailable!`}
                </div>
              </>
            )}
          </>
        )}
    </div>
  );
};

export default DomainSearch;
