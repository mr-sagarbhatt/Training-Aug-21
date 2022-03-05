import "./guides-section.scss";
import { FaSearch } from "react-icons/fa";

const GuidesSection = () => {
  return (
    // <!-- guides-section -->
    <div className='guides-section'>
      <span className='pipe'>Samantha S.</span>
      <div className='guide-content'>
        <div className='logo'>
          <img
            src='https://drive.google.com/uc?export=view&id=1LiEN_NJLhg-d2JJsUMIgA_caBixJ5Rub'
            alt='GoDaddy Guides'
          />
        </div>
        <div className='heading'>Why go with GoDaddy?</div>
        <p>
          Because we know that even the best technology is only as good as the
          people behind it. That’s why we offer expert, 24/7 phone support, plus
          a lot more.
        </p>
        <p>Call our technical support team at 040 67607600.</p>
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Type a question'
          />
          <span className='input-group-text search-icon px-md-5'>
            {/* <i className='fas fa-search'></i> */}
            <FaSearch></FaSearch>
          </span>
        </div>
        <div className='links'>
          <a href='#'>View How-To Articles</a>
          <a href='#'>Read Our Blog</a>
        </div>
      </div>
    </div>
  );
};

export default GuidesSection;
