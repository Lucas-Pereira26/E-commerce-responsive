import React, { useState } from "react";
import './Payment.css'; 
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faCartShopping, faCreditCard, faExchangeAlt, faMapMarker, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const Payment = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />

      <div className="main">
     
        <ul className="btn-u">
          <li className={activeStep >= 1 ? "active" : ""} onClick={() => handleStepClick(1)}>
          <FontAwesomeIcon icon={faCartShopping} className="icon" />
            <div className={`progress one ${activeStep >= 1 ? "active" : ""}`}>
              <p>1</p>
              <FontAwesomeIcon icon={faCheck} className="check" />
            </div>
            <p className="text">Pedido Realizado  </p>
          </li>
          <li className={activeStep >= 2 ? "active" : ""} onClick={() => handleStepClick(2)}>
          <FontAwesomeIcon icon={faCreditCard} className="icon" />
            <div className={`progress two ${activeStep >= 2 ? "active" : ""}`}>
              <p>2</p>
              <FontAwesomeIcon icon={faCheck} className="check" />
            </div>
            <p className="text">Autorização do Pagamento</p>
          </li>
          <li className={activeStep >= 3 ? "active" : ""} onClick={() => handleStepClick(3)}>
             <FontAwesomeIcon icon={faClipboardList} className="icon" />
            <div className={`progress three ${activeStep >= 3 ? "active" : ""}`}>
              <p>3</p>
              <FontAwesomeIcon icon={faCheck} className="check" />
            </div>
            <p className="text">Make Payment</p>
          </li>
          <li className={activeStep >= 4 ? "active" : ""} onClick={() => handleStepClick(4)}>
            <FontAwesomeIcon icon={faExchangeAlt} className="icon" />
            <div className={`progress four ${activeStep >= 4 ? "active" : ""}`}>
              <p>4</p>
              <FontAwesomeIcon icon={faCheck} className="check" />
            </div>
            <p className="text">Produto em transporte</p>
          </li>
          <li className={activeStep === 5 ? "active" : ""} onClick={() => handleStepClick(5)}>
            <FontAwesomeIcon icon={faMapMarker} className="icon" />
            <div className={`progress five ${activeStep === 5 ? "active" : ""}`}>
              <p>5</p>
              <FontAwesomeIcon icon={faCheck} className="check" />
            </div>
            <p className="text">Produto Entregue  </p>
          </li>
        </ul>
      </div>

      <div className="pb-10">
        <p>Payment gateway only applicable for Production build.</p>
        <Link to="/">
          <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Explore More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
