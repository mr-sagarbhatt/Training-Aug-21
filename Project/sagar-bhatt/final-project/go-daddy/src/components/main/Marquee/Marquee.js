import "./marquee.scss";

const Marquee = () => {
  return (
    // <!-- marquee -->
    <div className='marquee'>
      <div className='domain-names card'>
        <div className='card-top'>
          <h3 className='card-title'>Domain Names</h3>
          <h1 className='card-subtitle'>
            Get a .com for &#x20B9; 199.00* <span>/1st yr.</span>
          </h1>
          <p className='card-text'>Grab the world's most popular domain.</p>
        </div>
        <div className='card-btn'>
          <button className='btn btn-dark btn-custom'>
            <span>Get It Now</span>
          </button>
        </div>
      </div>
      <div className='web-hosting card'>
        <div></div>
        <div>
          <div className='card-top'>
            <h3 className='card-title'>Web Hosting</h3>
            <h1 className='card-subtitle'>
              Get web hosting as low as <span>&#x20B9; 199.00/mo.</span>
            </h1>
            <p className='card-text'>
              Fast and secure. Includes free domain + email.
            </p>
          </div>
          <div className='card-btn'>
            <button className='btn btn-dark btn-custom'>
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
