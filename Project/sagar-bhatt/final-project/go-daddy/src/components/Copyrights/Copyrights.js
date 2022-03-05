import "./copyrights.scss";

const Copyrights = () => {
  const year = new Date().getFullYear();
  return (
    <section className='copyrights'>
      Copyright &copy; 1999 - {year} GoDaddy Operating Company, LLC. All Rights
      Reserved.
      <a href='https://in.godaddy.com/legal/agreements/privacy-policy'>
        Privacy Policy
      </a>
    </section>
  );
};

export default Copyrights;
