import "./product-grid.scss";
import CloudBlack from "../../../assets/images/svg/cloud-black.svg";
import CloudWhite from "../../../assets/images/svg/cloud-white.svg";
import { useRef } from "react";

const ProductGrid = () => {
  const cloudImg = useRef(null);
  return (
    // <!-- product-grid -->
    <div className='product-grid'>
      <a className='card btn btn-product'>
        <span>
          Professional Email <br />₹ 29.00/mo
        </span>
      </a>
      <a className='card btn btn-product'>
        <span>
          Online Starter Bundle <br />₹ 54.00/mo
        </span>
      </a>
      <a className='card btn btn-product'>
        <span>
          GoDaddy Pro <br />
          Sign Up For Free
        </span>
      </a>
      <a className='card btn btn-product'>
        <span>
          Managed WordPress <br />₹ 149.00
        </span>
      </a>
      <a className='card btn btn-product'>
        <span>
          SSL Security <br />₹ 293.25
        </span>
      </a>
      <a className='card btn btn-product'>
        <span>
          Websites + Marketing <br />
          Start For Free**
        </span>
      </a>
      <a className='card btn btn-product'>
        <span>
          VPS <br />₹ 439.00
        </span>
      </a>
      <a className='card btn btn-product'>
        <span>
          Dedicated Server Hosting <br />₹ 8,839.00 /mo
        </span>
      </a>
      <a
        className='card btn cloud'
        onMouseEnter={() =>
          (cloudImg.current.src =
            "https://drive.google.com/uc?export=view&id=1POft6rAhEVbZDJ7hkOh60iiSEr-HrIpH")
        }
        onMouseLeave={() =>
          (cloudImg.current.src =
            "https://drive.google.com/uc?export=view&id=1pRYXOMtJje2nCwz41TBLnSsl-rzyPhoA")
        }
      >
        <img id='cloud' src={CloudBlack} alt='cloud' ref={cloudImg} />
        <p>
          Sale! ₹ 375.19* /1st yr. <br />
          Modern business runs on the .cloud
        </p>
      </a>
    </div>
  );
};

export default ProductGrid;
