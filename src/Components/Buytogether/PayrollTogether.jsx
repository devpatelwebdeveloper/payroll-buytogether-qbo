import React, { useState, useEffect } from "react";
import styles from "./PayrollTogether.module.scss";
import Button from "../Button";
import { useFetch } from "../utils/useFetch";

export default function PayrollTogether({
  lang,
  productName,
  mySelectedPlanTitle,
  selectedPlan,
  planDiscountTitle,
  payrollTitle,
  payrollDescription,
  perEmployeePrice,
  employeeLabel,
  featureList,
  monthLabel,
  totalLabel,
  taxLabel,
  buttonLabel
}) {
  //Campaign Json Test
  const [payrollSelected, setPayrollSelected] = useState(false);
  const [payrollPrice, setPayrollPrice] = useState(0);
  const [showFeature, setShowFeature] = useState(false);
  const [url, setUrl] = useState(``);
  const { data, loading } = useFetch(
    "https://quickbooks.intuit.com/qbmds-data/ca/billing_offers_ca.json"
  );

  const payrollOfferID =
    data?.campaigns.default.default.QBOP.QBOP_ENHANCED.MONTHLY.PAID.offer_id;
  const campaignOfferID =
    data?.campaigns.default.default.QBO[productName].MONTHLY.PAID.offer_id;
  const campaignOfferDetails =
    !loading && data.offerDefinitions[campaignOfferID];
  const productPrice = parseInt(campaignOfferDetails.basePrice);
  const discount = parseInt(campaignOfferDetails.discountPercentage);
  const payroll =
    !loading && parseInt(data.offerDefinitions[payrollOfferID].basePrice);

  const discountedProductPrice = productPrice * (discount / 100);

  const formatCurrency = (amount, locale = "en-CA", decimals = 0) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      currencyDisplay: "narrowSymbol"
    }).format(amount);
  };
  useEffect(() => {
    console.log(`campaignOfferID`, campaignOfferID);
    if (campaignOfferID) {
      setUrl(
        `https://signup.quickbooks.intuit.com/?locale=${lang}&offerId=${campaignOfferID}&offerType=buy&bc=OBI-LL3`
      );
    }
  }, [campaignOfferID, lang]);

  //Test Console
  console.log(`url`, url);
  //Test Console

  useEffect(() => {
    if (payrollSelected) {
      setPayrollPrice(payroll);
      setUrl(
        `https://signup.quickbooks.intuit.com/?locale=${lang}&offerId=${campaignOfferID}&offerType=buy&bc=OBI-LL3&additionalOfferIds=${payrollOfferID}&product=qbo`
      );
    } else {
      setPayrollPrice(0);
      setUrl(
        `https://signup.quickbooks.intuit.com/?locale=${lang}&offerId=${campaignOfferID}&offerType=buy&bc=OBI-LL3`
      );
    }
  }, [payrollSelected]);

  const total = (payroll, current) => {
    return payroll + current;
  };

  const radio = (
    <div className={styles.radioContainer}>
      <div className={styles.radioWrapper}>
        <input
          id={`noThanks${campaignOfferID}`}
          name={`trial${campaignOfferID}`}
          type="radio"
          value={`noThanks${campaignOfferID}`}
          checked={payrollSelected === false}
          onChange={() => setPayrollSelected(false)}
          className={styles.radio}
        />
        <label htmlFor={`noThanks${campaignOfferID}`} className={styles.label}>
          <span className={styles.labelRadio}></span>
          No Thanks
        </label>
      </div>
      <div className={styles.radioWrapper}>
        <input
          id={`addPayroll${productName}`}
          name={`trial${campaignOfferID}`}
          type="radio"
          value={`addPayroll${productName}`}
          checked={payrollSelected === true}
          onChange={() => setPayrollSelected(true)}
          className={styles.radio}
        />
        <label htmlFor={`addPayroll${productName}`} className={styles.label}>
          <span className={styles.labelRadio}></span>
          Add Payroll
        </label>
      </div>
    </div>
  );

  const features = (
    <>
      <ul className={styles.uList}>
        {featureList.map((feature, index) => {
          return (
            <li className={styles.list} key={index}>
              {feature}
            </li>
          );
        })}
      </ul>
    </>
  );
  const featurearrow = (
    <span
      className={`${styles.showFeatureBtnIcon} ${
        showFeature && styles.showFeatureBtnIconDown
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 16"
      >
        <path
          fill="#393A3D"
          d="M9.009 19.013a1 1 0 01-.709-1.708l5.3-5.285-5.281-5.3a1 1 0 011.416-1.413l5.991 6.009a1 1 0 010 1.414l-6.011 5.991a.994.994 0 01-.706.292z"
        />
      </svg>
    </span>
  );
  if (loading) {
    return <>loading...</>;
  }
  return (
    <div className={styles.payrollTogetherModal}>
      <div className={styles.selectedPlanContent}>
        <div>
          <div className={styles.selectedPlanTitle}>{mySelectedPlanTitle}</div>
          <div className={styles.planName}>{selectedPlan}</div>
          <div className={styles.discountTitle}>{planDiscountTitle}</div>
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.originalPrice}>
            {formatCurrency(productPrice, lang)}
          </span>{" "}
          <span className={styles.discountedPrice}>
            {formatCurrency(discountedProductPrice, lang)}
          </span>{" "}
          <span className={styles.duration}>/{monthLabel}</span>
        </div>
      </div>
      <div className={styles.payrollContent}>
        <div className={styles.payrollOption}>
          <div className={styles.payrollText}>
            <div className={styles.payrollTitle}>{payrollTitle}</div>
            <div className={styles.payrollDescription}>
              {payrollDescription}
            </div>
          </div>
          <div
            className={`${styles.payrollPriceSection} ${
              payrollSelected && styles.payrollSelected
            } `}
          >
            <div>
              <span className={styles.payrollPrice}>
                {formatCurrency(payroll, lang)}
              </span>
              <span className={styles.duration}> /{monthLabel}</span>
            </div>
            <div className={styles.payrollPerEmployee}>
              + {formatCurrency(perEmployeePrice, lang)}/{employeeLabel}
            </div>
          </div>
        </div>
        {radio}
        <button
          className={styles.showFeatureBtn}
          onClick={() => setShowFeature(!showFeature)}
        >
          <span>See features </span>
          {featurearrow}
        </button>
        {showFeature && features}
      </div>
      <div className={styles.totalContent}>
        <div>{totalLabel}</div>

        <div className={styles.totalPriceContainer}>
          <div className={styles.priceContainer}>
            <span className={styles.originalPrice}>
              {formatCurrency(total(payrollPrice, productPrice), lang)}
            </span>{" "}
            <span className={styles.discountedPrice}>
              {formatCurrency(
                total(payrollPrice, discountedProductPrice),
                lang
              )}
            </span>{" "}
            <span className={styles.duration}>/{monthLabel}</span>
          </div>
          <div className={styles.taxText}>{taxLabel}</div>
          <Button
            data-wa-link={`payroll-together-btn`}
            variant="primary"
            href={url}
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
