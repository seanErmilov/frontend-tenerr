import { Carousel } from 'react-responsive-carousel'
import { countries } from 'country-data';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import star from '../assets/img/svg/star.svg' // Import the image
import ReactCountryFlag from "react-country-flag"

const CountryCodes = ["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"]

export function ReviewCarousel({ reviews, loc, renderStars }) {
  const country = CountryCodes[Math.floor(Math.random() * CountryCodes.length)];
  const fiveStarReviews = reviews.filter(review => review.rate === 5)
  return (
    <div className="gig-reviews-carousel">

      <h2>What people loved about this freelancer</h2>

      {fiveStarReviews.length > 0 && (
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          autoPlay={false}
          interval={5000}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button type="button" onClick={onClickHandler} title={label} className="carousel-arrow prev">
                <span aria-hidden="true">&lt;</span>
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button type="button" onClick={onClickHandler} title={label} className="carousel-arrow next">
                <span aria-hidden="true">&gt;</span>
              </button>
            )
          }
        >
          {fiveStarReviews.map(review => (

            <div key={review.id} className="review-carousell">
              {/* 1 */}
              <img className="reviewer-img" src={review.by.imgUrl} />

              <div className='first-row'>

                {/* 2 */}
                <div className="reviewer-carousell-name">{review.by.fullname}</div>

                {/* 3 */}
                <div className="reviewer-carousell-loc">
                  <ReactCountryFlag
                    countryCode={country}
                    svg
                    title={country}
                  /> {countries[country].name}
                </div>

                {/* 4 */}
                <div className="review-carousell-rate">
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <div>5</div>
                </div>
              </div>

              {/* 5 */}
              <div className="review-carousell-txt">{review.txt}</div>

              <div className="review-carousell-time">1 year ago</div>


            </div>
          ))}
        </Carousel>
      )}
    </div>

  )
}



