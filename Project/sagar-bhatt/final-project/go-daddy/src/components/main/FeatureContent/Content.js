import "./feature-content.scss";

const Content = (data) => {
  const { title, subtitle, content, contentImage, btnText } = data.data;
  return (
    <>
      <div className='item'>
        <div className='image'>
          <img
            className='img-fluid'
            src={contentImage}
            alt='wordpress Hosting'
          />
        </div>
        <div className='content-wrapper'>
          <h2 className='title'>{title}</h2>
          <h3 className='sub-title'>{subtitle}</h3>
          <div className='content'>
            <p>{content}</p>
          </div>
          <div className='content-btn'>
            <button className='btn btn-light btn-content'>
              <span>{btnText}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
