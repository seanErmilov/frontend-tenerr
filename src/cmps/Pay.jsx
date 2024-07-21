import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

export function Pay() {
  const { state } = useLocation()
  const { packageDetails } = state || {}
  const [quantity, setQuantity] = useState(state?.quantity || 1)
  const [additionalRevision, setAdditionalRevision] = useState(false)
  const [additionalLogo, setAdditionalLogo] = useState(false)
  const [socialMediaKit, setSocialMediaKit] = useState(false)
  const [moreColorOptions, setMoreColorOptions] = useState(false)
  const [moreFontOptions, setMoreFontOptions] = useState(false)
  const [styleGuide, setStyleGuide] = useState(false)

  function increaseQuantity() {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  function decreaseQuantity() {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  function toggleAdditionalRevision() {
    setAdditionalRevision(!additionalRevision)
  }

  function toggleAdditionalLogo() {
    setAdditionalLogo(!additionalLogo)
  }

  function toggleSocialMediaKit() {
    setSocialMediaKit(!socialMediaKit)
  }

  function toggleMoreColorOptions() {
    setMoreColorOptions(!moreColorOptions)
  }

  function toggleMoreFontOptions() {
    setMoreFontOptions(!moreFontOptions)
  }

  function toggleStyleGuide() {
    setStyleGuide(!styleGuide)
  }

  const additionalRevisionCost = 382.34
  const additionalLogoCost = 955.85
  const socialMediaKitCost = 286.75
  const moreColorOptionsCost = 172.05
  const moreFontOptionsCost = 172.05
  const styleGuideCost = 955.85
  const additionalDays = 1

  function formatPrice(price) {
    return price.toLocaleString('en-US')
  }

  function calculateTotalPrice() {
    const packageTotal = packageDetails.price * quantity
    const revisionTotal = additionalRevision ? additionalRevisionCost : 0
    const logoTotal = additionalLogo ? additionalLogoCost : 0
    const socialMediaKitTotal = socialMediaKit ? socialMediaKitCost : 0
    const moreColorOptionsTotal = moreColorOptions ? moreColorOptionsCost : 0
    const moreFontOptionsTotal = moreFontOptions ? moreFontOptionsCost : 0
    const styleGuideTotal = styleGuide ? styleGuideCost : 0
    return packageTotal + revisionTotal + logoTotal + socialMediaKitTotal + moreColorOptionsTotal + moreFontOptionsTotal + styleGuideTotal
  }

  function calculateTotalWaitingTime() {
    let totalDays = packageDetails.avgResponseTime
    if (additionalRevision) totalDays += additionalDays
    if (additionalLogo) totalDays += additionalDays
    if (socialMediaKit) totalDays += additionalDays
    if (moreColorOptions) totalDays += additionalDays
    if (moreFontOptions) totalDays += additionalDays
    if (styleGuide) totalDays += additionalDays
    return totalDays
  }

  function handleContinue() {
    history.push('/confirmation', {
      packageDetails,
      quantity,
      additionalOptions: {
        additionalRevision,
        additionalLogo,
        socialMediaKit,
        moreColorOptions,
        moreFontOptions,
        styleGuide,
      },
      totalPrice: calculateTotalPrice(),
      totalWaitingTime: calculateTotalWaitingTime()
    })
  }

  return (
    <div>
      <div className="pay-details">
        <div className='pricename-total'>
          <h2>{packageDetails.name}</h2>
          <p> ₪{formatPrice(calculateTotalPrice())}</p>
        </div>
        <p className='description'>{packageDetails.description}</p>
        <div className="quantity-controls">
          <p>Gig Quantity</p>
          <div className='quantity'>
            <button onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
        </div>
      </div>
      <p>Upgrade your order with extras</p>

      <div className="additional">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="additionalRevision"
            checked={additionalRevision}
            onChange={toggleAdditionalRevision}
          />
          <label htmlFor="additionalRevision">
            <h3>Additional Revision (+1 day)</h3>
            <p>Add an additional revision your seller will provide after the delivery.</p>
            <p>₪{formatPrice(additionalRevisionCost)}</p>
          </label>
        </div>
      </div>

      <div className="additional">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="additionalLogo"
            checked={additionalLogo}
            onChange={toggleAdditionalLogo}
          />
          <label htmlFor="additionalLogo">
            <h3>Additional Logo (+1 day)</h3>
            <p>Add another (1) logo concept.</p>
            <p>₪{formatPrice(additionalLogoCost)}</p>
          </label>
        </div>
      </div>

      <div className="additional">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="socialMediaKit"
            checked={socialMediaKit}
            onChange={toggleSocialMediaKit}
          />
          <label htmlFor="socialMediaKit">
            <h3>Include Social Media Kit (+1 day)</h3>
            <p>You'll get graphics showing your logo that you can use on social media platforms. Ex. Facebook and Instagram.</p>
            <p>₪{formatPrice(socialMediaKitCost)}</p>
          </label>
        </div>
      </div>

      <div className="additional">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="moreColorOptions"
            checked={moreColorOptions}
            onChange={toggleMoreColorOptions}
          />
          <label htmlFor="moreColorOptions">
            <h3>More Color Options (+1 day)</h3>
            <p>I will include three additional color combinations for your logo design.</p>
            <p>₪{formatPrice(moreColorOptionsCost)}</p>
          </label>
        </div>
      </div>

      <div className="additional">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="moreFontOptions"
            checked={moreFontOptions}
            onChange={toggleMoreFontOptions}
          />
          <label htmlFor="moreFontOptions">
            <h3>More Font Options (+1 day)</h3>
            <p>I will include three different font alternatives for the brand name.</p>
            <p>₪{formatPrice(moreFontOptionsCost)}</p>
          </label>
        </div>
      </div>

      <div className="additional">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="styleGuide"
            checked={styleGuide}
            onChange={toggleStyleGuide}
          />
          <label htmlFor="styleGuide">
            <h3>Style Guide (+1 day)</h3>
            <p>I will include a custom style guide / brand book.</p>
            <p>₪{formatPrice(styleGuideCost)}</p>
          </label>
        </div>
      </div>

      {(additionalRevision || additionalLogo || socialMediaKit || moreColorOptions || moreFontOptions || styleGuide) && (
        <div className='order-summary'>
          <p>Additional options added</p>
          <p>New Average Response Time: {calculateTotalWaitingTime()} days</p>
        </div>
      )}

      <footer className='btn-pay'>
        <button onClick={handleContinue}>Continue (₪{formatPrice(calculateTotalPrice())})</button>
        <span>You won’t be charged yet</span>
      </footer>
    </div>
  )
}
