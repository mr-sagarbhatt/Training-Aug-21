import "./feature-content.scss";
import { useEffect, useState } from "react";
import {
  createContentfulClient,
  formatDataWithImage,
} from "../../../utils/Contentful";
import Content from "./Content";
import PageLoader from "../../Loader/PageLoader";

const FeatureContent = () => {
  // * STORE CONTENT
  const [featuredContent, setFeaturedContent] = useState([]);
  const [contentLoader, setContentLoader] = useState(false);

  // * GET CONTENT FROM CONTENTFUL
  const getContentData = async () => {
    try {
      let response = await createContentfulClient.getEntries({
        content_type: process.env.REACT_APP_API_CONTENT_TYPE_FEATURE_CONTENT,
        order: "sys.createdAt",
      });
      const data = formatDataWithImage(response.items);
      setFeaturedContent(data);
      console.log(featuredContent);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setContentLoader(true);
    getContentData();
    setContentLoader(false);
  }, []);

  return (
    // <!-- feature-content -->
    <>
      {contentLoader ? (
        <PageLoader></PageLoader>
      ) : (
        <div className='feature-content'>
          {featuredContent.map((item, index) => (
            <Content data={item} key={index}></Content>
          ))}
          {/* <div className='item'>
        <div className='image'>
          <img
            className='img-fluid'
            src='https://drive.google.com/uc?export=view&id=1ESwWU8z3Ioh9Z84wpXxk9W7vjuqbVufK'
            alt='wordpress Hosting'
          />
        </div>
        <div className='content-wrapper'>
          <h2 className='title'>WordPress Hosting</h2>
          <h3 className='sub-title'>Built for speed and security.</h3>
          <div className='content'>
            <p>
              Get the most from your WordPress site with hosting designed to
              perform. From automated updates and backups to industry-leading
              load times, this is WordPress how it was meant to be.
            </p>
          </div>
          <div className='content-btn'>
            <button className='btn btn-light btn-content'>
              <span>See Plans</span>
            </button>
          </div>
        </div>
      </div>
      <div className='item'>
        <div className='image'>
          <img
            className='img-fluid'
            src='https://drive.google.com/uc?export=view&id=1Pj4Ifx4qaMAijiClMlUi8ua7MQkia7v6'
            alt='GoDaddy Pro Program'
          />
        </div>
        <div className='content-wrapper'>
          <h2 className='title'>GoDaddy Pro Program</h2>
          <h3 className='sub-title'>
            Free tools for designers and developers.
          </h3>
          <div className='content'>
            <p>
              Save hours with bulk WordPress updates and automated backups,
              manage multiple clients from a single dashboard, get exclusive
              members-only discounts and more — all for free.
            </p>
          </div>
          <div className='content-btn'>
            <button className='btn btn-light btn-content'>
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </div>
      <div className='item'>
        <div className='image'>
          <img
            className='img-fluid'
            src='https://drive.google.com/uc?export=view&id=1ABXtDlBPicZjZw4CeRSQhBv8Ubr5YHMh'
            alt='GoDaddy Reseller Program'
          />
        </div>
        <div className='content-wrapper'>
          <h2 className='title'>GoDaddy Reseller Program</h2>
          <h3 className='sub-title'>Start your business with our products.</h3>
          <div className='content'>
            <p>
              Our Reseller Program lets you open your own online business in a
              matter of hours. You choose which GoDaddy products you want to
              sell — and for how much — and we provide the rest, from the web
              store to payment processing.
            </p>
          </div>
          <div className='content-btn'>
            <button className='btn btn-light btn-content'>
              <span>Choose Your Plan</span>
            </button>
          </div>
        </div>
      </div> */}
        </div>
      )}
    </>
  );
};

export default FeatureContent;
