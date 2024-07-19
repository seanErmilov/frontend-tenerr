
 import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Pay } from './pay'

export function SidebarPrice({ price, avgResponseTime, onChange }) {
    const [selectedPackage, setSelectedPackage] = useState('normal')
    const [isCollapsed, setIsCollapsed] = useState(true)

    const navigate = useNavigate()

    const packages = {
        normal: {
            name: 'Normal',
            description: 'Basic package with standard features',
            price: price,
            avgResponseTime: avgResponseTime,
            features: [
                { name: "1 concept included", included: true },
                { name: "Logo transparency", included: false },
                { name: "Vector file", included: false },
                { name: "Printable file", included: false },
                { name: "Include 3D mockup", included: false },
                { name: "Include source file", included: false },
                { name: "Stationery designs", included: false },
            ],
            colors: ['black', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray']
        },
        medium: {
            name: 'Medium',
            description: 'Enhanced package with additional features',
            price: price * 2,
            avgResponseTime: avgResponseTime + 1,
            features: [
                { name: "1 concept included", included: true },
                { name: "Logo transparency", included: true },
                { name: "Vector file", included: true },
                { name: "Printable file", included: false },
                { name: "Include 3D mockup", included: false },
                { name: "Include source file", included: false },
                { name: "Stationery designs", included: false },
            ],
            colors: ['black', 'black', 'gray', 'gray', 'gray', 'gray', 'gray']
        },
        premium: {
            name: 'Premium',
            description: 'Premium package with full features',
            price: price * 5,
            avgResponseTime: avgResponseTime + 3,
            features: [
                { name: "1 concept included", included: true },
                { name: "Logo transparency", included: true },
                { name: "Vector file", included: true },
                { name: "Printable file", included: true },
                { name: "Include 3D mockup", included: true },
                { name: "Include source file", included: true },
                { name: "Stationery designs", included: true },
            ],
            colors: ['black', 'black', 'black', 'black', 'black', 'black', 'black']
        },
    }

    const handlePackageChange = (packageType) => {
        setSelectedPackage(packageType)
        const { price } = packages[packageType]
        navigate('/pay', { state: { packageDetails, quantity: 1 } })
    }

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    }
  
    const handleButtonClick = () => {
        const packageDetails = packages[selectedPackage]
        navigate('/pay', { state: { packageDetails } })
    }
    const down = 'https://cdn-icons-png.flaticon.com/128/8287/8287014.png'
    const up = 'https://cdn-icons-png.flaticon.com/128/2722/2722987.png';
    
    return (
        <div className="sidebar">
            <div className="package-options">
                {Object.keys(packages).map((pkg) => (
                    <button
                        key={pkg}
                        className={selectedPackage === pkg ? 'active' : ''}
                        onClick={() => handlePackageChange(pkg)}>{packages[pkg].name}</button>
                ))}
            </div>
            <section>
            <div className="package-details">
                <h4>{packages[selectedPackage].name}</h4>
                <div>
                    <label> ₪{packages[selectedPackage].price}</label>
                </div>
            </div>
            <p className='sidebar-des'>{packages[selectedPackage].description}</p>
            <h1 className='sidebar-delivery'>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOCAwQzMuNiAwIDAgMy42IDAgOHMzLjYgOCA4IDggOC0zLjYgOC04LTMuNi04LTgtOHptMCAxNGMtMy4zIDAtNi0yLjctNi02czIuNy02IDYtNiA2IDIuNyA2IDYtMi43IDYtNiA2eiIvPjxwYXRoIGQ9Ik05IDRIN3Y1aDVWN0g5VjR6Ii8+PC9zdmc+" />{packages[selectedPackage].avgResponseTime}-day delivery
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNC41MDAwMSAxMS40OTk5QzYuNDAwMDEgMTMuMzk5OSA5LjYwMDAxIDEzLjM5OTkgMTEuNSAxMS40OTk5QzEyLjIgMTAuNzk5OSAxMi43IDkuNzk5OSAxMi45IDguNzk5OUwxNC45IDkuMDk5OUMxNC43IDEwLjU5OTkgMTQgMTEuODk5OSAxMyAxMi44OTk5QzEwLjMgMTUuNTk5OSA1LjkwMDAxIDE1LjU5OTkgMy4xMDAwMSAxMi44OTk5TDAuOTAwMDEyIDE1LjA5OTlMMC4yMDAwMTIgOC42OTk5TDYuNjAwMDEgOS4zOTk5TDQuNTAwMDEgMTEuNDk5OVoiLz48cGF0aCBkPSJNMTUuOCA3LjI5OTlMOS40MDAwMSA2LjU5OTlMMTEuNSA0LjQ5OTlDOS42MDAwMSAyLjU5OTkgNi40MDAwMSAyLjU5OTkgNC41MDAwMSA0LjQ5OTlDMy44MDAwMSA1LjE5OTkgMy4zMDAwMSA2LjE5OTkgMy4xMDAwMSA3LjE5OTlMMS4xMDAwMSA2Ljg5OTlDMS4zMDAwMSA1LjM5OTkgMi4wMDAwMSA0LjA5OTkgMy4wMDAwMSAzLjA5OTlDNC40MDAwMSAxLjY5OTkgNi4xMDAwMSAxLjA5OTkgNy45MDAwMSAxLjA5OTlDOS43MDAwMSAxLjA5OTkgMTEuNSAxLjc5OTkgMTIuOCAzLjA5OTlMMTUgMC44OTk5MDJMMTUuOCA3LjI5OTlaIi8+PC9zdmc+" alt="" />{packages[selectedPackage].avgResponseTime + 3} Revisions
            </h1>
            <div className="collapsible-content">
            <h4 onClick={toggleCollapse} role="button" aria-expanded={!isCollapsed}>
                    What's Included 
                    <img src={isCollapsed ? up : down}
                    />
                    
                </h4>
                {!isCollapsed && (
                    <ul>
                        {packages[selectedPackage].features.map((feature, index) => (
                            <li
                                key={index}
                                style={{
                                    color: packages[selectedPackage].colors[index],
                                    listStyleType: 'none',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                <img
                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxMSA5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9ImN1cnJlbnRGaWxsIj48cGF0aCBkPSJNMy42NDUgOC4xMDIuMTU4IDQuNjE1YS41MzYuNTM2IDAgMCAxIDAtLjc1OWwuNzU5LS43NThjLjIxLS4yMS41NDktLjIxLjc1OCAwbDIuMzUgMi4zNDlMOS4wNTQuNDE2Yy4yMS0uMjEuNTUtLjIxLjc1OSAwbC43NTguNzU4Yy4yMS4yMS4yMS41NSAwIC43NTlMNC40MDMgOC4xMDJjLS4yMDkuMjEtLjU0OS4yMS0uNzU4IDBaIi8+PC9zdmc+" />
                                {feature.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button className='sidebar-btn-price' onClick={handleButtonClick}>
                    Continue
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                        <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                    </svg>
                </button>
            </section>
            <Link to="/compare-packages"><p className='link'>Compare packages</p></Link>
        </div>
    )
}