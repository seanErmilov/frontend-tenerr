import React, { useState } from 'react'

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
            price: price *2,
        },
        premium: {
            name: 'Premium',
            description: 'Premium package with full features',
            price: price *5,
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
            </button>
        </div>

    )
}
