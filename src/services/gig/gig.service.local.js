import { storageService } from '../async-storage.service'
import { getRandomElement, getRandomElements, getRandomInt, loadFromStorage, makeId, saveToStorage } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'gigDb'

export const gigService = {
    query,
    getById,
    save,
    remove,
    addGigMsg
}
window.cs = gigService

// _createGigs()

async function query(filterBy = { title: '', price: 0 }) {
    let gigs = await storageService.query(STORAGE_KEY)
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
    let savedGig
    if (gig._id) {
        const gigToSave = { ...gig }
        savedGig = await storageService.put(STORAGE_KEY, gigToSave)
    } else {
        const gigToSave = { ...gig }
        gigToSave.owner = userService.getLoggedinUser()
        savedGig = await storageService.post(STORAGE_KEY, _getRandomGig(gigToSave))
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
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

function getSymbolByLevel(level) {
    const levels = {
        basic: 1,
        standard: 2,
        premium: 3
    }
    return levels[level] || 0
}

function _getRandomGig(partialGig = {}) {
    const titles = [
        'I will design your logo',
        'I will create a website for you',
        'I will write an article for you',
        'I will make a promotional video',
        'I will provide SEO services'
    ]
    const descriptions = [
        'Professional Logo Clean, modern and custom logo with high-quality standards! Im a full time graphic designer offering creative logo design service. My gig is different from other logo design gigs since Im offering unlimited concepts and unlimited revisions for the most competitive price. Designing new concepts is something very interesting to me. Im a senior creative graphic designer, with expertise in illustration and animation - all the skills needed for bespoke and original logos UNLIMITED original and unique concepts until you are 100% happy UNLIMITED revisions and color options based on your requirements and branding PROFESSIONAL customer service and communication at all times, replies are instant! UNRUSHED service where quality comes first GUARANTEED fast delivery PROFESSIONAL team of 3 full time graphic designers LIFETIME support on ALL logo designs.'
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
        { _id: 'u101', fullname: 'Dudu Da', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3afO247RTO80vqElpg1Iyapzzg-d-bfeRxQ&s', level: 2, diamonds: 2, rate: 4, description: 'An experienced logo designer with a passion for creating unique.' },
        { _id: 'u102', fullname: 'Jane Doe', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7_D7oHLUDST-89GtjX2R4i3OPZSkCEICQw&s', level: 3, diamonds: 3, rate: 5, description: 'Specializing in building responsive and user-friendly websites.' },
        { _id: 'a101', fullname: 'John Smith', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaXrFMnQrS3cdGFTB-UpG-5qMGMQyybPu7xg&s', level: 1, diamonds: 1, rate: 3, description: 'A skilled writer with a knack for crafting engaging and informative articles.' }
    ]

    const imgUrls = [
        "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/c138cfdf4859bb497ff904beeb4be5f8-1717583961/Creative_self_new/design-unique-cover-art.jpg",
        "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/415283989e317d946dad85b8efed8f7b-1717284806/Halloween_leaves_moon/design-unique-cover-art.jpg",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/18f0ed6d24c12557a40244aadbe6c572-1720003890/Lost_love_final/design-unique-cover-art.jpg",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/207529273/original/dc28efc7d364e1ecf281be7580c666829dc8279f/design-unique-cover-art.png",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/207529273/original/784113fba7abe525b05a0f1a3889e09716bb39e5/design-unique-cover-art.png",
        "https://fiverr-res.cloudinary.com/videos/so_0.692822,t_main1,q_auto,f_auto/acqh2sxrod8hhty9o54i/design-minimalist-logo-design.png",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/115722335/original/5655a351acead96fa69c29acde4abe0948d585f6/design-minimalist-logo-design.jpg",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/55f9c7f8c06734f6aa2cae52e05c8f63-1690531981/CASA%202%20%20logo-E5%20Live%20Moc/design-minimalist-logo-design.jpg",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/870c4e3c181ccd1361fa99aab58f71d8-1689426735/Cosmic%20Highs%20Logo_A%20%20Live%20Moc/design-minimalist-logo-design.jpg",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/d6234c03522f05c4e835918a663db0b4-1689160324/mooifutnou%20nl-A1%20Live%20Moc/design-minimalist-logo-design.jpg",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/23197467/original/d4f9121d0d962301e3ef52c1a5217bf003889e2a/design-an-impressive-logo.jpg",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/23197467/original/c16ce5a0377572be80eee0bfda3c95c6361b04bd/design-an-impressive-logo.jpg",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/263804107/original/ae4e4fc77fa5100fe035d9d167b1cc28e0d78e0b/build-your-wordpress-website-with-oxygen-builder.png",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/27cf03bd71a2545f9671f1e9d32b5980-1720730662/SAVE_20240711_224328/build-your-wordpress-website-with-oxygen-builder.jpg",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/6d0e10f04e7584ad639b37cbca8d5055-1720537917/SAVE_20240709_163640/build-your-wordpress-website-with-oxygen-builder.jpg",
    ]

    const gig = {
        _id: `u${getRandomInt(100, 99999)}`,
        title: getRandomElement(titles),
        price: parseFloat((Math.random() * 70 + 40).toFixed(0)),
        owner: getRandomElement(users),
        daysToMake: getRandomInt(1, 14),
        description: getRandomElement(descriptions),
        avgResponseTime: getRandomInt(1, 24),
        loc: getRandomElement(locations),
        imgUrls: getRandomElements(imgUrls, 4),
        tags: getRandomElement(tags),
        likedByUsers: ['mini-user'],
        reviews: _generateReviews(users),
    }

    return { ...gig, ...partialGig }
}

function _createGigs() {
    const gigs = loadFromStorage(STORAGE_KEY) || []
    if (gigs.length) return

    for (let i = 0; i < 55; i++) {
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

    for (let i = 0; i < 12; i++) {
        reviews.push({
            id: `r${getRandomInt(100, 99999)}`,
            txt: getRandomElement(reviewTexts),
            rate: getRandomInt(3, 5),
            by: getRandomElement(users)
        })
    }
    return reviews
}
