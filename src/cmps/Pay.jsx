import React, { useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

export function Pay() {
  const { state } = useLocation()
  const { packageDetails, quantity: initialQuantity } = state || {}
  const [quantity, setQuantity] = useState(initialQuantity || 1)
  const [additionalRevision, setAdditionalRevision] = useState(false)
  const [additionalLogo, setAdditionalLogo] = useState(false)
  const [socialMediaKit, setSocialMediaKit] = useState(false)
  const [moreColorOptions, setMoreColorOptions] = useState(false)
  const [moreFontOptions, setMoreFontOptions] = useState(false)
  const [styleGuide, setStyleGuide] = useState(false)

  const increaseQuantity = useCallback(() => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }, [])

  const decreaseQuantity = useCallback(() => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }, [])

  const toggleAdditionalRevision = useCallback(() => {
    setAdditionalRevision(prev => !prev)
  }, [])

  const toggleAdditionalLogo = useCallback(() => {
    setAdditionalLogo(prev => !prev)
  }, [])

  const toggleSocialMediaKit = useCallback(() => {
    setSocialMediaKit(prev => !prev)
  }, [])

  const toggleMoreColorOptions = useCallback(() => {
    setMoreColorOptions(prev => !prev)
  }, [])

  const toggleMoreFontOptions = useCallback(() => {
    setMoreFontOptions(prev => !prev)
  }, [])

  const toggleStyleGuide = useCallback(() => {
    setStyleGuide(prev => !prev)
  }, [])

  const additionalRevisionCost = 382.34
  const additionalLogoCost = 955.85
  const socialMediaKitCost = 286.75
  const moreColorOptionsCost = 172.05
  const moreFontOptionsCost = 172.05
  const styleGuideCost = 955.85
  const additionalDays = 1

  function formatPrice(price) {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'ILS' })
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

  if (!packageDetails) return <div>Package details not found</div>

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

      {[{
        id: 'additionalRevision',
        label: 'Additional Revision (+1 day)',
        description: 'Add an additional revision your seller will provide after the delivery.',
        cost: additionalRevisionCost,
        state: additionalRevision,
        toggle: toggleAdditionalRevision
      }, {
        id: 'additionalLogo',
        label: 'Additional Logo (+1 day)',
        description: 'Add another (1) logo concept.',
        cost: additionalLogoCost,
        state: additionalLogo,
        toggle: toggleAdditionalLogo
      }, {
        id: 'socialMediaKit',
        label: 'Include Social Media Kit (+1 day)',
        description: 'You\'ll get graphics showing your logo that you can use on social media platforms. Ex. Facebook and Instagram.',
        cost: socialMediaKitCost,
        state: socialMediaKit,
        toggle: toggleSocialMediaKit
      }, {
        id: 'moreColorOptions',
        label: 'More Color Options (+1 day)',
        description: 'I will include three additional color combinations for your logo design.',
        cost: moreColorOptionsCost,
        state: moreColorOptions,
        toggle: toggleMoreColorOptions
      }, {
        id: 'moreFontOptions',
        label: 'More Font Options (+1 day)',
        description: 'I will include three different font alternatives for the brand name.',
        cost: moreFontOptionsCost,
        state: moreFontOptions,
        toggle: toggleMoreFontOptions
      }, {
        id: 'styleGuide',
        label: 'Style Guide (+1 day)',
        description: 'I will include a custom style guide / brand book.',
        cost: styleGuideCost,
        state: styleGuide,
        toggle: toggleStyleGuide
      }].map(({ id, label, description, cost, state, toggle }) => (
        <div className="additional" key={id}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id={id}
              checked={state}
              onChange={toggle}
            />
            <label htmlFor={id}>
              <h3>{label}</h3>
              <p>{description}</p>
              <p>₪{formatPrice(cost)}</p>
            </label>
          </div>
        </div>
      ))}

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
