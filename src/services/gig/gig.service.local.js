
import { storageService } from '../async-storage.service'
import { loadFromStorage, makeId, saveToStorage } from '../util.service'
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

async function query(filterBy = { txt: '', price: 0 }) {
    var gigs = await storageService.query(STORAGE_KEY)
    const { txt } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        gigs = gigs.filter(gig => regex.test(gig.vendor) || regex.test(gig.description))
    }
    // if (minSpeed) {
    //     gigs = gigs.filter(gig => gig.speed >= minSpeed)
    // }
    // if (sortField === 'vendor' || sortField === 'owner') {
    //     gigs.sort((gig1, gig2) =>
    //         gig1[sortField].localeCompare(gig2[sortField]) * +sortDir)
    // }
    // if (sortField === 'price' || sortField === 'speed') {
    //     gigs.sort((gig1, gig2) =>
    //         (gig1[sortField] - gig2[sortField]) * +sortDir)
    // }

    // gigs = gigs.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return gigs
}

function getById(gigId) {
    
    return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        const gigToSave = {
            _id: gig._id,
            title: gig.title,
            price: gig.price,
            tags: gig.tags,
        }
        savedGig = await storageService.put(STORAGE_KEY, gigToSave)

    } else {
        const gigToSave = {
            title: gig.title,
            price: gig.price,
            tags: gig.tags,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedGig = await storageService.post(STORAGE_KEY, gigToSave)
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



function _createGigs() {
    const gigs = loadFromStorage(STORAGE_KEY) || []
    if (gigs && gigs.length) return

    const _gigs = [
        {
            "_id": "u101",
            "title": "I will design your logo",
            "price": 150,
            "owner": {
                "_id": "u101",
                "fullname": "Dudu Da",
                "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUHH63Qqv2vokjtR7pUKv0qd--76KzAuiHw&s",
                "level": "basic",
                "rate": 4,
                'abuotUser': "Obus is part of the Fiverr Pro catalog and has been hand-picked by a dedicated Fiverr Pro team for their skills and expertise.Logo designer specialized in minimalism and simplicity. My passion is to create beautiful pieces that serve both aesthetics and functionality.To keep the creative juices flowing I travel, workout, sketch and never stop learning. Based in Rotterdam, The Netherlands."
            },
            "daysToMake": 3,
            "description": "While Fiverr suggests this description is my chance to be creative, I believe the true creativity comes to life when I start designing your logo.\n\nMy goal is to leverage my expertise and experience to craft a logo that perfectly represents your business. Creativity is essential, and I’m dedicated to pushing boundaries and exploring new possibilities. I aim to create something unique that sets your brand apart from the competition.\n\nIt seems I've added a touch of creativity to this description after all! \n\nI will include:\n\nBlack/white and color versions \n\nFont selection and typography \n\nVector source files\n\n High resolution transparent PNG files",
            "avgResponseTime": 1,
            "loc": "Ghana",
            "imgUrls": ["/img/img1.jpg"],
            "tags": ["Arts And Crafts", "Logo Design"],
            "likedByUsers": ["mini-user"],
            "reviews": [
                {
                    "id": "r101",
                    "txt": "Did an amazing work",
                    "rate": 4,
                    "by": {
                        "_id": "u102",
                        "loc": "Ghana",
                        "fullname": "lolo",
                        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5_LmCJD3P-8Ey1AoowgI5iG8OM_EiPcU9oQ&s"
                    }
                },
                {
                    "id": "r101",
                    "txt": "Goed werk. Communiceert helder en werkt samen naar een goed eind resultaat ",
                    "rate": 5,
                    "by": {
                        "_id": "u102",
                        "loc": "Ghana",
                        "fullname": "momo",
                        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5_LmCJD3P-8Ey1AoowgI5iG8OM_EiPcU9oQ&s"
                    }
                },
                {
                    "id": "r101",
                    "txt": "Did an amazing work",
                    "rate": 4,
                    "by": {
                        "_id": "u102",
                        "loc": "Ghana",
                        "fullname": "momo",
                        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5_LmCJD3P-8Ey1AoowgI5iG8OM_EiPcU9oQ&s"
                    }
                },
                {
                    "id": "r101",
                    "txt": "Did an amazing work",
                    "rate": 4,
                    "by": {
                        "_id": "u102",
                        "loc": "Ghana",
                        "fullname": "momo",
                        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5_LmCJD3P-8Ey1AoowgI5iG8OM_EiPcU9oQ&s"
                    }
                },
                {
                    id: 'r101',
                    txt: 'Stefan followed directions beautifully. Despite people weighing in on the logo and making too many comments, Stefan kept at it, and seemed to please everyone. Way to go!',
                    rate: 5,
                    by: {
                        _id: 'u102',
                        loc: 'Ghana',

                        fullname: 'user2',
                        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0fzwv9NIlkcsxizK8O_-IHFzemQCPmOkNZQ&s',
                    },
                },
                {
                    id: 'r101',
                    txt: 'Stefan is a pleasure to work with. Well consider using him again for future projects! He took our directions and presented a report that will be used for the coming years to communicate our plans effectively.',
                    rate: 5,
                    by: {
                        _id: 'u10',
                        loc: 'Ghana',

                        fullname: 'user2',
                        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSsmJ3oBMkW0EKvuZXxItu9JCiZ24KqGRwrA&s',
                    },
                },
            ],
        },
        {
            title: 'I will create a website for you',
            price: 50.00,
            owner: {
                _id: 'u103',
                fullname: 'Jane Doe',
                imgUrl: 'url',
                level: 'premium',
                rate: 5,
            },
            daysToMake: 10,
            description: 'Professional website design...',
            avgResponseTime: 2,
            loc: 'USA',
            imgUrls: ['/img/img3.jpg'],
            tags: ['Web Development', 'Website Design'],
            likedByUsers: ['user1', 'user3'],
            reviews: [
                {
                    id: 'r102',
                    txt: 'Excellent service',
                    rate: 5,
                    by: {
                        _id: 'u104',
                        fullname: 'user4',
                        imgUrl: '/img/img4.jpg',
                    },
                },
            ],
        },
        {
            title: 'I will write SEO articles',
            price: 20.50,
            owner: {
                _id: 'u105',
                fullname: 'John Smith',
                imgUrl: 'url',
                level: 'basic',
                rate: 4.5,
            },
            daysToMake: 5,
            description: 'SEO optimized articles...',
            avgResponseTime: 3,
            loc: 'UK',
            imgUrls: ['/img/img5.jpg'],
            tags: ['Writing', 'SEO'],
            likedByUsers: ['user2', 'user5'],
            reviews: [
                {
                    id: 'r103',
                    txt: 'Great articles',
                    rate: 4,
                    by: {
                        _id: 'u106',
                        fullname: 'user6',
                        imgUrl: '/img/img6.jpg',
                    },
                },
            ],
        },
        {
            title: 'I will edit your videos',
            price: 35.75,
            owner: {
                _id: 'u107',
                fullname: 'Emily White',
                imgUrl: 'url',
                level: 'premium',
                rate: 4.7,
            },
            daysToMake: 7,
            description: 'Professional video editing...',
            avgResponseTime: 4,
            loc: 'Australia',
            imgUrls: ['/img/img7.jpg'],
            tags: ['Video Editing', 'Multimedia'],
            likedByUsers: ['user3', 'user7'],
            reviews: [
                {
                    id: 'r104',
                    txt: 'Outstanding editing skills',
                    rate: 5,
                    by: {
                        _id: 'u108',
                        fullname: 'user8',
                        imgUrl: '/img/img8.jpg',
                    },
                },
            ],
        },
        {
            title: 'I will do voice overs',
            price: 25.00,
            owner: {
                _id: 'u109',
                fullname: 'Mike Brown',
                imgUrl: 'url',
                level: 'verified',
                rate: 4.8,
            },
            daysToMake: 2,
            description: 'High-quality voice over work...',
            avgResponseTime: 1,
            loc: 'Canada',
            imgUrls: ['/img/img9.jpg'],
            tags: ['Voice Over', 'Audio'],
            likedByUsers: ['user4', 'user9'],
            reviews: [
                {
                    id: 'r105',
                    txt: 'Superb voice over',
                    rate: 4.5,
                    by: {
                        _id: 'u110',
                        fullname: 'user10',
                        imgUrl: '/img/img10.jpg',
                    },
                },
            ],
        }
    ];
    saveToStorage(STORAGE_KEY, _gigs)

}