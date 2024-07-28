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

_createGigs()

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
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/148451927/original/8fd88e53637c1a51087e5b8a5adbfb8507d3936b.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/138372386/original/db070e5c23ed81ab6c2ec472060cc8ecb5abc9f3.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/273650561/original/ff6bfc8e1bff54353815b047bc135b9516ad7066.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/229238020/original/96fce9db1876da79533e15d60dcfa5de8216d18b.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/107996286/original/fbdd899de5a8fb881547b9e49de84e489b9a90af.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/252280723/original/b69272e2f5ad314a58bc55499cad8f9109c944da.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/192945874/original/45074ea0dfcd30781722c0cc82cdd54355d2102d.jpg",
        "https://www.fiverr.com/antonclevela97/create-2-custom-logo-designs-exclusive-hi-quality?context_referrer=subcategory_listing&source=category_tree&ref_ctx_id=18a92fc316484fd3a2b795834dd8dd01&pckg_id=1&pos=6&context_type=rating&funnel=18a92fc316484fd3a2b795834dd8dd01&imp_id=8432abbd-117b-4ed9-bf3c-2dd2ac2ca28b",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/870c4e3c181ccd1361fa99aab58f71d8-1689426735/Cosmic%20Highs%20Logo_A%20%20Live%20Moc/design-minimalist-logo-design.jpg",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/d6234c03522f05c4e835918a663db0b4-1689160324/mooifutnou%20nl-A1%20Live%20Moc/design-minimalist-logo-design.jpg",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/23197467/original/d4f9121d0d962301e3ef52c1a5217bf003889e2a/design-an-impressive-logo.jpg",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/23197467/original/c16ce5a0377572be80eee0bfda3c95c6361b04bd/design-an-impressive-logo.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/127707871/original/58036eaa037a90f7230bfc551916036a455c3e4b.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/122501197/original/3acf4aeee6f62ace404d17a217a0ddf12c6b350e.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/223937977/original/15118f6812446c87f0ab62756060825172dae22b.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/152144644/original/b3d1df422b12277a3f26d57f263f91b53c044f30.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/179527558/original/a4a1076ede0b96d8e56ebee8f2667637284935d8.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/302021377/original/1ef07d25913e351a5fe6a636fa1379b135825af3.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/6391413/original/1f6d61882949cf993d547729665b20eb32f82ad7.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/143871884/original/cdba0a3892ba81a7c1b202b10e9385825787f4b6.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs2/145577603/original/8594f5f7f76b7d0c0f2d3fe97e59830f9af331b6.jpg",
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
