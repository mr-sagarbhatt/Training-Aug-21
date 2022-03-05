import "./promotion-ad.scss";
import { FaTimesCircle, FaPlay, FaLessThanEqual } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import PageLoader from "../../Loader/PageLoader";

const PromotionAd = () => {
  const modal = useRef(null);
  const img = useRef(null);
  const close = useRef(null);
  const play = useRef(null);
  const [promotionAdLoader, setPromotionAdLoader] = useState(false);

  useEffect(() => {
    // open modal
    setPromotionAdLoader(true);
    img.current.onclick = function () {
      modal.current.style.display = "flex";
      modal.current.style.justifyContent = "center";
      modal.current.style.alignItems = "center";
    };
    play.current.onclick = function () {
      modal.current.style.display = "flex";
      modal.current.style.justifyContent = "center";
      modal.current.style.alignItems = "center";
    };

    // When the user clicks on <span> (x), close the modal
    close.current.onclick = () => {
      modal.current.style.display = "none";
    };
    setPromotionAdLoader(false);
  }, []);

  return (
    // <!-- promotion-ad -->
    <>
      {promotionAdLoader ? (
        <PageLoader></PageLoader>
      ) : (
        <div className='promotion-ad'>
          <div className='img-container'>
            <img
              className='img-fluid'
              id='myImg'
              ref={img}
              src='https://drive.google.com/uc?export=view&id=1RZhmKUns18sQYcQB968yVtwJzkhuy3g_'
              alt='Northern Lights, Norway'
            />
            <div id='play' className='play' ref={play}>
              <FaPlay className='play-icon'></FaPlay>
            </div>
          </div>
          {/* <!-- The Modal --> */}
          <div id='myModal' className='modal' ref={modal}>
            <span className='close' ref={close}>
              {/* <i className='fas fa-times-circle'></i> */}
              <FaTimesCircle className='fa-times-icon'></FaTimesCircle>
            </span>
            <div className='modal-body mb-0 p-0'>
              <div className='embed-responsive embed-responsive-16by9 z-depth-1-half'>
                <iframe
                  src='https://www.youtube.com/embed/KvgrCFGrmAI'
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PromotionAd;
