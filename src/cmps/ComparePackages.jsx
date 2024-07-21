import { useNavigate } from 'react-router-dom'

export function ComparePackages({ price, avgResponseTime }) {
  const navigate = useNavigate()

  const packages = [
    {
      name: 'Basic',
      price: '₪' + price,
      deliveryTime: `${avgResponseTime} days`,
      concepts: 2,
      features: {
        "Concept Included": "Yes",
        "Logo Transparency": "No",
        "Vector File": "No",
        "Printable File": "No",
        "3D Mockup": "No",
        "Source File": "No",
        "Stationery Designs": "No",
      }
    },
    {
      name: 'Standard',
      price: '₪' + (price * 2),
      deliveryTime: `${avgResponseTime + 1} days`,
      concepts: 3,
      features: {
        "Concept Included": "Yes",
        "Logo Transparency": "Yes",
        "Vector File": "Yes",
        "Printable File": "No",
        "3D Mockup": "No",
        "Source File": "No",
        "Stationery Designs": "No",
      }
    },
    {
      name: 'Premium',
      price: '₪' + (price * 5),
      deliveryTime: `${avgResponseTime + 3} days`,
      concepts: 4,
      features: {
        "Concept Included": "Yes",
        "Logo Transparency": "Yes",
        "Vector File": "Yes",
        "Printable File": "Yes",
        "3D Mockup": "Yes",
        "Source File": "Yes",
        "Stationery Designs": "Yes",
      }
    }
  ]

  const handlePackageSelection = (pkg) => {
    navigate('/pay', { state: { packageDetails: pkg, quantity: 1 } })
  }

  return (
    <div className="compare-packages">
      <h2>Compare Packages</h2>
      <table>
        <thead>
          <tr>
            <th>Package</th>
            {packages.map(pkg => (
              <th key={pkg.name}>{pkg.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Price</td>
            {packages.map(pkg => (
              <td key={pkg.name}>{pkg.price}</td>
            ))}
          </tr>

          {Object.keys(packages[0].features).map((feature, index) => (
            <tr key={index}>
              <td>{feature}</td>
              {packages.map(pkg => (
                <td key={pkg.name}>
                  <span className={`icon ${pkg.features[feature] === 'Yes' ? 'yes' : 'no'}`} />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td>Delivery Time</td>
            {packages.map(pkg => (
              <td key={pkg.name}>{pkg.deliveryTime}</td>
            ))}
          </tr>
          <tr>
            <td>Number of Concepts</td>
            {packages.map(pkg => (
              <td key={pkg.name}>{pkg.concepts}</td>
            ))}
          </tr>
          <tr>
            <td></td>
            {packages.map(pkg => (
              <td key={pkg.name}>
                <button onClick={() => handlePackageSelection(pkg)}>
                  Select
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
