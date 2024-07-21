import { storageService } from '../async-storage.service'
import { getRandomElement, getRandomInt, loadFromStorage, makeId, saveToStorage } from '../util.service'
import { userService } from '../user'
const STORAGE_KEY = 'gigDb'

export const gigService = {
    query,
    getById,
    save,
    remove,
    addGigMsg,
    _createGigs
}
window.cs = gigService

_createGigs()

async function query(filterBy = { title: '', price: 0 }) {
    var gigs = await storageService.query(STORAGE_KEY)
    const { title, tags } = filterBy

    if (title) {
        const regex = new RegExp(filterBy.title, 'i')
        gigs = gigs.filter(gig => regex.test(gig.title) || regex.test(gig.description))
    }
    if (tags && tags.length) {
        gigs = gigs.filter(gig => {
            return tags.every(tag => gig.tags.includes(tag))
        })
    }
    return gigs
}

function getById(gigId) {
    return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
    await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
    console.log('gig :', gig)
    var savedGig
    if (gig._id) {
        const gigToSave = { ...gig }
        savedGig = await storageService.put(STORAGE_KEY, gigToSave)
    } else {
        const gigToSave = { ...gig }
        gigToSave.owner = userService.getLoggedinUser()
        console.log('gigToSave :', gigToSave)
        savedGig = await storageService.post(STORAGE_KEY, _getRandomGig(gigToSave))
        console.log('savedGig :', savedGig)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    // Later, this is all done by the backend
    const gig = await getById(gigId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    gig.msgs.push(msg)
    await storageService.put(STORAGE_KEY, gig)

    return msg
}

function _getRandomGig(partialGig = {}) {
    console.log('partialGig :', partialGig)
    const titles = [
        'I will design your logo',
        'I will create a website for you',
        'I will write an article for you',
        'I will make a promotional video',
        'I will provide SEO services'
    ]
    const descriptions = [
        'I will make a unique and professional logo that represents your brand identity perfectly. Using advanced design techniques and creativity, I will deliver a logo that stands out and captures the essence of your business.',
        'I will build a fully responsive and visually appealing website tailored to your needs. Whether it’s a personal blog, a corporate site, or an e-commerce platform, I ensure a seamless user experience across all devices.',
        'I will write a compelling and engaging article that captivates your audience. With thorough research and a keen eye for detail, I craft content that is informative, well-structured, and optimized for search engines.',
        'I will create an engaging and high-quality promotional video that effectively communicates your message. From concept development to final editing, I handle all aspects of video production to ensure a captivating result.',
        'I will optimize your website for search engines to improve its visibility and ranking. Using proven SEO strategies, I enhance your site’s performance, drive more traffic, and help you achieve better online presence and higher conversion rates.'
    ]

    const locations = ['Ghana', 'USA', 'India', 'Germany', 'Brazil']

    const tags = [
        ['graphics', 'lifestyle'],
        ['video', 'business'],
        ['writing', 'writing'],
        ['ai', 'music'],
        ['digital', 'ai'],
        ['music', 'digital'],
        ['programming', 'digital'],
        ['business', 'digital'],
        ['lifestyle', 'business']
    ]

    const users = [
        { _id: 'u101', fullname: 'Dudu Da', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3afO247RTO80vqElpg1Iyapzzg-d-bfeRxQ&s', level: 'standard', rate: 4, description: 'An experienced logo designer with a passion for creating unique brand identities.' },
        { _id: 'u102', fullname: 'Jane Doe', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7_D7oHLUDST-89GtjX2R4i3OPZSkCEICQw&s', level: 'premium', rate: 5, description: 'A seasoned web developer specializing in building responsive and user-friendly websites.' },
        { _id: 'u103', fullname: 'John Smith', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaXrFMnQrS3cdGFTB-UpG-5qMGMQyybPu7xg&s', level: 'basic', rate: 3, description: 'A skilled writer with a knack for crafting engaging and informative articles.' }
    ]

    const imgUrls = [
        "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/c138cfdf4859bb497ff904beeb4be5f8-1717583961/Creative_self_new/design-unique-cover-art.jpg",
        "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/415283989e317d946dad85b8efed8f7b-1717284806/Halloween_leaves_moon/design-unique-cover-art.jpg",
        "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/18f0ed6d24c12557a40244aadbe6c572-1720003890/Lost_love_final/design-unique-cover-art.jpg",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/207529273/original/dc28efc7d364e1ecf281be7580c666829dc8279f/design-unique-cover-art.png",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/207529273/original/784113fba7abe525b05a0f1a3889e09716bb39e5/design-unique-cover-art.png"
    ]

    const gig = {
        _id: `u${getRandomInt(100, 9999)}`,
        title: getRandomElement(titles),
        price: parseFloat((Math.random() * 100).toFixed(0)),
        owner: {
            ...getRandomElement(users),
        },
        daysToMake: getRandomInt(1, 14),
        description: getRandomElement(descriptions),
        avgResponseTime: getRandomInt(1, 24),
        loc: getRandomElement(locations),
        imgUrls: imgUrls,
        tags: getRandomElement(tags),
        likedByUsers: ['mini-user'],
        reviews: _generateReviews(users)
    }
    console.log('gigin service :', gig)
    console.log('{ ...gig, ...partialGig } :', { ...gig, ...partialGig })
    return { ...gig, ...partialGig }
}

function _createGigs() {
    const gigs = loadFromStorage(STORAGE_KEY) || []
    if (gigs && gigs.length) return

    for (let i = 0; i < 35; i++) {
        gigs.push(_getRandomGig())
    }
    saveToStorage(STORAGE_KEY, gigs)
}

function _generateReviews(users) {
    const reviews = []

    const reviewTexts = [
        'Did an amazing work',
        'Goed werk. Communiceert helder en werkt samen naar een goed eind resultaat',
        'Stefan followed directions beautifully. Despite people weighing in on the logo and making too many comments, Stefan kept at it, and seemed to please everyone. Way to go!',
        'Stefan is a pleasure to work with. Well consider using him again for future projects! He took our directions and presented a report that will be used for the coming years to communicate our plans effectively.',
        'Excellent service',
        'Very professional and timely. Highly recommended!',
        'The final product exceeded my expectations. Great job!',
        'Superb communication and outstanding results!',
        'Creative and unique approach to design. Loved it!'
    ]
    for (let i = 0; i < 6; i++) {
        reviews.push({
            id: `r${getRandomInt(100, 9999)}`,
            txt: getRandomElement(reviewTexts),
            rate: getRandomInt(1, 5),
            by: getRandomElement(users)//mini user in development
        })
    }
    return reviews
}
