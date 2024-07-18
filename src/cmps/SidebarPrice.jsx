import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export function SidebarPrice({ price }) {
    const [selectedPackage, setSelectedPackage] = useState('normal')

    const packages = {
        normal: {
            name: 'Normal',
            description: 'Basic package with standard features',
            price: price,
        },
        medium: {
            name: 'Medium',
            description: 'Enhanced package with additional features',
            price: price * 2,
        },
        premium: {
            name: 'Premium',
            description: 'Premium package with full features',
            price: price * 5,
        },
    }

    const handlePackageChange = (packageType) => {
        setSelectedPackage(packageType)
        const { price } = packages[packageType]
        onChange({ price, package: packageType })
    }

    return (
        <div className="sidebar">
            <div className="package-options">
                {Object.keys(packages).map((pkg) => (
                    <button
                        key={pkg}
                        className={selectedPackage === pkg ? 'active' : ''}
                        onClick={() => handlePackageChange(pkg)}
                    >
                        {packages[pkg].name}
                    </button>
                ))}
            </div>
            <div className="package-details">
                <h4>{packages[selectedPackage].name}</h4>
                <div>
                    <label> ₪{packages[selectedPackage].price}</label>
                </div>
            </div>
            <p className='sidbar-des'>{packages[selectedPackage].description}</p>
            <button className='sidebar-btn-price'>
                Continue
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" /></svg></button>
                <Link > <p className='link'>Compare packages</p></Link>
        </div>

    )
}
