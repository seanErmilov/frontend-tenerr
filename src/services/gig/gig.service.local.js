import { storageService } from '../async-storage.service'
import { getRandomElement, getRandomElements, getRandomInt, getRandomIntInclusive, loadFromStorage, makeId, saveToStorage } from '../util.service'
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

async function _getRandomGig(users, partialGig = {}) {

    const staticUsers = [
        {
            "_id": '66a5f964676fe11238a1bbb9',
            "fullname": "Alice Johnson",
            "imgUrl": "https://res.cloudinary.com/vanilla-test-images/image/upload/v1722153314/ib46tzoensnbadbypm8u.jpg",
            "description": "A skilled graphic designer specializing in vibrant illustrations and creative branding.",
            "rate": 5,
            "level": "premium"
        },
        {
            "_id": '66a5f964676fe11238a1bbba',
            "fullname": "Michael Smith",
            "imgUrl": "https://res.cloudinary.com/vanilla-test-images/image/upload/v1722153314/ib46tzoensnbadbypm9u.jpg",
            "description": "A web developer with a focus on user experience and responsive design.",
            "rate": 4.5,
            "level": "standard"
        },
        {
            "_id": '66a5f964676fe11238a1bbbc',
            "fullname": "Sophia Brown",
            "imgUrl": "https://res.cloudinary.com/vanilla-test-images/image/upload/v1722153314/ib46tzoensnbadbypm10u.jpg",
            "description": "An innovative packaging designer dedicated to creating sustainable solutions.",
            "rate": 4,
            "level": "standard"
        },
        {
            "_id": '66a5f964676fe11238a1bbbd',
            "fullname": "David Lee",
            "imgUrl": "https://res.cloudinary.com/vanilla-test-images/image/upload/v1722153314/ib46tzoensnbadbypm11u.jpg",
            "description": "A creative UX/UI designer with a knack for improving user engagement.",
            "rate": 4.7,
            "level": "premium"
        },
        {
            "_id": '66a5f964676fe11238a1bbbe',
            "fullname": "Emma Wilson",
            "imgUrl": "https://res.cloudinary.com/vanilla-test-images/image/upload/v1722153314/ib46tzoensnbadbypm12u.jpg",
            "description": "A versatile illustrator experienced in both digital and traditional media.",
            "rate": 5,
            "level": "premium"
        }
    ]
    users = [...users, ...staticUsers]

    const titleByTag = {
        graphics: [
            'I will design a unique logo for your brand',
            'I will create a modern logo for your startup',
            'I will develop a vintage logo design for your business',
            'I will provide a minimalist logo design that stands out',
            'I will create an elegant logo for your luxury brand',
            'I will design a playful logo for your childrens brand',
            'I will make a logo animation for your website or video',
            'I will design a unique logo for your food business',
            'I will create a logo for your personal brand or portfolio',
            'I will develop a responsive logo design for your website',
            'I will create eye-catching social media graphics',
            'I will provide professional business card designs',
            'I will design custom illustrations for your project',
            'I will create stunning flyer and poster designs',
            'I will design engaging infographics',
            'I will develop creative packaging designs',
            'I will create high-quality book cover designs',
            'I will design professional presentation slides',
            'I will provide custom t-shirt designs',
            'I will create an eye-catching banner for your website',
            'I will design an attractive email newsletter template',
            'I will provide social media branding packages',
            'I will create custom graphics for your blog posts',
            'I will design a unique brand style guide',
            'I will develop merchandise designs for your events',
            'I will create custom icons for your website or app',
            'I will design a professional letterhead and stationery',
            'I will create visually appealing event invitations',
            'I will design engaging YouTube thumbnails for your videos',
            'I will create custom graphics for online advertisements',
            'I will develop an attractive product catalog layout',
            'I will create dynamic presentations for conferences',
            'I will design a unique website layout for your brand',
            'I will create illustrations for your childrens book',
            'I will design visually appealing infographics for reports',
            'I will create promotional materials for your business',
            'I will design custom graphics for your podcast',
            'I will develop a logo for your non-profit organization',
            'I will create a logo for your sports team or event',
            'I will design a professional resume template',
            'I will provide visual branding for your event or conference',
            'I will create a unique logo for your blog or website',
            'I will design an eye-catching magazine cover',
            'I will create professional signage for your business',
            'I will develop a series of icons for your app or website',
            'I will design custom graphics for your online course',
            'I will create an illustration for your marketing materials',
            'I will design a cohesive brand identity package',
            'I will provide custom graphics for mobile applications',
            'I will design a unique label for your product',
            'I will create a logo and branding for your cafe or restaurant',
            'I will develop a logo for your tech startup',
            'I will create a visual identity for your fashion brand',
            'I will design promotional graphics for social media campaigns',
            'I will create an animated logo for your business',
            'I will provide custom graphics for your email signatures',
            'I will design a captivating cover photo for Facebook',
            'I will create a logo that reflects your business values',
            'I will develop a series of illustrations for your website',
            'I will design a memorable logo for your gaming brand',
            'I will create a unique brand mascot or character design'
        ],
        video: [
            'I will create a captivating promotional video',
            'I will edit your videos professionally',
            'I will create an engaging video intro',
            'I will produce a high-quality video ad',
            'I will make a compelling explainer video',
            'I will create stunning animation videos',
            'I will provide professional video editing services',
            'I will produce a cinematic video trailer',
            'I will create a personalized video message',
            'I will make a music video for your song'
        ],
        writing: [
            'I will write a high-quality article for you',
            'I will create engaging blog posts',
            'I will write compelling website content',
            'I will provide professional copywriting services',
            'I will write a detailed product description',
            'I will create persuasive sales copy',
            'I will write an informative ebook',
            'I will provide thorough proofreading and editing',
            'I will write creative short stories',
            'I will produce well-researched white papers'
        ],
        ai: [
            'I will develop AI solutions for your business',
            'I will create machine learning models',
            'I will implement AI-driven chatbots',
            'I will provide AI-based data analysis',
            'I will develop natural language processing tools',
            'I will create AI-powered recommendation systems',
            'I will integrate AI with your existing systems',
            'I will build custom AI applications',
            'I will develop computer vision solutions',
            'I will provide AI consultation and strategy'
        ],
        digital: [
            'I will provide expert SEO services',
            'I will manage your social media accounts',
            'I will create a digital marketing strategy',
            'I will run effective PPC campaigns',
            'I will provide email marketing services',
            'I will design engaging online advertisements',
            'I will create a content marketing plan',
            'I will provide digital marketing analytics',
            'I will optimize your website for conversions',
            'I will create engaging digital content'
        ],
        music: [
            'I will compose original music for your project',
            'I will provide professional music production',
            'I will create custom soundtracks',
            'I will offer music mixing and mastering services',
            'I will write lyrics for your songs',
            'I will produce high-quality podcast audio',
            'I will create unique sound effects',
            'I will record voiceovers for your project',
            'I will edit and enhance audio recordings',
            'I will provide music lessons and tutorials'
        ],
        programming: [
            'I will develop your web backend using Django and Bootstrap',
            'I will build a responsive website using HTML, CSS, and JavaScript',
            'I will create custom WordPress plugins',
            'I will develop a mobile app for Android and iOS',
            'I will design a Webflow website and convert Figma designs to Webflow',
            'I will provide API integration services',
            'I will develop a full-stack web application',
            'I will create a custom e-commerce site',
            'I will make an automated recipe WordPress website or food blog site',
            'I will offer software development consultation',
            'I will implement responsive design for your website',
            'I will create a custom CRM system tailored to your business',
            'I will build a RESTful API for your web application',
            'I will optimize your existing website for speed and performance',
            'I will set up a secure authentication system for your app',
            'I will integrate third-party services like payment gateways',
            'I will develop a content management system (CMS) for your needs',
            'I will create an interactive dashboard using React or Angular',
            'I will help you migrate your website to a new platform',
            'I will provide troubleshooting and debugging for your applications',
            'I will set up a responsive email template for your marketing campaigns',
            'I will develop a chat application using WebSockets',
            'I will create a custom booking or reservation system',
            'I will conduct a website security audit and fix vulnerabilities',
            'I will build a social media platform or community website',
            'I will develop a Progressive Web App (PWA) for offline capabilities',
            'I will create and optimize SQL databases for your application',
            'I will implement real-time data updates in your web application',
            'I will design and develop a mobile-first website',
            'I will create an online learning platform with course management',
            'I will provide training on web development best practices',
            'I will build a data visualization dashboard using D3.js',
            'I will implement user feedback and review systems',
            'I will help you set up cloud hosting and deployment services',
            'I will create an inventory management system for your business',
            'I will develop a forum or discussion board website',
            'I will implement localization and internationalization for your site',
            'I will create a custom quiz or survey application',
            'I will assist with version control setup using Git',
            'I will integrate social media sharing functionalities',
            'I will build an API for mobile apps and web services',
            'I will develop a microservices architecture for your application',
            'I will help you create a website using headless CMS solutions'
        ]
        ,
        business: [
            'I will develop a comprehensive business plan',
            'I will provide market research and analysis',
            'I will create financial projections for your business',
            'I will offer business coaching and mentoring',
            'I will develop a strategic marketing plan',
            'I will provide expert business consulting',
            'I will help you with business incorporation and registration',
            'I will create a professional pitch deck',
            'I will provide project management services',
            'I will assist with business process optimization'
        ],
        lifestyle: [
            'I will offer personalized fitness coaching',
            'I will provide custom meal planning services',
            'I will create a unique travel itinerary for you',
            'I will give expert fashion and style advice',
            'I will offer life coaching and goal setting',
            'I will provide meditation and mindfulness training',
            'I will develop a personal development plan',
            'I will help you with interior design and decoration',
            'I will provide pet care and training services',
            'I will offer gardening and landscaping advice'
        ]
    };

    const descriptions = [
        'Professional Logo Clean, modern and custom logo with high-quality standards! Im a full time graphic designer offering creative logo design service. My gig is different from other logo design gigs since Im offering unlimited concepts and unlimited revisions for the most competitive price. Designing new concepts is something very interesting to me. Im a senior creative graphic designer, with expertise in illustration and animation - all the skills needed for bespoke and original logos UNLIMITED original and unique concepts until you are 100% happy UNLIMITED revisions and color options based on your requirements and branding PROFESSIONAL customer service and communication at all times, replies are instant! UNRUSHED service where quality comes first GUARANTEED fast delivery PROFESSIONAL team of 3 full time graphic designers LIFETIME support on ALL logo designs.'
    ]

    const locations = ["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"]


    // const tags = [
    //     ['graphics', 'lifestyle'],
    //     ['video', 'business'],
    //     ['writing', 'writing'],
    //     ['ai', 'music'],
    //     ['digital', 'ai'],
    //     ['music', 'digital'],
    //     ['programming', 'digital'],
    //     ['business', 'digital'],
    //     ['lifestyle', 'business']
    // ]

    const tags = [
        ['graphics'],
        ['video'],
        ['writing'],
        ['ai'],
        ['digital'],
        ['music'],
        ['programming'],
        ['business'],
        ['lifestyle']
    ]



    const imgUrls = [
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/148451927/original/8fd88e53637c1a51087e5b8a5adbfb8507d3936b.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/138372386/original/db070e5c23ed81ab6c2ec472060cc8ecb5abc9f3.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/273650561/original/ff6bfc8e1bff54353815b047bc135b9516ad7066.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/229238020/original/96fce9db1876da79533e15d60dcfa5de8216d18b.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/107996286/original/fbdd899de5a8fb881547b9e49de84e489b9a90af.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/252280723/original/b69272e2f5ad314a58bc55499cad8f9109c944da.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/192945874/original/45074ea0dfcd30781722c0cc82cdd54355d2102d.jpg",
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/868110/original/fdcadd80ea0a061a64303ca8a63c7cee6afd49d3/create-2-custom-logo-designs-exclusive-hi-quality.jpg",
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
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/68802766/original/0af35ca3e4ab73ebeba85ffc3a986c1299e992a3.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/309017204/original/21ac2c16813cae919649007150f47c741d186f10.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/354996864/original/4b1226f96fa081b5cf3748b905e7ded66636070f.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/243216910/original/96c5602ccbb9e77aebc415669cd2093f487a46dc.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/230546656/original/db5c0730ae8d0d883876269ce3f0ac73118e461d.jpeg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/176735592/original/86c44e0c41442e47d59a536d89d7f16e00905cb6.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/7176527/original/a5456b4e290fc1e44ad6f956aaa5f0d02b902f7b.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/93035656/original/8fd9ea7423ff3bf4d5ce2ac2038c3fd8c6c0dc21.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/300427605/original/c1fbf39713e96c5eef4fd63b53652fbfccfca0ab.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/291332785/original/72cca9c7dc58999d4c59509f8460ffa0dfc91eb3.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/330944065/original/38385709e64400ac41807144e97ce77064514cd2.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/1948215/original/b9a056cbf034fa4f8c93044e2c36329972c6ed16.jpg",
    ]
    const flatTags = tags.flat();
    const tag = getRandomElement(tags)
    const gig = {
        tags: tag,
        title: getRandomElement(titleByTag[tag]),
        price: parseFloat((Math.random() * 80 + 70).toFixed(0)),
        owner: getRandomElement(users),
        daysToMake: getRandomInt(1, 14),
        description: getRandomElement(descriptions),
        avgResponseTime: getRandomInt(1, 24),
        loc: getRandomElement(locations),
        imgUrls: getRandomElements(imgUrls, 4),
        likedByUsers: ['mini-user'],
        reviews: _generateReviews(users),
    }

    return { ...gig, ...partialGig }
}

async function _createGigs() {
    const gigs = loadFromStorage(STORAGE_KEY) || []
    if (gigs.length) return

    const users = await _fetchUsers()
    console.log('users :', users)


    if (!users) return


    for (let i = 0; i < 120; i++) {
        gigs.push(await _getRandomGig(users))
    }

    saveToStorage(STORAGE_KEY, gigs)
    console.log(JSON.stringify(gigs))
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

    for (let i = 0; i < getRandomIntInclusive(13, 70); i++) {
        reviews.push({
            id: `r${getRandomInt(100, 999999)}`,
            txt: getRandomElement(reviewTexts),
            rate: getRandomInt(4, 5),
            by: getRandomElement(users)
        })
    }
    return reviews
}

async function _fetchUsers() {
    try {
        const users = await userService.getUsers()
        return users
    } catch (error) {
        console.error('Error fetching users:', error)
    }
}
