import "./faq-section.scss";
import { useEffect, useState } from "react";
// * CONTENTFUL
import { createContentfulClient, formatData } from "../../../utils/Contentful";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const FaqSection = () => {
  // * STORE FAQS
  const [faqs, setFaqs] = useState([]);

  // * GET FAQS FROM CONTENTFUL
  const getData = async () => {
    try {
      let response = await createContentfulClient.getEntries({
        content_type: process.env.REACT_APP_API_CONTENT_TYPE_FAQ,
      });
      const data = formatData(response.items);
      setFaqs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // * OPTIONS FOR RENDERING RICH TEXT
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <>{children}</>,
      [BLOCKS.HYPERLINK]: (node, children) => (
        <a className='link'>{children}</a>
      ),
    },
  };

  return (
    // <!-- faq-section -->
    <div className='faq-section'>
      <div className='heading'>
        Millions of customers rely on our domains and web hosting to get their
        ideas online.
      </div>
      <h2 className='sub-heading'>Frequently Asked Questions</h2>

      <div className='accordion accordion-flush' id='accordionFaqs'>
        {faqs.map((faq, index) => (
          <div className='accordion-item'>
            <h2 className='accordion-header' id={"flush-heading" + index}>
              <button
                className='accordion-button collapsed'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target={"#flush-collapseOne" + index}
                aria-expanded='false'
                aria-controls={"flush-collapseOne" + index}
              >
                {faq.questions}
              </button>
            </h2>
            <div
              id={"flush-collapseOne" + index}
              className='accordion-collapse collapse'
              aria-labelledby={"flush-heading" + index}
              data-bs-parent='#accordionFaqs'
            >
              <div className='accordion-body'>
                {documentToReactComponents(faq.answers, options)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
