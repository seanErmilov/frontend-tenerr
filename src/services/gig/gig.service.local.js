
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'gig'

export const gigService = {
    query,
    getById,
    save,
    remove,
    addGigMsg
}
window.cs = gigService


async function query(filterBy = { txt: '', price: 0 }) {
    var gigs = await storageService.query(STORAGE_KEY)
    if (!gigs.length) {
        gigs = _createGigs
    }
    const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        gigs = gigs.filter(gig => regex.test(gig.vendor) || regex.test(gig.description))
    }
    if (minSpeed) {
        gigs = gigs.filter(gig => gig.speed >= minSpeed)
    }
    if (sortField === 'vendor' || sortField === 'owner') {
        gigs.sort((gig1, gig2) =>
            gig1[sortField].localeCompare(gig2[sortField]) * +sortDir)
    }
    if (sortField === 'price' || sortField === 'speed') {
        gigs.sort((gig1, gig2) =>
            (gig1[sortField] - gig2[sortField]) * +sortDir)
    }

    gigs = gigs.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
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
            price: gig.price,
            speed: gig.speed,
        }
        savedGig = await storageService.put(STORAGE_KEY, gigToSave)
    } else {
        const gigToSave = {
            vendor: gig.vendor,
            price: gig.price,
            speed: gig.speed,
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
    return [
        {
            _id: 'g101',
            title: 'I will design your logo',
            price: 12.16,
            owner: {
                _id: 'u101',
                fullname: 'Dudu Da',
                imgUrl: 'url',
                level: 'basic',
                rate: 4,
            },
            daysToMake: 3,
            description: 'Make unique logo...',
            avgResponseTime: 1,
            loc: 'Ghana',
            imgUrls: ['/img/img1.jpg'],
            tags: ['Arts And Crafts', 'Logo Design'],
            likedByUsers: ['mini-user'],
            reviews: [
                {
                    id: 'r101',
                    txt: 'Did an amazing work',
                    rate: 4,
                    by: {
                        _id: 'u102',
                        fullname: 'user2',
                        imgUrl: '/img/img2.jpg',
                    },
                },
            ],
        },
        {
            _id: 'g102',
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
            _id: 'g103',
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
            _id: 'g104',
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
            _id: 'g105',
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

}