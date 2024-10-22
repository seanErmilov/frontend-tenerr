import { storageService } from '../async-storage.service'
import { getRandomElement, getRandomElements, getRandomInt, getRandomIntInclusive, getRandomIntWithBias, loadFromStorage, makeId, saveToStorage } from '../util.service'
import { userService } from '../user'
import { httpService } from '../http.service'

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
const locations = ["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"]

async function _getRandomGig(users, partialGig = {}) {

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
            'I will provide social media branding packages',
            'I will create custom graphics for your blog posts',
            'I will design a unique brand style guide',
            'I will create custom icons for your website or app',
            'I will create visually appealing event invitations',
            'I will create custom graphics for online advertisements',
            'I will develop an attractive product catalog layout',
            'I will design a unique website layout for your brand',
            'I will create illustrations for your childrens book',
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
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/126173263/original/f92ddbde3e4d9a69c7e1a0aef0de9b270706b30d.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/279854337/original/a8f3330e0511ff23838b30299e268ddcd3919cf9.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/38272670/original/7952ff5163e4932d7e5b00877417ed14d7456659.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/307335714/original/6a21608c0f6dc5f3b5431160c79e68cfef72d9bb.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/33397215/original/88e5877aab4b9d04f2b17bd887d0c978f1270c14.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/201392313/original/7ff83ecce45cb759a5a576112622a309b0e1155f.png",

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
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/146897042/original/6232379ad1f4e38d095a17a42c27a410fde6baa7.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/117336212/original/f84dbd7f7ce1bde0e5a4b4115d688e85a6d49a76.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/55171054/original/0158450847558dfbe04fd57344ee217840e8afa4.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/313979354/original/6a25948df3edd4c5791f6dfc9ff0432746b65530.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/22527722/original/5dd0e670c2fbd2eb1637c485b8c971eda0f32caf.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/336344889/original/737e94f56a15a843caae995b6277cfcfa8c11fb5.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/146599020/original/1cd7326ab96d64876cbef1237fa7ed444331c4cf.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/181018412/original/9df3ba5e11d69cc6e14d7a61e9e7ba50c05cb4f1.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/104670003/original/94d67f8e312dcd2c25fd3b38873cf90071b42a76.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/105340530/original/5ed7ae85babcaed81dac19d040740fbab2dfb982.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/109848161/original/32f013cfb69aa5ed5ad5438d749b2bc5f1842eb8.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/15781989/original/45a8f5c85a1727ff603938e23e08808fd60ab56a.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs2/15781989/original/6305ed22206af0240124ea7b334862f030c6a6ff.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs3/15781989/original/a0a8fa791f920763d8cdd19eec8c8b52746e5f2d.jpg",
        "https://fiverr-res.cloudinary.com/image/upload/t_gig_cards_web,q_auto,f_auto/v1/attachments/delivery/asset/6880e09ea95e866438fe8feeffba9cd3-1722347435/M2.jpg",
        "https://fiverr-res.cloudinary.com/image/upload/t_gig_cards_web,q_auto,f_auto/v1/attachments/delivery/asset/21a7ba5c5f69b03d913807f688514091-1722385647/3.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/115533372/original/36a26451dd7876335f8f646d41edf6868bea0a93.jpg",
        "https://fiverr-res.cloudinary.com/image/upload/t_gig_cards_web,q_auto,f_auto/v1/attachments/delivery/asset/a67e541a4a932b4db6b77a0e34d1c9c5-1722112348/M2.jpg",
        "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/delivery/asset/07c873a533e5c71771c8e43a1e06cfea-1706839524/Salinan%20logo%20preview%20.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/350140320/original/f684070dc06efc2db6c281a5e0d05e13705e8338.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/8020116/original/6ecd0c33db92111176205c6e877487710a84dc01.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/136735691/original/00b48fba6d6ec20159c02b33c94a12148ed34d3b.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/148826277/original/04fc9b0deb9ae7f91c625aa0efdc61c3b26c7fbb.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/162281380/original/8478dcaf5b8068ec8c2275602ecb6bc8828abcd4.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/300906556/original/a2143e563a56defc308621d8ac348c29ee914dc8.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/154274953/original/ffe7a419052cc967f0c792911e5257f0bb345f6b.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/275349935/original/2d7a86f2042b064e0df6789125b358c624d70c1f.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3406341/original/d70f116e222110885482113be3b7de10256ed53b.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/297340331/original/9834a820c4d7089d9e9d63ec80a50738263314fe.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/226889680/original/7f2c707a30d7f9f9c3d4b3856df935ca3dffa8f2.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/131596772/original/8e5a5e248a7db70c6952c597bb014f68cf37b11d.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/187719208/original/009cd89fe4eb7151479f0bf59e6ee19f760e50b7.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/8999082/original/2a334cfbe39feda9560b5ecddea3a4a46d45385f.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/15719089/original/79f32fc8fc4629751b11222ba99a532cd8896b64.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/237922171/original/27286af865ef6bd965ac900c3ed60175c3bb7cbd.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/174636995/original/214717948343b828c027b5093bb039dc15caf80f.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/176540321/original/eb463606ccb40332f8a62b359616d591a4492fca.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/330000669/original/2f01e8a3426b156a893fdc038ce29ed492a50f37.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/138275830/original/3da1133045ef97f82f23c05afbf5531ff5d1264c.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/154098396/original/e02f6a2785405242eb9b86c00175887631f780db.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/292354837/original/6f15fed85708f4e221cf28154da87865621baf34.jpg",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/233266566/original/55d221b63627ea5312f7bdfb37325046c95b08e7.jpg",
    ]


    const tag = tags[getRandomIntWithBias(0, tags.length - 1, 0)]
    const gig = {
        tags: tag,
        title: getRandomElement(titleByTag[tag]),
        price: parseFloat((Math.random() * 500 + 40).toFixed(0)),
        owner: getRandomElement(users),
        daysToMake: getRandomIntWithBias(1, 8, 1, 1),
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

    if (!users) return


    for (let i = 0; i < 200; i++) {
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
            rate: getRandomIntWithBias(2, 5, 5, 0.9),
            by: getRandomElement(users),
            loc: getRandomElement(locations)
        })
    }
    return reviews
}

async function _fetchUsers() {
    try {
        let realUsers = await userService.getUsers()
        // const randomUsers = await _getRandomUsers()
        // console.log(JSON.stringify(realUsers))

        // return [...realUsers, ...randomUsers]
        return realUsers

    } catch (error) {
        console.error('Error fetching users:', error)
    }
}

async function _getRandomUsers() {
    try {
        const response = await httpService.get('', '', 'https://randomuser.me/api/?results=6&inc=picture,name&nat=gb&seed=abc')
        const randomUsers = response.results.map((userToEdit) => {
            return {
                // "_id": `uu${getRandomInt(100, 999999)}`,
                "fullname": `${userToEdit.name.first} ${userToEdit.name.last}`,
                "username": `${userToEdit.name.first}`,
                "password": '$2b$10$f0PMWX6SAuUowFmw0oXdgeIOSBOwPggJ6/aozH39.1rzdaMrlIXRW',
                "imgUrl": userToEdit.picture.thumbnail,
                "description": "A skilled graphic designer specializing in vibrant illustrations and creative branding.",
                "rate": 4,
                'level': ['premium', 'standard', 'basic'][getRandomIntWithBias(0, 2, 0, 0.6)],
                "loc": getRandomElement(locations)
            }
        })
        return randomUsers
    } catch (error) {
        console.error('Error fetching Random users:', error)
    }


}

